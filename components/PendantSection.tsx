"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const PRODUCT_URL =
  "/products/vintage-ceramic-pendant-light-hand-painted-copper-hanging-lamp";

const slides = [
  {
    src: "/pendant-v3.jpg",
    alt: "Red hand-painted ceramic pendant light",
  },
  {
    src: "/pendant-v2.jpg",
    alt: "Blue hand-painted ceramic pendant light",
  },
];

const ease = [0.76, 0, 0.24, 1] as const;

export default function PendantImageSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  const textY = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);

  const sliderY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % slides.length;
      });
    }, 3200);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-[78svh]
        min-h-[620px]
        w-full
        overflow-hidden
        bg-[#161310]
        md:h-[92svh]
        md:min-h-[720px]
      "
    >
      {/* Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="
          absolute
          inset-x-0
          -inset-y-[12%]
          will-change-transform
        "
      >
        <Image
          src="/pendant-4.jpg"
          alt="Ceramic pendant lights surrounded by greenery"
          fill
          sizes="100vw"
          className="
            pointer-events-none
            select-none
            object-cover
            object-center
          "
        />
      </motion.div>

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-black/15" />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-r
          from-black/55
          via-black/20
          to-black/5
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/40
          via-transparent
          to-black/10
        "
      />

      {/* Text – not clickable */}
      <motion.div
        style={{ y: textY }}
        className="
          absolute
          left-5
          top-1/2
          z-10
          max-w-[88vw]
          -translate-y-1/2
          text-white
          will-change-transform
          md:left-10
          lg:left-14
        "
      >
        <h2
          className="
            font-merchant
            text-[clamp(4rem,9vw,10rem)]
            font-light
            leading-[0.76]
            tracking-[-0.055em]
            text-white
          "
        >
          Ceramic
          <br />
          Pendant Light
        </h2>

        <p
          className="
            mt-5
            font-merchant
            text-[clamp(1.55rem,2.8vw,3.25rem)]
            font-light
            leading-none
            tracking-[-0.04em]
            text-white/82
            md:mt-8
          "
        >
          – Hand-painted
        </p>
      </motion.div>

      {/* Slider */}
      <motion.div
        style={{ y: sliderY }}
        className="
          absolute
          bottom-5
          right-5
          z-20
          w-[28vw]
          min-w-[112px]
          max-w-[150px]
          will-change-transform
          md:bottom-10
          md:right-10
          md:w-[14vw]
          md:max-w-[190px]
          lg:bottom-14
          lg:right-14
          lg:max-w-[210px]
        "
      >
        {/* Only the image is clickable */}
        <Link
          href={PRODUCT_URL}
          aria-label="View Ceramic Pendant Light"
          className="
            relative
            block
            aspect-[4/5]
            overflow-hidden
            bg-[#eee9e0]
          "
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={slides[activeIndex].src}
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{
                duration: 1,
                ease,
              }}
              className="absolute inset-0"
            >
              <Image
                src={slides[activeIndex].src}
                alt={slides[activeIndex].alt}
                fill
                sizes="
                  (max-width: 767px) 28vw,
                  (max-width: 1279px) 14vw,
                  210px
                "
                className="
                  pointer-events-none
                  select-none
                  object-cover
                  object-center
                "
              />
            </motion.div>
          </AnimatePresence>
        </Link>

        {/* Counter – not clickable */}
        <div
          className="
            mt-3
            flex
            items-center
            justify-end
            font-montserrat
            text-[8px]
            font-medium
            uppercase
            tracking-[0.15em]
            text-white
            md:text-[9px]
          "
        >
          <span>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
