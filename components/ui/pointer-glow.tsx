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

    if (frame.current !== null) return;

    frame.current = requestAnimationFrame(() => {
      element.style.setProperty("--glow-x", `${point.current.x}px`);
      element.style.setProperty("--glow-y", `${point.current.y}px`);
      frame.current = null;
    });
  }

  return (
    <div
      ref={ref}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      className={`group/pointer relative ${className}`}
      style={{ "--glow-size": `${size}px` } as CSSProperties}
    >
      {children}
      <div aria-hidden className="pointer-sheen" />
    </div>
  );
}
