"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";

interface PointerGlowProps {
  children: ReactNode;
  className?: string;
  size?: number;
}

export function PointerGlow({
  children,
  className = "",
  size = 360,
}: PointerGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const bounds = useRef<DOMRect | null>(null);
  const frame = useRef<number | null>(null);
  const point = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function updateBounds() {
      if (ref.current) bounds.current = ref.current.getBoundingClientRect();
    }

    window.addEventListener("resize", updateBounds, { passive: true });
    return () => {
      window.removeEventListener("resize", updateBounds);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch" && ref.current) {
      bounds.current = ref.current.getBoundingClientRect();
      ref.current.dataset.pointerActive = "";
      ref.current.dataset.pointerType = event.pointerType || "mouse";
    }
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const element = ref.current;
    const rect = bounds.current;
    if (!element || !rect || event.pointerType === "touch") return;

    point.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    if (event.pointerType === "pen") {
      const tilt = Math.min(1, Math.hypot(event.tiltX, event.tiltY) / 75);
      element.style.setProperty(
        "--pointer-glow-opacity",
        `${0.78 + tilt * 0.18}`,
      );
    }

    if (frame.current !== null) return;

    frame.current = requestAnimationFrame(() => {
      const normalizedX = point.current.x / rect.width - 0.5;
      const normalizedY = point.current.y / rect.height - 0.5;
      element.style.setProperty("--glow-x", `${point.current.x}px`);
      element.style.setProperty("--glow-y", `${point.current.y}px`);
      element.style.setProperty("--pointer-shift-x", `${normalizedX * 7}px`);
      element.style.setProperty("--pointer-shift-y", `${normalizedY * 7}px`);
      frame.current = null;
    });
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!ref.current) return;
    ref.current.dataset.pointerPressed = "";
    ref.current.dataset.pointerType = event.pointerType || "touch";
  }

  function clearPointerState() {
    const element = ref.current;
    if (!element) return;
    delete element.dataset.pointerActive;
    delete element.dataset.pointerPressed;
    delete element.dataset.pointerType;
    element.style.removeProperty("--pointer-glow-opacity");
    bounds.current = null;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!ref.current) return;
    delete ref.current.dataset.pointerPressed;
    if (event.pointerType === "touch") delete ref.current.dataset.pointerType;
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
      className={`group/pointer relative ${className}`}
      style={{ "--glow-size": `${size}px` } as CSSProperties}
    >
      {children}
      <div aria-hidden className="pointer-sheen" />
    </div>
  );
}
