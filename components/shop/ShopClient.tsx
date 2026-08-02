"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ShopHero() {
  return (
    <section
      className="
        pb-16
        pt-8
        md:pb-20
        md:pt-14
      "
    >
      <motion.p
        initial={{
          opacity: 0,
          y: 20,
          filter: "blur(6px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.85,
          ease,
        }}
        className="
          max-w-[600px]
          font-merchant
          text-[clamp(1.35rem,1.6vw,1.9rem)]
          font-normal
          leading-[1.2]
          tracking-[-0.025em]
          text-[#161310]
        "
      >
        Minimal lighting curated for calm interiors, focused work and warm
        everyday spaces.
      </motion.p>
    </section>
  );
}
