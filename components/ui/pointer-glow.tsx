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

interface TouchGesture {
  pointerId: number;
  startX: number;
  startY: number;
  cancelled: boolean;
}

const TOUCH_MOVE_THRESHOLD = 8;
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
  const touchGesture = useRef<TouchGesture | null>(null);
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const unregisterGeometryInvalidator = useRef<(() => void) | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    return () => {
      resizeObserver.current?.disconnect();
      unregisterGeometryInvalidator.current?.();
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

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
    touchGesture.current = null;
    stopTrackingGeometry();

    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
  }, [shouldReduceMotion]);

  function startTrackingGeometry(element: HTMLDivElement) {
    if (!unregisterGeometryInvalidator.current) {
      unregisterGeometryInvalidator.current = registerGeometryInvalidator(() => {
        bounds.current = null;
      });
    }

    if (!resizeObserver.current) {
      resizeObserver.current = new ResizeObserver(() => {
        bounds.current = null;
      });
    }

    resizeObserver.current.disconnect();
    resizeObserver.current.observe(element);
  }

  function stopTrackingGeometry() {
    resizeObserver.current?.disconnect();
    unregisterGeometryInvalidator.current?.();
    unregisterGeometryInvalidator.current = null;
  }

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

      current.style.setProperty(
        "--glow-translate-x",
        `${x - rect.width / 2}px`,
      );
      current.style.setProperty(
        "--glow-translate-y",
        `${y - rect.height / 2}px`,
      );
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
      startTrackingGeometry(ref.current);
      bounds.current = ref.current.getBoundingClientRect();
      ref.current.dataset.pointerActive = "";
      ref.current.dataset.pointerType = event.pointerType || "mouse";
      updatePointerPosition(event, true);
    }
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return;

    if (event.pointerType === "touch") {
      const gesture = touchGesture.current;
      if (
        !gesture ||
        gesture.pointerId !== event.pointerId ||
        gesture.cancelled
      ) {
        return;
      }

      const deltaX = event.clientX - gesture.startX;
      const deltaY = event.clientY - gesture.startY;
      if (
        deltaX * deltaX + deltaY * deltaY >
        TOUCH_MOVE_THRESHOLD * TOUCH_MOVE_THRESHOLD
      ) {
        gesture.cancelled = true;
        clearPointerVisualState();
        return;
      }

      updatePointerPosition(event);
      return;
    }

    updatePointerPosition(event);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !pressable || !ref.current) return;

    startTrackingGeometry(ref.current);

    if (event.pointerType === "touch") {
      if (!event.isPrimary) {
        touchGesture.current = null;
        clearPointerVisualState();
        return;
      }

      touchGesture.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        cancelled: false,
      };
    }

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

  function clearPointerVisualState() {
    const element = ref.current;
    if (!element) return;
    delete element.dataset.pointerActive;
    delete element.dataset.pointerPressed;
    delete element.dataset.pointerType;
    element.style.removeProperty("--active-glow-size");
    element.style.removeProperty("--pointer-glow-opacity");
    bounds.current = null;
    stopTrackingGeometry();

    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!ref.current) return;

    if (event.pointerType === "touch") {
      const gesture = touchGesture.current;
      if (gesture && gesture.pointerId !== event.pointerId) return;

      touchGesture.current = null;
      clearPointerVisualState();
      return;
    }

    delete ref.current.dataset.pointerPressed;
  }

  function handlePointerInterruption(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") {
      const gesture = touchGesture.current;
      if (gesture && gesture.pointerId !== event.pointerId) return;
      touchGesture.current = null;
    }

    clearPointerVisualState();
  }

  function handleLostPointerCapture(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") handlePointerInterruption(event);
  }

  return (
    <div
      ref={ref}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerInterruption}
      onPointerLeave={handlePointerInterruption}
      onLostPointerCapture={handleLostPointerCapture}
      data-pointer-pressable={pressable ? "" : undefined}
      className={`group/pointer relative ${className}`}
      style={{ "--glow-size": `${size}px` } as CSSProperties}
    >
      {children}
      <div aria-hidden className="pointer-sheen" />
    </div>
  );
}
