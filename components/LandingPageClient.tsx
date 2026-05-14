"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const heroImages = {
  smallTop: {
    light: "/images/lamp-1.jpg",
    dark: "/images/lamp-1-dark.jpg",
  },
  smallBottom: {
    light: "/images/lamp-2.jpg",
    dark: "/images/lamp-2-dark.jpg",
  },
  large: {
    light: "/images/lamp-3.jpg",
    dark: "/images/lamp-3-dark.jpg",
  },
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function CaleroHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [cursorText, setCursorText] = useState("View mood");
  const [isHoveringImages, setIsHoveringImages] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, {
    stiffness: 280,
    damping: 32,
    mass: 0.4,
  });

  const cursorY = useSpring(mouseY, {
    stiffness: 280,
    damping: 32,
    mass: 0.4,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 32,
    mass: 0.7,
  });

  const textY = useTransform(smoothProgress, [0, 1], [0, 38]);

  const smallTopY = useTransform(smoothProgress, [0, 1], [0, -45]);
  const smallBottomY = useTransform(smoothProgress, [0, 1], [0, 78]);
  const largeY = useTransform(smoothProgress, [0, 1], [0, -30]);
  const largeScale = useTransform(smoothProgress, [0, 1], [1, 1.03]);

  const infoRowY = useTransform(smoothProgress, [0, 1], [0, 72]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    mouseX.set(event.clientX + 18);
    mouseY.set(event.clientY + 18);
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#ecebeb] text-[#161310]"
    >
      <div className="grid min-h-screen grid-cols-1 items-center gap-14 px-6 pb-20 pt-28 md:grid-cols-12 md:px-12 md:py-24">
        <motion.div
          style={{ y: textY }}
          className="relative z-20 md:col-span-5 md:w-[125%] "
        >
          <motion.div
            style={{ y: textY }}
            className="relative z-20 md:col-span-5 md:-translate-y-7  "
          >
            <h1 className="relative   z-20 font-black uppercase leading-[0.78] tracking-[-0.085em] md:leading-[0.76] md:tracking-[-0.095em]">
              <div className="inline-block">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45, ease }}
                  className="text-right mb-1 mr-2 text-[clamp(0.7rem,2.4vw,1rem)] font-black uppercase leading-none tracking-[-0.035em] text-[#161310] md:mb-1 md:text-[clamp(0.8rem,1vw,1rem)]"
                >
                  MADE FOR LIGHT. BUILT FOR CALM.
                </motion.p>

                <Reveal delay={0.1}>
                  <p className="whitespace-nowrap text-[21vw] md:text-[10.7vw]">
                    Calero
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.22}>
                <p className="whitespace-nowrap text-[18vw] md:text-[7.5vw] lg:text-[8.6vw] 2xl:text-[9.2vw]">
                  Studio
                </p>
              </Reveal>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-8 max-w-sm  text-base sm:hidden xl:hidden  leading-[1.7] text-[#161310]/60 md:text-lg"
          >
            Minimal lighting selected for soft contrast, quiet atmosphere and
            everyday calm.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-8"
          >
            <Link
              href="/shop"
              className="group relative inline-flex h-[56px] overflow-hidden border-[#161310] border-2 font-semibold px-7 text-sm text-[#161310] transition "
            >
              <span className="flex h-full items-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                Shop collection
              </span>

              <span className="absolute left-10 top-0 flex h-full items-center translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                Enter shop
              </span>
            </Link>

            <Link
              href="#new-products"
              className="group flex sm:hidden lg:flex items-center gap-4 text-sm"
            >
              <span className="relative overflow-hidden">
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                  New products
                </span>

                <span className="absolute left-0 top-full block transition-transform duration-500 group-hover:-translate-y-full">
                  Explore now
                </span>
              </span>

              <span className="h-px w-12 bg-[#161310] transition-all duration-500 group-hover:w-20" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="relative z-10 md:col-span-7">
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHoveringImages(true)}
            onMouseLeave={() => setIsHoveringImages(false)}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.25,
              ease,
            }}
            className="grid h-[62vh] min-h-[540px] cursor-none grid-cols-12 gap-3 md:h-[74vh] md:gap-4"
          >
            <div className="col-span-4 grid grid-rows-2 gap-3 overflow-visible md:gap-4">
              <ImagePanel
                src={heroImages.smallTop.light}
                darkSrc={heroImages.smallTop.dark}
                alt="Calero interior detail"
                sizes="(min-width: 768px) 18vw, 45vw"
                priority
                y={smallTopY}
                delay={0.42}
                imageDelay={0.42}
                label="01"
                title="Soft evenings"
                onHover={() => setCursorText("Soft evening")}
                className="w-full md:ml-8 md:w-[calc(100%-2rem)]"
              />

              <ImagePanel
                src={heroImages.smallBottom.light}
                darkSrc={heroImages.smallBottom.dark}
                alt="Warm interior atmosphere"
                sizes="(min-width: 768px) 24vw, 45vw"
                y={smallBottomY}
                delay={0.54}
                imageDelay={0.54}
                label="02"
                title="Warm corner"
                onHover={() => setCursorText("Warm corner")}
                className="w-full md:-ml-20 md:w-[calc(100%+5rem)]"
              />
            </div>

            <ImagePanel
              src={heroImages.large.light}
              darkSrc={heroImages.large.dark}
              alt="Calero Studio calm interior lighting"
              sizes="(min-width: 768px) 44vw, 100vw"
              priority
              y={largeY}
              scale={largeScale}
              delay={0.3}
              imageDelay={0.3}
              imageScale={1.08}
              className="col-span-8"
              label="03"
              title="Pendant focus"
              onHover={() => setCursorText("View mood")}
              large
            />
          </motion.div>

          <motion.div
            style={{ y: infoRowY }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-6 border-t border-[#161310]/20 pt-5"
          >
            <p className="ml-auto max-w-[38rem] text-lg font-black uppercase leading-tight tracking-[-0.04em] text-[#161310] md:text-2xl">
              Lighting, objects and interior atmosphere.
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          opacity: isHoveringImages ? 1 : 0,
          scale: isHoveringImages ? 1 : 0.92,
        }}
        transition={{ duration: 0.22 }}
        className="pointer-events-none fixed left-0 top-0 z-50 hidden border border-[#ecebeb]/40 bg-[#161310] px-4 py-3 text-xs uppercase tracking-[0.22em] text-[#ecebeb] md:block"
      >
        {cursorText}
      </motion.div>

      <div className="pointer-events-none absolute bottom-6 left-6 right-6 z-20 hidden items-center justify-between text-xs uppercase tracking-[0.22em] text-[#161310]/35 md:flex">
        <span>Calero Studio</span>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}

function ImagePanel({
  src,
  darkSrc,
  alt,
  sizes,
  priority = false,
  y,
  scale,
  delay,
  imageDelay,
  imageScale = 1.1,
  className = "",
  label,
  title,
  large = false,
  onHover,
}: {
  src: string;
  darkSrc: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  y: any;
  scale?: any;
  delay: number;
  imageDelay: number;
  imageScale?: number;
  className?: string;
  label: string;
  title: string;
  large?: boolean;
  onHover: () => void;
}) {
  return (
    <motion.div
      style={{ y, scale }}
      onMouseEnter={onHover}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{
        duration: 1.15,
        delay,
        ease,
      }}
      className={`group relative overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ scale: imageScale }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.45,
          delay: imageDelay,
          ease,
        }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition duration-700 group-hover:scale-[1.035]"
        />

        <Image
          src={darkSrc}
          alt=""
          fill
          sizes={sizes}
          aria-hidden="true"
          className="object-cover opacity-0 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-100"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#161310]/25 via-transparent to-transparent opacity-0 transition duration-700 group-hover:opacity-100" />

      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between text-[#ecebeb] opacity-0 transition duration-500 group-hover:opacity-100">
        <div>
          <p className="text-xs text-[#ecebeb]/60">{label}</p>
          <p className="mt-1 text-sm">{title}</p>
        </div>

        <span className="h-px w-10 bg-[#ecebeb]/70 transition-all duration-500 group-hover:w-16" />
      </div>

      {large && (
        <div className="pointer-events-none absolute right-4 top-4 hidden text-xs uppercase tracking-[0.22em] text-[#ecebeb]/70 opacity-0 transition duration-500 group-hover:opacity-100 md:block">
          Calm interior
        </div>
      )}
    </motion.div>
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
          ease,
        }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
