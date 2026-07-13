"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { PointerGlow } from "@/components/ui/pointer-glow";
import { site } from "@/content/site";

export function PortraitCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [canParallax, setCanParallax] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setCanParallax(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div ref={ref} className="group relative aspect-[4/5] w-full max-w-[420px]">
      <div
        aria-hidden
        className="absolute inset-6 -z-10 translate-x-5 translate-y-5 rounded-[2rem] bg-accent/14 blur-2xl transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3"
      />
      <PointerGlow
        size={420}
        className="h-full overflow-hidden rounded-[2rem] bg-card shadow-xl ring-1 ring-foreground/8 transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-2xl"
      >
        <motion.div
          style={shouldReduceMotion || !canParallax ? undefined : { y: imageY }}
          className="absolute inset-0"
        >
          <Image
            src="/images/portrait.jpeg"
            alt={`Portrait of ${site.name}`}
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 55vw, calc(100vw - 48px)"
            className="pointer-shift origin-[center_65%] scale-[1.35] object-cover transition-[transform,translate] duration-700 ease-out group-hover:scale-[1.39]"
          />
        </motion.div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-white/5"
        />
      </PointerGlow>
    </div>
  );
}
