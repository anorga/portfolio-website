"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";

interface PointerGlowProps {
  children: ReactNode;
  className?: string;
  size?: number;
  pressable?: boolean;
}

const geometryInvalidators = new Set<() => void>();

function invalidatePointerGeometry() {
  for (const invalidate of geometryInvalidators) invalidate();
}

function registerGeometryInvalidator(invalidate: () => void) {
  const shouldAttachListeners = geometryInvalidators.size === 0;
  geometryInvalidators.add(invalidate);

  if (shouldAttachListeners) {
    window.addEventListener("resize", invalidatePointerGeometry, {
      passive: true,
    });
    window.addEventListener("scroll", invalidatePointerGeometry, {
      capture: true,
      passive: true,
    });
  }

  return () => {
    geometryInvalidators.delete(invalidate);
    if (geometryInvalidators.size > 0) return;

    window.removeEventListener("resize", invalidatePointerGeometry);
    window.removeEventListener("scroll", invalidatePointerGeometry, true);
  };
}

export function PointerGlow({
  children,
  className = "",
  size = 360,
  pressable = false,
}: PointerGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const bounds = useRef<DOMRect | null>(null);
  const frame = useRef<number | null>(null);
  const point = useRef({ clientX: 0, clientY: 0 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    function invalidateBounds() {
      bounds.current = null;
    }

    const resizeObserver = new ResizeObserver(invalidateBounds);
    if (ref.current) resizeObserver.observe(ref.current);
    const unregisterGeometryInvalidator =
      registerGeometryInvalidator(invalidateBounds);

    return () => {
      resizeObserver.disconnect();
      unregisterGeometryInvalidator();
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!shouldReduceMotion) return;

    const element = ref.current;
    if (!element) return;

    delete element.dataset.pointerActive;
    delete element.dataset.pointerPressed;
    delete element.dataset.pointerType;
    element.style.removeProperty("--active-glow-size");
    element.style.removeProperty("--pointer-glow-opacity");
    bounds.current = null;

    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
  }, [shouldReduceMotion]);

  function updatePointerPosition(
    event: PointerEvent<HTMLDivElement>,
    immediate = false,
  ) {
    const element = ref.current;
    if (!element) return;

    point.current = { clientX: event.clientX, clientY: event.clientY };

    if (event.pointerType === "pen") {
      const tilt = Math.min(1, Math.hypot(event.tiltX, event.tiltY) / 75);
      const contact = Math.min(1, event.pressure);
      element.style.setProperty(
        "--pointer-glow-opacity",
        `${0.76 + tilt * 0.14 + contact * 0.1}`,
      );
    }

    const render = () => {
      const current = ref.current;
      if (!current) {
        frame.current = null;
        return;
      }

      const rect = bounds.current ?? current.getBoundingClientRect();
      bounds.current = rect;
      const x = Math.max(0, Math.min(rect.width, point.current.clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, point.current.clientY - rect.top));
      const normalizedX = rect.width ? x / rect.width - 0.5 : 0;
      const normalizedY = rect.height ? y / rect.height - 0.5 : 0;

      current.style.setProperty("--glow-x", `${x}px`);
      current.style.setProperty("--glow-y", `${y}px`);
      current.style.setProperty("--pointer-shift-x", `${normalizedX * 7}px`);
      current.style.setProperty("--pointer-shift-y", `${normalizedY * 7}px`);
      frame.current = null;
    };

    if (immediate) {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      render();
      return;
    }

    if (frame.current === null) frame.current = requestAnimationFrame(render);
  }

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (!shouldReduceMotion && event.pointerType !== "touch" && ref.current) {
      bounds.current = ref.current.getBoundingClientRect();
      ref.current.dataset.pointerActive = "";
      ref.current.dataset.pointerType = event.pointerType || "mouse";
      updatePointerPosition(event, true);
    }
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || event.pointerType === "touch") return;
    updatePointerPosition(event);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !pressable || !ref.current) return;

    ref.current.dataset.pointerActive = "";
    ref.current.dataset.pointerPressed = "";
    ref.current.dataset.pointerType = event.pointerType || "touch";

    if (event.pointerType === "touch") {
      ref.current.style.setProperty(
        "--active-glow-size",
        `${Math.min(size, 220)}px`,
      );
    }

    bounds.current = ref.current.getBoundingClientRect();
    updatePointerPosition(event, true);
  }

  function clearPointerState() {
    const element = ref.current;
    if (!element) return;
    delete element.dataset.pointerActive;
    delete element.dataset.pointerPressed;
    delete element.dataset.pointerType;
    element.style.removeProperty("--active-glow-size");
    element.style.removeProperty("--pointer-glow-opacity");
    bounds.current = null;

    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!ref.current) return;
    delete ref.current.dataset.pointerPressed;
    if (event.pointerType === "touch") {
      delete ref.current.dataset.pointerActive;
      delete ref.current.dataset.pointerType;
      ref.current.style.removeProperty("--active-glow-size");
    }
  }

  return (
    <div
      ref={ref}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={clearPointerState}
      onPointerLeave={clearPointerState}
      data-pointer-pressable={pressable ? "" : undefined}
      className={`group/pointer relative ${className}`}
      style={{ "--glow-size": `${size}px` } as CSSProperties}
    >
      {children}
      <div aria-hidden className="pointer-sheen" />
    </div>
  );
}
