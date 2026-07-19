"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const arrowEase = [0.22, 1, 0.36, 1] as const;

type NavigationButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export default function NavigationButton({
  children,
  onClick,
}: NavigationButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial="idle"
      whileHover="hover"
      className="flex w-fit cursor-pointer items-center justify-end gap-2 uppercase"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 52 18"
        fill="none"
        className="h-[14px] w-[42px] overflow-visible md:h-[16px] md:w-[48px]"
      >
        <motion.path
          d="M1 9H45"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          variants={{
            idle: {
              pathLength: 0,
              opacity: 0,
            },
            hover: {
              pathLength: 1,
              opacity: 1,
            },
          }}
          transition={{
            pathLength: {
              duration: 0.18,
              ease: arrowEase,
            },
            opacity: {
              duration: 0.05,
            },
          }}
        />

        <motion.path
          d="M45 9L38 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          variants={{
            idle: {
              pathLength: 0,
              opacity: 0,
            },
            hover: {
              pathLength: 1,
              opacity: 1,
            },
          }}
          transition={{
            pathLength: {
              duration: 0.13,
              delay: 0.07,
              ease: arrowEase,
            },
            opacity: {
              duration: 0.04,
              delay: 0.07,
            },
          }}
        />

        <motion.path
          d="M45 9L38 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          variants={{
            idle: {
              pathLength: 0,
              opacity: 0,
            },
            hover: {
              pathLength: 1,
              opacity: 1,
            },
          }}
          transition={{
            pathLength: {
              duration: 0.13,
              delay: 0.07,
              ease: arrowEase,
            },
            opacity: {
              duration: 0.04,
              delay: 0.07,
            },
          }}
        />
      </svg>

      <span>{children}</span>
    </motion.button>
  );
}
