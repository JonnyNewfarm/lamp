"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

const categories = [
  {
    title: "Table",
    image: "/images/lamp-grain-1.jpg",
    href: "/shop?category=table-lamps",
    alt: "Table lamp",
  },
  {
    title: "Pendant",
    image: "/images/pend-1.jpg",
    href: "/shop?category=pendant-lighting",
    alt: "Pendant lighting",
  },
  {
    title: "Wall",
    image: "/images/wall-2.jpg",
    href: "/shop?category=wall-lights",
    alt: "Wall light",
  },
  {
    title: "Floor",
    image: "/images/floor-2.jpg",
    href: "/shop?category=floor-lamps",
    alt: "Floor lamp",
  },
];

type WordRevealProps = {
  text: string;
  className?: string;
  as?: "p" | "span";
  delay?: number;
};

function WordReveal({
  text,
  className = "",
  as = "p",
  delay = 0,
}: WordRevealProps) {
  const reducedMotion = useReducedMotion();

  const words = text.trim().split(/\s+/);

  const REVEAL_SPREAD = 0.18;
  const REVEAL_DURATION = 0.9;

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: "0.9em",
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

  const Component = as === "span" ? motion.span : motion.p;

  return (
    <Component
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.1,
        margin: "0px 0px -40px 0px",
      }}
      aria-label={text}
      className={className}
    >
      {words.map((word, index) => (
        <span key={index}>
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
    </Component>
  );
}

export default function EditorialTextAssembleSection() {
  return (
    <section
      className="
        noise-bg
        relative
        overflow-hidden
        bg-[#eeeeec]
        px-5
        py-20
        text-[#1a1817]
        md:px-12
        md:py-28
        lg:px-16
        lg:py-36
      "
    >
      <div className="relative mx-auto w-full">
        {/* LARGE EDITORIAL TEXT */}
        <div className="relative w-full">
          <WordReveal
            text="Lighting and objects selected for rooms that feel slower, softer, and more intentional."
            className="
              w-full
              text-[clamp(2.05rem,5vw,6.5rem)]
              font-normal
              leading-[1.1]
              tracking-[-0.015em]
              text-[#131412]
              md:[text-indent:20%]
            "
          />
        </div>

        {/* CATEGORIES */}
        <div
          className="
            mt-20
            grid
            grid-cols-2
            items-start
            gap-x-3
            gap-y-10
            md:mt-28
            md:grid-cols-4
            md:gap-x-5
            lg:mt-36
            lg:gap-x-7
          "
        >
          {categories.map((category) => (
            <div key={category.title} className="min-w-0 self-start">
              <Link href={category.href} className="group block">
                {/* IMAGE */}
                <div className="relative w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={category.image}
                    alt={category.alt}
                    loading="lazy"
                    draggable={false}
                    className="
                      block
                      h-auto
                      w-full
                      select-none
                      transition-transform
                      duration-[900ms]
                      ease-[cubic-bezier(0.16,1,0.3,1)]
                      group-hover:scale-[1.045]
                    "
                  />
                </div>

                {/* CATEGORY NAME */}
                <div className="mt-4 md:mt-5">
                  <WordReveal
                    as="span"
                    text={category.title}
                    className="
                      block
                      text-[15px]
                      font-normal
                      leading-none
                      tracking-[-0.025em]
                      md:text-[18px]
                    "
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* BOTTOM TEXT */}
        <div
          className="
            mt-24
            grid
            grid-cols-1
            gap-8
            md:mt-32
            md:grid-cols-[minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1.5fr)]
            md:items-start
            md:gap-x-8
            lg:mt-40
            lg:gap-x-12
          "
        >
          {/* LEFT */}
          <WordReveal
            text="Light changes how a room feels."
            className="
              max-w-[240px]
              text-[15px]
              leading-[1.35]
              tracking-[-0.025em]
              md:text-[clamp(16px,1.2vw,22px)]
            "
          />

          {/* CENTER */}
          <div className="md:justify-self-center">
            <Link
              href="/shop"
              className="
                group
                inline-flex
                items-center
                gap-3
                text-[15px]
                leading-[1.35]
                tracking-[-0.025em]
                md:text-[clamp(16px,1.2vw,22px)]
              "
            >
              <WordReveal
                as="span"
                text="Explore collection"
                className="inline-block whitespace-nowrap"
              />

              <span
                aria-hidden="true"
                className="
                  inline-block
                  transition-transform
                  duration-500
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              >
                ↗
              </span>
            </Link>
          </div>

          {/* RIGHT */}
          <WordReveal
            text="A quiet collection built around warm materials, soft silhouettes and considered light. Each piece is thoughtfully selected to bring warmth and a sense of calm into everyday spaces, creating an inviting atmosphere that feels effortless and timeless."
            delay={0.08}
            className="
              min-w-0
              max-w-[580px]
              text-[17px]
              leading-[1.32]
              tracking-[-0.025em]
              md:text-[clamp(18px,1.45vw,26px)]
            "
          />
        </div>
      </div>
    </section>
  );
}
