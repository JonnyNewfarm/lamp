"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function NewProductsIntro() {
  return (
    <div className="pointer-events-none grid gap-8 md:grid-cols-12 md:items-end">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease }}
        className="md:col-span-8"
      >
        <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-[#161310]/60">
          Latest arrivals
        </p>

        <h2 className="max-w-[58rem] text-[clamp(3.8rem,12vw,13rem)] font-black uppercase leading-[0.76] tracking-[-0.1em]">
          New
          <br />
          pieces
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.8, delay: 0.15, ease }}
        className="md:col-span-3 md:col-start-10"
      >
        <p className="max-w-sm text-base leading-[1.6] text-[#161310]/70 md:text-lg">
          Selected lighting objects for warm rooms, quiet corners and everyday
          atmosphere.
        </p>
      </motion.div>
    </div>
  );
}
