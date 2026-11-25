"use client";

import { useEffect, useRef } from "react";

// Walk clockwise around the image. Two cubic curves let each edge bow inward
// at the pointer and meet the straight portions tangentially.
function glassContour(
  width: number,
  height: number,
  radius: number,
  x: number,
  y: number,
  strength: number,
) {
  const sides = [
    { x: 0, y: 0, dx: 1, dy: 0, length: width, along: x, distance: y },
    {
      x: width,
      y: 0,
      dx: 0,
      dy: 1,
      length: height,
      along: y,
      distance: width - x,
    },
    {
      x: width,
      y: height,
      dx: -1,
      dy: 0,
      length: width,
      along: width - x,
      distance: height - y,
    },
    {
      x: 0,
      y: height,
      dx: 0,
      dy: -1,
      length: height,
      along: height - y,
      distance: x,
    },
  ];
  const shortest = Math.min(width, height);
  const nearest = Math.min(...sides.map((side) => side.distance));
  const pull =
    Math.min(42, shortest * 0.15) * strength * (1 - nearest / shortest);
  const depths: number[] = [];
  let path = `M ${radius} 0`;
  for (const side of sides) {
    const depth = pull * Math.exp((-5 * (side.distance - nearest)) / shortest);
    depths.push(depth);
    const reach = Math.min(155, (side.length - 2 * radius) * 0.38);
    const peak = Math.max(
      radius + reach * 0.4,
      Math.min(side.length - radius - reach * 0.4, side.along),
    );
    const left = Math.max(radius, peak - reach);
    const right = Math.min(side.length - radius, peak + reach);
    const point = (along: number, inward: number) =>
      `${(side.x + side.dx * along - side.dy * inward).toFixed(2)} ${(side.y + side.dy * along + side.dx * inward).toFixed(2)}`;
    path += ` L ${point(left, 0)} C ${point((left + peak) / 2, 0)} ${point((left + peak) / 2, depth)} ${point(peak, depth)}`;
    path += ` C ${point((peak + right) / 2, depth)} ${point((peak + right) / 2, 0)} ${point(right, 0)} L ${point(side.length - radius, 0)}`;
    path += ` A ${radius} ${radius} 0 0 1 ${point(side.length, radius)}`;
  }
  return { path: path + " Z", depths };
}

export function GlassInteraction() {
  const outline = useRef<SVGPathElement>(null);

  useEffect(() => {
    const line = outline.current!;
    const frame = line.ownerSVGElement!.parentElement!;
    const link = frame.closest("a")!;
    const viewport = frame.querySelector<HTMLElement>(
      ".project-image-viewport",
    )!;
    const glass = frame.querySelector<HTMLElement>(".preview-glass")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let contact: { id: number; x: number; y: number } | undefined;
    let dragged = false;
    let targetX = 0.5,
      targetY = 0.5,
      x = 0.5,
      y = 0.5;
    let targetStrength = 0,
      strength = 0,
      animation = 0,
      lastTime = 0;

    function clear() {
      cancelAnimationFrame(animation);
      animation = lastTime = strength = targetStrength = 0;
      viewport.style.removeProperty("clip-path");
      glass.style.removeProperty("border-image-width");
      glass.style.removeProperty("--glint-position");
      line.removeAttribute("d");
      delete frame.dataset.bending;
    }

    function draw(time: number) {
      animation = 0;
      const step = 1 - Math.exp(-Math.max(0, time - lastTime) / 52);
      lastTime = time;
      x += (targetX - x) * step;
      y += (targetY - y) * step;
      strength += (targetStrength - strength) * step;
      if (!targetStrength && strength < 0.005) return clear();

      const width = viewport.clientWidth,
        height = viewport.clientHeight;
      if (!width || !height) return clear();
      const radius = Math.min(
        parseFloat(getComputedStyle(viewport).borderTopLeftRadius),
        width / 2,
        height / 2,
      );
      const { path, depths } = glassContour(
        width,
        height,
        radius,
        x * width,
        y * height,
        strength,
      );
      const rim = viewport.offsetLeft;
      glass.style.borderImageWidth = depths
        .map((depth) => `${(rim + depth).toFixed(2)}px`)
        .join(" ");
      glass.style.setProperty(
        "--glint-position",
        `${(100 * x).toFixed(2)}% ${(100 * y).toFixed(2)}%`,
      );
      viewport.style.clipPath = `path('${path}')`;
      line.setAttribute("d", path);
      frame.dataset.bending = "";
      if (
        Math.max(
          Math.abs(x - targetX),
          Math.abs(y - targetY),
          Math.abs(strength - targetStrength),
        ) > 0.001
      ) {
        animation = requestAnimationFrame(draw);
      }
    }

    function schedule() {
      if (animation || reduced.matches) return;
      lastTime = performance.now();
      animation = requestAnimationFrame(draw);
    }

    function track(event: PointerEvent) {
      if (
        !event.isPrimary ||
        (event.pointerType !== "mouse" && event.pointerId !== contact?.id)
      )
        return;
      if (
        contact &&
        Math.hypot(event.clientX - contact.x, event.clientY - contact.y) > 9
      )
        dragged = true;
      if (reduced.matches) return;
      // The link is the hit target even when its parent is tilted.
      targetX = Math.max(0, Math.min(1, event.offsetX / link.clientWidth));
      targetY = Math.max(0, Math.min(1, event.offsetY / link.clientHeight));
      if (!strength) {
        x = targetX;
        y = targetY;
      }
      targetStrength = 1;
      schedule();
    }

    function down(event: PointerEvent) {
      if (!event.isPrimary || event.button !== 0) return;
      contact = { id: event.pointerId, x: event.clientX, y: event.clientY };
      dragged = false;
      track(event);
    }
    function release() {
      contact = undefined;
      targetStrength = 0;
      if (strength || animation) schedule();
    }
    function up(event: PointerEvent) {
      if (event.pointerId !== contact?.id) return;
      track(event);
      contact = undefined;
      if (event.pointerType !== "mouse") release();
    }
    function click(event: MouseEvent) {
      if (event.detail && dragged && frame === link) event.preventDefault();
      dragged = false;
    }

    const listeners = new AbortController();
    const options = { signal: listeners.signal };
    link.addEventListener("pointerdown", down, options);
    link.addEventListener("pointermove", track, options);
    link.addEventListener("pointerup", up, options);
    link.addEventListener("pointerleave", release, options);
    link.addEventListener("pointercancel", release, options);
    link.addEventListener("click", click, options);
    reduced.addEventListener("change", clear, options);
    const resize = new ResizeObserver(() => {
      if (strength) schedule();
    });
    resize.observe(viewport);
    return () => {
      listeners.abort();
      resize.disconnect();
      clear();
    };
  }, []);

  return (
    <svg className="glass-contour" aria-hidden="true" focusable="false">
      <path ref={outline} fill="none" />
    </svg>
  );
}
