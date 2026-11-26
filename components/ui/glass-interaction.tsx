"use client";

import { useEffect, useId, useRef } from "react";

function lensOffset(depth: number, thickness: number, scale: number) {
  const t = Math.max(0, 1 - depth / thickness);
  return scale * thickness * t * t * (1.4 - 0.4 * t);
}

// Red and green encode how far to sample the screenshot along each axis.
// The wider map describes the shoulder of the bevel caught by grazing light.
function makeLensMaps(
  width: number,
  height: number,
  radius: number,
  rim: number,
) {
  const map = document.createElement("canvas");
  const resolution = Math.min(1, 720 / width);
  map.width = Math.max(1, Math.round(width * resolution));
  map.height = Math.max(1, Math.round(height * resolution));
  const ctx = map.getContext("2d");
  if (!ctx) return;
  const resting = ctx.createImageData(map.width, map.height);
  const illuminated = ctx.createImageData(map.width, map.height);
  const bevelWidth = rim * 2.8;
  const maxOffset = bevelWidth;
  const channelScale = 127 / maxOffset;

  for (let y = 0; y < map.height; y++) {
    const cy = ((y + 0.5) / map.height - 0.5) * height;
    const qy = Math.abs(cy) - height / 2 + radius;
    for (let x = 0; x < map.width; x++) {
      const i = (y * map.width + x) * 4;
      resting.data[i] = resting.data[i + 1] = 128;
      illuminated.data[i] = illuminated.data[i + 1] = 128;
      resting.data[i + 3] = illuminated.data[i + 3] = 255;
      const cx = ((x + 0.5) / map.width - 0.5) * width;
      const qx = Math.abs(cx) - width / 2 + radius;
      if (radius - Math.max(qx, qy) > bevelWidth) continue;

      // Distance and outward normal of a rounded rectangle, in CSS pixels.
      const ox = Math.max(qx, 0),
        oy = Math.max(qy, 0);
      const arc = Math.hypot(ox, oy);
      const depth = Math.max(0, radius - arc - Math.min(Math.max(qx, qy), 0));
      const blend = Math.max(0, Math.min(1, 0.5 + (qx - qy) / (2 * rim)));
      const length = arc || Math.hypot(blend, 1 - blend);
      const nx = (Math.sign(cx) * (arc ? ox : blend)) / length;
      const ny = (Math.sign(cy) * (arc ? oy : 1 - blend)) / length;
      const restOffset = lensOffset(depth, rim, channelScale);
      resting.data[i] = 128 - nx * restOffset;
      resting.data[i + 1] = 128 - ny * restOffset;
      const litOffset = lensOffset(depth, bevelWidth, channelScale);
      illuminated.data[i] = 128 - nx * litOffset;
      illuminated.data[i + 1] = 128 - ny * litOffset;
      illuminated.data[i + 2] = 2 * litOffset;
    }
  }
  ctx.putImageData(resting, 0, 0);
  const rest = map.toDataURL();
  ctx.putImageData(illuminated, 0, 0);
  return { rest, lit: map.toDataURL(), scale: maxOffset * 2 };
}

// Preserve RGB and use the last row to calculate how much light reaches each face.
const identityRGB = "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0";
const unlit = identityRGB + "  0 0 0 0 0";

export function GlassInteraction() {
  const id = "lens-" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const overlay = useRef<HTMLSpanElement>(null);
  const restMap = useRef<SVGFEImageElement>(null);
  const litMap = useRef<SVGFEImageElement>(null);
  const incidence = useRef<SVGFEColorMatrixElement>(null);
  const displacement = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    const glass = overlay.current!;
    const frame = glass.parentElement!;
    const link = frame.closest("a")!;
    const viewport = frame.querySelector<HTMLElement>(
      ".project-image-viewport",
    )!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0,
      height = 0,
      visible = false;
    let x = 0,
      y = 0,
      aimX = 0,
      aimY = 0;
    let pressure = 0,
      target = 0,
      animation = 0,
      lastTime = 0;
    let contact: { id: number; x: number; y: number } | undefined;
    let dragged = false;
    let paintedX = NaN,
      paintedY = NaN,
      paintedAmount = NaN;

    function prepare() {
      if (!visible) return;
      const w = frame.clientWidth,
        h = frame.clientHeight;
      if (!w || !h) return;
      if (width === w && height === h) {
        viewport.style.filter = `url("#${id}")`;
        return;
      }
      const radius = parseFloat(getComputedStyle(frame).borderTopLeftRadius);
      const rim = parseFloat(getComputedStyle(glass).paddingTop);
      const maps = makeLensMaps(w, h, radius, rim);
      if (!maps) return;
      width = w;
      height = h;
      restMap.current!.setAttribute("href", maps.rest);
      litMap.current!.setAttribute("href", maps.lit);
      displacement.current!.setAttribute("scale", String(maps.scale));
      paintedX = paintedY = NaN;
      viewport.style.filter = `url("#${id}")`;
    }

    function paint() {
      const px = Math.round(x * 2) / 2,
        py = Math.round(y * 2) / 2;
      const amount = Math.round(100 * Math.min(1, Math.abs(pressure))) / 100;
      if (paintedX === px && paintedY === py && paintedAmount === amount)
        return;
      paintedX = px;
      paintedY = py;
      paintedAmount = amount;
      if (!amount || !width || !height) {
        incidence.current!.setAttribute("values", unlit);
        glass.style.setProperty("--glass-light", "0");
        return;
      }
      // The pointer sets a light direction over the entire pane. The same vector
      // steers the reflection and weights the bevel through its encoded normals.
      const lightX = ((2 * px) / width - 1) * 0.85 - 0.18;
      const lightY = ((2 * py) / height - 1) * 0.78 - 0.27;
      const gain = (-2 * amount) / Math.max(1, Math.hypot(lightX, lightY));
      const red = gain * lightX,
        green = gain * lightY;
      const bias = -(128 / 255) * (red + green);
      incidence.current!.setAttribute(
        "values",
        `${identityRGB}  ${red} ${green} ${0.3 * amount} 0 ${bias}`,
      );
      glass.style.setProperty("--glass-light", String(amount));
      glass.style.setProperty(
        "--rim-bearing",
        `${Math.atan2(lightX, -lightY)}rad`,
      );
      glass.style.setProperty("--sheen-angle", `${111 + 10 * lightY}deg`);
      glass.style.setProperty(
        "--sheen-position",
        `${49 + 24 * lightX + 9 * lightY}%`,
      );
    }

    function reset() {
      cancelAnimationFrame(animation);
      pressure = target = animation = 0;
      paint();
    }

    function tick(time: number) {
      animation = 0;
      const dt = Math.min(0.2, (time - lastTime) / 1000);
      lastTime = time;
      const follow = 1 - Math.exp(-27 * dt);
      x += (aimX - x) * follow;
      y += (aimY - y) * follow;
      pressure += (target - pressure) * (1 - Math.exp(-17 * dt));
      if (
        Math.abs(target - pressure) < 0.002 &&
        Math.abs(x - aimX) + Math.abs(y - aimY) < 0.25
      ) {
        pressure = target;
        x = aimX;
        y = aimY;
      } else {
        animation = requestAnimationFrame(tick);
      }
      paint();
    }

    function wake() {
      if (animation || !visible || reduced.matches) return;
      lastTime = performance.now();
      animation = requestAnimationFrame(tick);
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
      if (!width || reduced.matches) return;
      if (frame === link) {
        // The preview's children ignore pointer events, even while the link tilts.
        aimX = event.offsetX;
        aimY = event.offsetY;
      } else {
        const box = frame.getBoundingClientRect();
        aimX = ((event.clientX - box.left) * width) / box.width;
        aimY = ((event.clientY - box.top) * height) / box.height;
      }
      const inside = aimX >= 0 && aimX <= width && aimY >= 0 && aimY <= height;
      aimX = Math.max(0, Math.min(width, aimX));
      aimY = Math.max(0, Math.min(height, aimY));
      if (!target && !pressure) {
        x = aimX;
        y = aimY;
      }
      target = inside ? (contact ? 1 : 0.84) : 0;
      wake();
    }

    function down(event: PointerEvent) {
      if (!event.isPrimary || event.button !== 0) return;
      contact = { id: event.pointerId, x: event.clientX, y: event.clientY };
      dragged = false;
      track(event);
    }
    function release() {
      contact = undefined;
      target = 0;
      wake();
    }
    function up(event: PointerEvent) {
      if (event.pointerId !== contact?.id) return;
      track(event);
      release();
      if (event.pointerType === "mouse" && link.matches(":hover")) track(event);
    }
    function lostCapture(event: PointerEvent) {
      if (event.pointerId === contact?.id) release();
    }
    function click(event: MouseEvent) {
      if (frame === link && event.detail && dragged) event.preventDefault();
      dragged = false;
    }

    const controller = new AbortController();
    const options = { signal: controller.signal };
    link.addEventListener("pointerdown", down, options);
    link.addEventListener("pointermove", track, options);
    link.addEventListener("pointerup", up, options);
    link.addEventListener("pointerleave", release, options);
    link.addEventListener("pointercancel", release, options);
    link.addEventListener("lostpointercapture", lostCapture, options);
    link.addEventListener("click", click, options);
    reduced.addEventListener("change", reset, options);
    const resize = new ResizeObserver(prepare);
    resize.observe(frame);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) prepare();
      else {
        viewport.style.removeProperty("filter");
        reset();
      }
    });
    intersection.observe(frame);
    return () => {
      controller.abort();
      resize.disconnect();
      intersection.disconnect();
      cancelAnimationFrame(animation);
      viewport.style.removeProperty("filter");
    };
  }, [id]);

  return (
    <span ref={overlay} className="preview-glass" aria-hidden="true">
      <svg width="0" height="0" focusable="false">
        <defs>
          <filter
            id={id}
            x="0"
            y="0"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              ref={restMap}
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="rest"
            />
            <feImage
              ref={litMap}
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="bevel"
            />
            <feColorMatrix
              ref={incidence}
              in="bevel"
              type="matrix"
              values={unlit}
              result="litBevel"
            />
            <feComposite
              in="litBevel"
              in2="rest"
              operator="over"
              result="lens"
            />
            <feDisplacementMap
              ref={displacement}
              in="SourceGraphic"
              in2="lens"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </span>
  );
}
