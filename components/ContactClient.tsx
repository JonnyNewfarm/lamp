"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const parent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

const panel = {
  hidden: { opacity: 0, y: 12, filter: "blur(5px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease, delay: 0.05 },
  },
};

export default function ContactClient() {
  return (
    <section className="px-6 pt-20 pb-10 mt-10">
      <motion.div
        className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12"
        variants={parent}
        initial="hidden"
        animate="show"
      >
        <motion.div className="lg:col-span-5" variants={parent}>
          <motion.div
            className="text-xs tracking-wide text-black/60"
            variants={item}
          >
            Contact
          </motion.div>

          <motion.h1
            className="mt-6 text-5xl leading-[0.95] font-semibold"
            variants={item}
          >
            Let’s keep it
            <br />
            simple.
          </motion.h1>

          <motion.p
            className="mt-6 text-base leading-relaxed text-black/70 max-w-md"
            variants={item}
          >
            Questions about the product, shipping, or collaborations — send a
            message and we’ll get back to you.
          </motion.p>
        </motion.div>

        <div className="lg:col-span-7">
          <motion.div className="border border-black/25 p-8" variants={panel}>
            <div className="space-y-8">
              <div>
                <div className="text-xs tracking-wide text-black/60">Email</div>
                <a
                  href="mailto:hello@calero.studio"
                  className="mt-2 block text-lg hover:underline underline-offset-4"
                >
                  calero.studio@gmail.com
                </a>
              </div>

              <div>
                <div className="text-xs tracking-wide text-black/60">
                  Location
                </div>
                <div className="mt-2 text-black/80">Europe</div>
              </div>

              <div>
                <div className="text-xs tracking-wide text-black/60">
                  Business
                </div>
                <div className="mt-2 text-black/80">
                  Wholesale, press & collaborations
                </div>
              </div>

              <div className="pt-6 border-t border-black/15 flex items-center gap-6 text-sm">
                <Link
                  href="/shop"
                  className="hover:underline underline-offset-4"
                >
                  Shop
                </Link>
                <Link href="/" className="hover:underline underline-offset-4">
                  Home
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 pointer-events-none"
            initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
          >
            <div className="text-xs tracking-[0.45em] text-black/50 [writing-mode:vertical-rl]">
              CALM BY DESIGN
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
