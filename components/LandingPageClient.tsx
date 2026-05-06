// components/CaleroHero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CaleroHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#ecebeb] text-[#161310]">
      <div className="grid min-h-screen grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-12 md:px-12">
        <div className="relative z-10 md:col-span-5">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-xs uppercase tracking-[0.34em] text-[#161310]/45"
          >
            Scandinavian lighting
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
            Minimal lamps crafted with honest materials, soft contrast and quiet
            intention.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex items-center gap-8"
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
              New Products
              <span className="h-px w-12 bg-[#161310] transition-all duration-500 group-hover:w-20" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.1,
            delay: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative md:col-span-7"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/images/calero-collection.png"
              alt="Calero Studio Scandinavian lamp collection"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="mt-6 grid grid-cols-3 border-t border-[#161310]/15 pt-5 text-sm">
            <div>
              <p className="text-[#161310]/40">01</p>
              <p className="mt-1">Desk Lamp</p>
            </div>
            <div>
              <p className="text-[#161310]/40">02</p>
              <p className="mt-1">Pendant</p>
            </div>
            <div>
              <p className="text-[#161310]/40">03</p>
              <p className="mt-1">Portable</p>
            </div>
          </div>
        </motion.div>
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
