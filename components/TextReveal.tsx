// components/TextReveal.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const revealEase = [0.76, 0, 0.24, 1] as const;

type TextRevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  mode?: "words" | "lines";
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
};

export default function TextReveal({
  children,
  as: Component = "div",
  className = "",
  mode = "words",
  delay = 0,
  stagger = 0.045,
  duration = 0.8,
  once = true,
}: TextRevealProps) {
  const text = typeof children === "string" ? children : "";

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      y: "110%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration,
        ease: revealEase,
      },
    },
  };

  if (!text) {
    return <Component className={className}>{children}</Component>;
  }

  const items = mode === "lines" ? text.split("\n") : text.trim().split(/\s+/);

  return (
    <Component className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once,
          amount: 0.35,
        }}
        className="block"
      >
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;

          return (
            <span
              key={`${item}-${index}`}
              className={
                mode === "lines"
                  ? "block overflow-hidden pb-[0.08em]"
                  : "mr-[0.24em] inline-block overflow-hidden pb-[0.08em]"
              }
            >
              <motion.span
                variants={itemVariants}
                className="inline-block will-change-transform"
              >
                {item}
              </motion.span>

              {mode === "lines" && !isLastItem && null}
            </span>
          );
        })}
      </motion.span>
    </Component>
  );
}
