"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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
      className="
        relative
        px-6
        py-20
      bg-[#eeeeec]
        text-[#1a1817]       
        md:px-12
        md:py-32
      "
    >
      <div className="pt-10">
        <div
          className="
            ml-auto
            flex
            max-w-4xl
            flex-col
            items-end
            text-right
          "
        >
          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              font-merchant
              text-4xl
              font-semibold
              tracking-[-0.034em]
              text-[#161310]
            "
          >
            Lighting by mood
          </motion.p>

          <motion.p
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              mt-4
              max-w-3xl
              font-merchant
              text-xl
              font-thin
              leading-[1.1]
              text-[#161310]
              md:text-3xl
            "
          >
            Calero Studio curates minimal lighting for calm interiors — from
            focused desk setups to warm evening corners and soft everyday
            spaces.
          </motion.p>
        </div>

        <div className="mt-20 pt-8">
          <div className="grid grid-cols-1 gap-4 text-sm xl:grid-cols-4">
            {roomLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="
                  group
                  relative
                  inline-flex
                  w-fit
                  overflow-hidden
                  pb-0.5
                  text-3xl
                  font-bold
                  font-merchant
                "
              >
                <span>{`For ${item.label}`}</span>

                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    bottom-1.5
                    left-0
                    h-px
                    w-full
                    origin-right
                    scale-x-0
                    bg-current
                    transition-transform
                    duration-500
                    ease-[cubic-bezier(0.76,0,0.24,1)]
                    group-hover:origin-left
                    group-hover:scale-x-100
                  "
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
