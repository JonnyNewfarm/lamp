"use client";

import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function NewProductsIntro() {
  const introRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 780);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start 90%", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.6,
  });

  const headingY = useTransform(
    smoothProgress,
    [0, 1],
    [-60, isMobile ? 0 : 60],
  );

  const textY = useTransform(smoothProgress, [0, 1], [-30, 0]);

  return (
    <div ref={introRef} className="mb-14 grid gap-8 md:grid-cols-12">
      <motion.div style={{ y: headingY }} className="md:col-span-5">
        <p className="mb-5 text-xs uppercase tracking-[0.34em] text-[#161310]/45">
          New products
        </p>

        <h2 className="max-w-xl text-5xl leading-[0.95] tracking-[-0.06em] md:whitespace-nowrap md:text-7xl">
          Recently added lights.
        </h2>
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="flex items-end md:col-span-4 md:col-start-9"
      >
        <div>
          <p className="max-w-sm text-base leading-[1.7] text-[#161310]/60">
            Explore the latest additions to Calero Studio — minimal lighting
            selected for calm interiors and everyday atmosphere.
          </p>

          <Link
            href="/shop"
            className="group mt-8 inline-flex items-center gap-4 text-lg font-semibold"
          >
            View all products
            <span className="h-px w-12 bg-[#161310] transition-all duration-500 group-hover:w-20" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
