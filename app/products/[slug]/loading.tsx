"use client";

import { motion } from "framer-motion";
import { useLayoutEffect } from "react";

export default function Loading() {
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        top-20
        z-30
        bg-[#eeeeec]
      "
    >
      <div
        className="
          absolute
          bottom-7
          right-7
          md:bottom-10
          md:right-12
        "
      >
        <div className="relative h-[3px] w-20 overflow-hidden bg-[#1a1817]/10">
          <motion.div
            animate={{
              x: ["-100%", "220%"],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="
              absolute
              inset-y-0
              left-0
              w-8
              bg-[#1f1d1d]
            "
          />
        </div>
      </div>
    </div>
  );
}
