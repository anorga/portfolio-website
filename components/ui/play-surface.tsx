"use client";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useSpring,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

export function PlaySurface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const tiltX = useSpring(0, { stiffness: 130, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 130, damping: 22 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scrollTilt = useTransform(scrollYProgress, [0, 0.4, 1], [12, 0, -5]);
  const y = useTransform(scrollYProgress, [0, 0.4, 1], [70, 0, -30]);
  const rotateX = useTransform(
    [tiltX, scrollTilt],
    (values) => Number(values[0]) + Number(values[1]),
  );
  return (
    <motion.div
      ref={ref}
      className={`play-surface ${className}`}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        y: reduced ? 0 : y,
        transformPerspective: 1200,
      }}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse") return;
        const box = event.currentTarget.getBoundingClientRect();
        rotateY.set(((event.clientX - box.left) / box.width - 0.5) * 10);
        tiltX.set(-((event.clientY - box.top) / box.height - 0.5) * 10);
      }}
      onPointerLeave={() => {
        tiltX.set(0);
        rotateY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
