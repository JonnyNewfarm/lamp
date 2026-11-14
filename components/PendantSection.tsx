"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function PendantImageSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

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
          src="/pendant-bg-7.jpg"
          alt="Ceramic pendant lights surrounded by greenery"
          fill
          sizes="100vw"
          className="
            pointer-events-none
            select-none
            object-cover
            object-center
          "
          draggable={false}
        />
      </motion.div>

      {/* DARK OVERLAY */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-10
          bg-black/20
        "
      />
    </section>
  );
}
