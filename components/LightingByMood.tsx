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
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
        margin: "0px 0px -40px 0px",
      }}
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
        
        text-[#1a1817]
        md:px-12
        md:py-32
      "
    >
      <div className="pt-10">
        <div
          className="
            flex
            w-full
            flex-col-reverse
            gap-12
            md:flex-row
            md:items-start
            md:justify-between
            md:gap-10
            lg:gap-20
          "
        >
          {/* LEFT — VIDEO + ROOM LINKS */}
          <div
            className="
              flex
              w-full
              min-w-0
              flex-col
              md:w-[28%]
              md:shrink-0
              lg:w-[20%]
            "
          >
            {/* HORIZONTAL VIDEO — DESKTOP ONLY */}
            <div
              className="
                hidden
                w-full
                overflow-hidden
                md:block
              "
            >
              <video
                src="/mood-2.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                className="
                  block
                  aspect-video
                  w-full
                  object-cover
                "
              />
            </div>

            {/* ROOM LINKS — VERTICAL */}
            <nav
              aria-label="Shop lighting by room"
              className="
                flex
                flex-col
                items-start
                gap-4
                md:mt-10
                md:gap-5
                lg:mt-12
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
                    max-w-full
                    pb-0.5
                    text-2xl
                    font-normal
                    leading-[1.1]
                    tracking-[-0.035em]
                    md:text-[clamp(15px,1.6vw,24px)]
                  "
                >
                  <span>{`For ${item.label}`}</span>

                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      bottom-0
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
            </nav>
          </div>

          {/* RIGHT — DESCRIPTION */}
          <div
            className="
              ml-auto
              flex
              w-full
              min-w-0
              max-w-[1050px]
              flex-col
              items-end
              md:flex-1
            "
          >
            <WordReveal
              text="Calero Studio curates minimal lighting for calm interiors — from focused desk setups to warm evening corners and soft everyday spaces."
              delay={0.08}
              className="
                text-[clamp(24px,3.9vw,65px)]
                leading-[1.12]
                tracking-[-0.035em]
                text-[#161310]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
