// components/CaleroHero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const heroImages = {
  smallTop: "/images/lamp-1.jpg",
  smallBottom: "/images/lamp-2.jpg",
  large: "/images/lamp-3.jpg",
};

export default function CaleroHero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.6,
  });

  const textY = useTransform(smoothProgress, [0, 1], [0, 60]);
  const smallTopY = useTransform(smoothProgress, [0, 1], [0, -55]);
  const smallBottomY = useTransform(smoothProgress, [0, 1], [0, 70]);
  const largeY = useTransform(smoothProgress, [0, 1], [0, -35]);
  const largeScale = useTransform(smoothProgress, [0, 1], [1, 1.04]);

  // Denne lar info-raden følge det som beveger seg nedover
  const infoRowY = useTransform(smoothProgress, [0, 1], [0, 70]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#ecebeb] text-[#161310]"
    >
      <div className="grid min-h-screen grid-cols-1 items-center gap-14 px-6 pb-20 pt-28 md:grid-cols-12 md:px-12 md:py-24">
        <motion.div className="relative z-20 md:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 text-xs uppercase tracking-[0.34em] text-[#161310]/45"
          >
            Curated lighting
          </motion.p>

          <h1 className="max-w-3xl text-[17vw] font-light leading-[0.88] tracking-[-0.085em] md:text-[7.2vw]">
            <Reveal delay={0.1}>Lighting</Reveal>
            <Reveal delay={0.22}>for calm</Reveal>
            <Reveal delay={0.34}>interiors</Reveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-8 max-w-sm text-base leading-[1.7] text-[#161310]/60 md:text-lg"
          >
            Minimal lighting selected for soft contrast, quiet atmosphere and
            everyday calm.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-8"
          >
            <Link
              href="/shop"
              className="bg-[#161310] px-7 py-4 text-sm text-[#ecebeb] transition hover:bg-[#2a261f]"
            >
              Shop collection
            </Link>

            <Link
              href="#new-products"
              className="group flex items-center gap-4 text-sm"
            >
              New products
              <span className="h-px w-12 bg-[#161310] transition-all duration-500 group-hover:w-20" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="relative z-10 md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="grid h-[62vh] min-h-[540px] grid-cols-12 gap-3 md:h-[74vh] md:gap-4"
          >
            <div className="col-span-4 grid grid-rows-2 gap-3 md:gap-4">
              <motion.div
                style={{ y: smallTopY }}
                className="relative overflow-hidden"
              >
                <Image
                  src={heroImages.smallTop}
                  alt="Calero interior detail"
                  fill
                  priority
                  sizes="(min-width: 768px) 18vw, 45vw"
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                style={{ y: smallBottomY }}
                className="relative overflow-hidden"
              >
                <Image
                  src={heroImages.smallBottom}
                  alt="Warm interior atmosphere"
                  fill
                  sizes="(min-width: 768px) 18vw, 45vw"
                  className="object-cover"
                />
              </motion.div>
            </div>

            <motion.div
              style={{ y: largeY, scale: largeScale }}
              className="relative col-span-8 overflow-hidden"
            >
              <Image
                src={heroImages.large}
                alt="Calero Studio calm interior lighting"
                fill
                priority
                sizes="(min-width: 768px) 44vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: infoRowY }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-6 grid grid-cols-3 border-t border-[#161310]/15 pt-5 text-sm"
          >
            <div>
              <p className="text-[#161310]/40">01</p>
              <p className="mt-1">Soft evenings</p>
            </div>

            <div>
              <p className="text-[#161310]/40">02</p>
              <p className="mt-1">Focused work</p>
            </div>

            <div>
              <p className="text-[#161310]/40">03</p>
              <p className="mt-1">Warm corners</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-6 right-6 z-20 hidden items-center justify-between text-xs uppercase tracking-[0.22em] text-[#161310]/35 md:flex">
        <span>Calero Studio</span>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}

function Reveal({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 1,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
