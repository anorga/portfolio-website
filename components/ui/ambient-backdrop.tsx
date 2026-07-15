"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function AmbientBackdrop() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const firstY = useTransform(scrollYProgress, [0, 1], ["-8%", "34%"]);
  const secondY = useTransform(scrollYProgress, [0, 1], ["18%", "-24%"]);
  const secondX = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);

  return (
    <div
      aria-hidden
      className="ambient-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        style={shouldReduceMotion ? undefined : { y: firstY }}
        className="ambient-orb absolute -left-56 top-[8%] h-[34rem] w-[34rem] rounded-full [background-image:radial-gradient(circle,color-mix(in_oklab,var(--accent)_12%,transparent),transparent_68%)]"
      />
      <motion.div
        style={shouldReduceMotion ? undefined : { x: secondX, y: secondY }}
        className="ambient-orb absolute -right-64 top-[42%] h-[38rem] w-[38rem] rounded-full [background-image:radial-gradient(circle,color-mix(in_oklab,var(--accent)_10%,transparent),transparent_68%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--foreground)_2%,transparent)_1px,transparent_1px)] bg-[size:36px_36px] opacity-35 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]" />
    </div>
  );
}
