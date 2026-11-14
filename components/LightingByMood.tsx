"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

const REVEAL_SPREAD = 0.15;
const REVEAL_DURATION = 0.85;

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

type WordRevealProps = {
  text: string;
  className?: string;
  delay?: number;
};

function WordReveal({ text, className = "", delay = 0 }: WordRevealProps) {
  const reducedMotion = useReducedMotion();

  const words = text.trim().split(/\s+/);

  const containerVariants: Variants = {
    hidden: {},
    visible: {},
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: reducedMotion ? 1 : 0,
      y: reducedMotion ? 0 : "0.9em",
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : REVEAL_DURATION,
        delay: reducedMotion
          ? 0
          : delay + (index / Math.max(words.length - 1, 1)) * REVEAL_SPREAD,
        ease,
      },
    }),
  };

  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
        margin: "0px 0px -40px 0px",
      }}
      variants={containerVariants}
      aria-label={text}
      className={className}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <motion.span
            custom={index}
            variants={wordVariants}
            aria-hidden="true"
            className="inline-block whitespace-nowrap"
            style={{
              textIndent: 0,
            }}
          >
            {word}
          </motion.span>

          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.p>
  );
}

export default function LightingByMood() {
  return (
    <section
      id="moods"
      className="
        relative
        bg-[#eeeeec]
        px-6
        py-20
        text-[#1a1817]
        md:px-12
        md:py-32
      "
    >
      <div className="pt-10">
        {/* HEADING + DESCRIPTION */}
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
          {/* DESCRIPTION */}
          <WordReveal
            text="Calero Studio curates minimal lighting for calm interiors — from focused desk setups to warm evening corners and soft everyday spaces."
            delay={0.08}
            className="
              max-w-3xl
              text-xl
              tracking-[-0.7px]
              text-[#161310]
              md:text-3xl
            "
          />
        </div>

        {/* ROOM LINKS — NO TEXT REVEAL */}
        <div className="mt-20 pt-8">
          <div
            className="
              grid
              grid-cols-1
              gap-4
              text-sm
              xl:grid-cols-4
            "
          >
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
                  text-2xl
                  font-bold
                  uppercase
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
