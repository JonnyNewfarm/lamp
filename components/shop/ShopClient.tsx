"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ShopHero() {
  return (
    <section
      className="
        overflow-hidden
        pb-16
        pt-8
        md:pb-20
        md:pt-14
      "
    >
      <div
        className="
          max-w-[620px]
          font-bueno
          text-xl
          sm:text-[clamp(1.5em,1.5vw,1.5rem)]
          leading-[1.2]
          tracking-[-0.01em]
          text-[#161310]
        "
      >
        {/* LINE 1 — FROM LEFT */}
        <div className="overflow-hidden">
          <motion.span
            initial={{
              opacity: 0,
              x: -45,
              filter: "blur(5px)",
            }}
            animate={{
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1,
              ease,
            }}
            className="block"
          >
            Minimal lighting curated for
          </motion.span>
        </div>

        {/* LINE 2 — FROM RIGHT */}
        <div className="overflow-hidden">
          <motion.span
            initial={{
              opacity: 0,
              x: 45,
              filter: "blur(5px)",
            }}
            animate={{
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1,
              delay: 0.08,
              ease,
            }}
            className="block"
          >
            calm interiors, focused work and warm everyday spaces.
          </motion.span>
        </div>
      </div>
    </section>
  );
}
