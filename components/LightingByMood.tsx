// components/LightingByMood.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const roomLinks = [
  {
    label: "Desk",
    href: "/shop?category=table-lamps",
  },
  {
    label: "Bedroom",
    href: "/shop?category=table-lamps",
  },
  {
    label: "Living room",
    href: "/shop?category=pendant-lighting",
  },
  {
    label: "Dining",
    href: "/shop?category=pendant-lighting",
  },
];

export default function LightingByMood() {
  return (
    <section
      id="moods"
      className="bg-[#ecebeb] z-[9999999]  px-6 py-20 text-[#161310] md:px-12 md:py-32"
    >
      <div className=" pt-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs uppercase tracking-[0.34em] text-[#161310]"
            >
              Lighting by mood
            </motion.p>
          </div>

          <div className="md:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl text-[14vw] text-[#28311f] uppercase font-black leading-[0.9] tracking-[-0.085em] md:text-[7vw]"
            >
              Find the right light for you.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-10 max-w-xl text-base leading-[1.8] text-[#161310]/90 md:text-lg"
            >
              Calero Studio curates minimal lighting for calm interiors — from
              focused desk setups to warm evening corners and soft everyday
              spaces.
            </motion.p>
          </div>
        </div>

        <div className="mt-20   pt-8">
          <div className="">
            <div className="grid grid-cols-1 gap-4 text-sm xl:grid-cols-4">
              {roomLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group inline-flex w-fit items-center gap-3 text-xl font-black"
                >
                  <span>{`For ${item.label}`}</span>

                  <svg
                    aria-hidden="true"
                    viewBox="0 0 52 18"
                    fill="none"
                    className="h-[16px] w-[46px] hidden md:block overflow-visible"
                  >
                    <path
                      d="M1 9H46"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />

                    <path
                      d="M46 9L39 2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                      pathLength="1"
                      className="
            [stroke-dasharray:1]
            [stroke-dashoffset:1]
            transition-[stroke-dashoffset]
            duration-300
            ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:[stroke-dashoffset:0]
          "
                    />

                    <path
                      d="M46 9L39 16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                      pathLength="1"
                      className="
            [stroke-dasharray:1]
            [stroke-dashoffset:1]
            transition-[stroke-dashoffset]
            duration-300
            ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:[stroke-dashoffset:0]
          "
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
