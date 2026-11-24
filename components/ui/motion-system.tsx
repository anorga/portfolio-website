"use client";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

export function ScrollMeter() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="scroll-meter"
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
      aria-hidden
    />
  );
}
export function MotionTitle({
  id,
  lines,
  className = "",
}: {
  id: string;
  lines: string[];
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 0.45, 1], [-65, 0, 25]);
  const reverse = useTransform(scrollYProgress, [0, 0.45, 1], [65, 0, -25]);
  const reduced = useReducedMotion();
  return (
    <h2
      ref={ref}
      id={id}
      className={`motion-title ${className}`}
      aria-label={lines.join(" ")}
    >
      {lines.map((line, i) => (
        <motion.span
          key={line}
          aria-hidden
          style={{ x: reduced ? 0 : i % 2 ? reverse : x }}
        >
          {line}
        </motion.span>
      ))}
    </h2>
  );
}
