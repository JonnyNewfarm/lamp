"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const PRODUCT_URL =
  "/products/vintage-ceramic-pendant-light-hand-painted-copper-hanging-lamp";

export default function PendantImageSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  const textY = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-[78svh]
        min-h-[620px]
        w-full
        overflow-hidden
        bg-[#1a1817]
        md:h-[92svh]
        md:min-h-[720px]
      "
    >
      <Link
        href={PRODUCT_URL}
        aria-label="View Ceramic Pendant Light"
        data-calero-cursor="VIEW LAMP"
        className="
          absolute
          inset-0
          block
          cursor-pointer
        "
      >
        <motion.div
          style={{
            y: backgroundY,
          }}
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
            priority
            sizes="100vw"
            className="
              pointer-events-none
              select-none
              object-cover
              object-center
            "
          />
        </motion.div>

        <motion.div
          style={{
            y: textY,
          }}
          className="
            pointer-events-none
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
              font-bueno
              text-4xl
              font-bold
              uppercase
              leading-[0.9]
              text-white
              sm:text-[clamp(1.25rem,5vw,6rem)]
            "
          >
            Ceramic
            <br />
            Pendant Light
          </h2>

          <p
            className="
              mt-5
              font-bueno
              text-2xl
              font-semibold
              leading-none
              text-white
              sm:text-[clamp(1rem,2.8vw,3.25rem)]
              md:mt-8
            "
          >
            – Hand-painted
          </p>
        </motion.div>

        <span
          className="
            pointer-events-none
            absolute
            bottom-5
            right-5
            z-20
            mix-blend-difference
            font-bueno
            text-[1rem]
            font-bold
            uppercase
            leading-none
            tracking-[-0.025em]
            text-white
            md:hidden
          "
        >
          View lamp
        </span>
      </Link>
    </section>
  );
}
