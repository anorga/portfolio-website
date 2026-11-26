"use client";

import { useEffect, useRef } from "react";
import { getSharedGlassRenderer } from "@/lib/liquid-glass";

function parseObjectPosition(value: string): [number, number] {
  const parts = value.trim().split(/\s+/);
  const parsePart = (part: string | undefined) => {
    if (!part || !part.endsWith("%")) return 0.5;
    const n = parseFloat(part);
    return Number.isFinite(n) ? Math.max(0, Math.min(1, n / 100)) : 0.5;
  };
  return [parsePart(parts[0]), parsePart(parts[1] ?? "50%")];
}

export function GlassInteraction() {
  const overlay = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const glass = overlay.current;
    const canvas = canvasRef.current;
    const frame = glass?.closest<HTMLElement>(".project-image, .index-thumbnail");
    const viewport = frame?.querySelector<HTMLElement>(".project-image-viewport");
    if (!glass || !canvas || !frame || !viewport) return;

    const renderer = getSharedGlassRenderer();
    if (!renderer) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const controller = new AbortController();
    const options = { signal: controller.signal };

    let visible = false;
    let width = 0;
    let height = 0;
    let radius = 0;
    let rim = 0;
    let coverScaleX = 1;
    let coverScaleY = 1;
    let coverOffsetX = 0;
    let coverOffsetY = 0;

    let uploadedImg: HTMLImageElement | null = null;
    let uploadedSrc = "";
    const highlight = new Float32Array(3);
    let waveX = 0;
    let waveY = 0;
    let waveAge = 1;

    let px = 0;
    let py = 0;
    let aimX = 0;
    let aimY = 0;
    let vx = 0;
    let vy = 0;
    let light = 0;
    let targetLight = 0;
    let animation = 0;
    let lastTime = 0;
    let contactId: number | undefined;

    const findActiveImage = (): HTMLImageElement | null => {
      const imgs = viewport.querySelectorAll<HTMLImageElement>("img");
      for (const img of imgs) {
        if (getComputedStyle(img).display !== "none") return img;
      }
      return imgs[0] ?? null;
    };

    const draw = () => {
      if (!visible || !width || !height || !(rim > 0) || !uploadedImg) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const ok = surface.render(canvas, {
        width,
        height,
        dpr,
        radius,
        rim,
        pointerX: px,
        pointerY: py,
        velX: vx,
        velY: vy,
        light,
        highlight,
        waveX,
        waveY,
        waveAge,
        coverScaleX,
        coverScaleY,
        coverOffsetX,
        coverOffsetY,
      });
      glass.toggleAttribute("data-glass-ready", ok);
    };

    const surface = renderer.createSurface(() => {
      uploadedImg = null;
      uploadedSrc = "";
      syncImageAndDraw();
    });

    const syncMetrics = (img: HTMLImageElement | null) => {
      width = frame.clientWidth;
      height = frame.clientHeight;
      if (!width || !height) return false;

      radius = Math.min(
        parseFloat(getComputedStyle(frame).borderTopLeftRadius) || 0,
        width / 2,
        height / 2,
      );
      rim = Math.min(
        parseFloat(getComputedStyle(glass).paddingTop) || 0,
        radius,
      );
      if (!(rim > 0)) return false;

      if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
        const boxAspect = width / height;
        const imgAspect = img.naturalWidth / img.naturalHeight;
        if (imgAspect > boxAspect) {
          coverScaleX = boxAspect / imgAspect;
          coverScaleY = 1;
        } else {
          coverScaleX = 1;
          coverScaleY = imgAspect / boxAspect;
        }
        const [posX, posY] = parseObjectPosition(
          img.style.objectPosition || getComputedStyle(img).objectPosition,
        );
        coverOffsetX = (1 - coverScaleX) * posX;
        coverOffsetY = (1 - coverScaleY) * posY;
      }

      if (!light && !targetLight) {
        px = aimX = width * 0.25;
        py = aimY = height * 0.2;
      }
      return true;
    };

    const syncImageAndDraw = () => {
      if (reduced.matches) {
        delete glass.dataset.glassReady;
        return;
      }
      if (!visible) return;
      const img = findActiveImage();
      if (!syncMetrics(img)) return;
      if (!img || !img.complete || !img.naturalWidth) {
        delete glass.dataset.glassReady;
        uploadedImg = null;
        return;
      }
      const rgb = getComputedStyle(glass).getPropertyValue("--ink-color").split(",");
      highlight.set(rgb.map(channel => Number(channel) / 255));

      const src = img.currentSrc || img.src;
      if (!src) return;
      if (img !== uploadedImg || src !== uploadedSrc) {
        if (!surface.upload(img)) {
          delete glass.dataset.glassReady;
          uploadedImg = null;
          return;
        }
        uploadedImg = img;
        uploadedSrc = src;
      }
      draw();
    };

    const resetLighting = () => {
      cancelAnimationFrame(animation);
      animation = 0;
      contactId = undefined;
      vx = vy = 0;
      light = targetLight = 0;
      waveAge = 1;
      if (width && height) {
        px = aimX = width * 0.25;
        py = aimY = height * 0.2;
      }
      draw();
    };

    const tick = (now: number) => {
      animation = 0;
      const dt = Math.min(0.08, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;
      waveAge = Math.min(1, waveAge + dt / 0.7);

      const prevX = px;
      const prevY = py;
      const posFollow = 1 - Math.exp(-30 * dt);
      const lightFollow = 1 - Math.exp(-13 * dt);
      const velDecay = Math.exp(-11 * dt);

      px += (aimX - px) * posFollow;
      py += (aimY - py) * posFollow;
      light += (targetLight - light) * lightFollow;

      const instVx = ((px - prevX) / dt) * 0.006;
      const instVy = ((py - prevY) / dt) * 0.006;
      vx = vx * velDecay + instVx * (1 - velDecay);
      vy = vy * velDecay + instVy * (1 - velDecay);

      if (
        waveAge === 1 &&
        Math.abs(targetLight - light) < 0.004 &&
        Math.hypot(aimX - px, aimY - py) < 0.25 &&
        Math.hypot(vx, vy) < 0.01
      ) {
        px = aimX;
        py = aimY;
        vx = vy = 0;
        light = targetLight;
      } else {
        animation = requestAnimationFrame(tick);
      }

      draw();
    };

    const wake = () => {
      if (animation || !visible || reduced.matches) return;
      lastTime = performance.now();
      animation = requestAnimationFrame(tick);
    };

    const updateAim = (event: PointerEvent) => {
      // The image and glass ignore hit testing, so offsets are local to the tilted frame.
      const nx = Math.max(0, Math.min(width, event.offsetX));
      const ny = Math.max(0, Math.min(height, event.offsetY));
      if (light < 0.02 && targetLight === 0) {
        px = nx;
        py = ny;
        vx = vy = 0;
      }
      aimX = nx;
      aimY = ny;
    };

    const onEnter = (event: PointerEvent) => {
      if (!event.isPrimary || event.pointerType !== "mouse" || reduced.matches)
        return;
      updateAim(event);
      targetLight = contactId === event.pointerId ? 1 : 0.88;
      wake();
    };

    const onMove = (event: PointerEvent) => {
      if (!event.isPrimary || reduced.matches) return;
      if (event.pointerType !== "mouse" && event.pointerId !== contactId) return;
      updateAim(event);
      targetLight =
        contactId === event.pointerId
          ? 1
          : event.pointerType === "mouse"
            ? 0.88
            : 0;
      wake();
    };

    const onDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || reduced.matches) return;
      contactId = event.pointerId;
      updateAim(event);
      waveX = aimX;
      waveY = aimY;
      waveAge = 0;
      targetLight = 1;
      wake();
    };

    const release = () => {
      contactId = undefined;
      targetLight = 0;
      wake();
    };

    const onUp = (event: PointerEvent) => {
      if (event.pointerId !== contactId) return;
      contactId = undefined;
      if (event.pointerType === "mouse" && frame.matches(":hover")) {
        updateAim(event);
        targetLight = 0.88;
        wake();
      } else {
        release();
      }
    };

    frame.addEventListener("pointerenter", onEnter, options);
    frame.addEventListener("pointermove", onMove, options);
    frame.addEventListener("pointerdown", onDown, options);
    frame.addEventListener("pointerup", onUp, options);
    frame.addEventListener("pointerleave", release, options);
    frame.addEventListener("pointercancel", release, options);
    frame.addEventListener("lostpointercapture", release, options);
    viewport.addEventListener("load", syncImageAndDraw, {
      ...options,
      capture: true,
    });
    reduced.addEventListener(
      "change",
      () => {
        if (reduced.matches) resetLighting();
        syncImageAndDraw();
      },
      options,
    );

    const themeObserver = new MutationObserver(() => {
      syncImageAndDraw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const imageObserver = new MutationObserver(() => {
      syncImageAndDraw();
    });
    imageObserver.observe(viewport, {
      subtree: true,
      attributes: true,
      attributeFilter: ["src", "srcset"],
    });

    const resize = new ResizeObserver(() => {
      syncImageAndDraw();
    });
    resize.observe(frame);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) syncImageAndDraw();
      else resetLighting();
    });
    intersection.observe(frame);

    return () => {
      controller.abort();
      themeObserver.disconnect();
      imageObserver.disconnect();
      resize.disconnect();
      intersection.disconnect();
      cancelAnimationFrame(animation);
      delete glass.dataset.glassReady;
      surface.destroy();
    };
  }, []);

  return (
    <span ref={overlay} className="preview-glass" aria-hidden="true">
      <canvas ref={canvasRef} className="preview-glass-canvas" />
    </span>
  );
}
