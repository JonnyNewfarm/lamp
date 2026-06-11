// components/LightingByMood.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import WaveLinkText from "./WaveLinkText";

const moods = [
  {
    number: "01",
    title: "For quiet evenings",
    text: "Soft lighting for bedrooms, reading corners and slow nights at home.",
    href: "/shop?category=pendant-lighting",
  },
  {
    number: "02",
    title: "For focused work",
    text: "Functional lamps for desks, shelves and calm workspace setups.",
    href: "/shop?category=table-lamps",
  },
  {
    number: "03",
    title: "For warm corners",
    text: "Small statement lights that bring atmosphere to overlooked spaces.",
    href: "/shop?category=floor-lamps",
  },
];

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
              className="text-xs uppercase tracking-[0.34em] text-[#161310]/45"
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
              className="mt-10 max-w-xl text-base leading-[1.8] text-[#161310]/60 md:text-lg"
            >
              Calero Studio curates minimal lighting for calm interiors — from
              focused desk setups to warm evening corners and soft everyday
              spaces.
            </motion.p>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3">
          {moods.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group  py-8   md:px-8 "
            >
              <Link href={item.href} className="block">
                <p className="text-sm text-[#161310]/40">{item.number}</p>

                <h3 className="mt-8 max-w-xs text-4xl font-light leading-none tracking-[-0.06em] md:text-5xl">
                  {item.title}
                </h3>

                <p className="mt-6 max-w-xs text-sm leading-[1.8] text-[#161310]/55 md:text-base">
                  {item.text}
                </p>

                <div className="mt-10 flex items-center gap-4 text-sm">
                  Explore
                  <span className="h-px w-10 bg-[#161310] transition-all duration-500 group-hover:w-16" />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 grid gap-8 border-t border-[#161310]/15 pt-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-sm text-[#161310]/45">
              Selected for atmosphere, simplicity and everyday use.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-4 text-sm lg:grid-cols-4">
              {roomLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-lg lg:text-center font-black "
                >
                  <WaveLinkText text={`For ${item.label}`} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
