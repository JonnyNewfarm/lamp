"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const lines = ["SOFT LIGHT", "QUIET ROOMS", "WARM OBJECTS"];

const ease = [0.16, 1, 0.3, 1] as const;
const textEase = [0.76, 0, 0.24, 1] as const;

export default function EditorialTextAssembleSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-20% 0px -20% 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="noise-bg relative overflow-hidden bg-[#ecebeb] px-5 py-20 text-[#161310] md:px-12 md:py-28"
    >
      <div className="relative z-20 grid min-h-[78vh] grid-cols-1 content-between gap-14 md:grid-cols-12">
        <div className="md:col-span-12">
          <div className="grid grid-cols-1 gap-8 pt-12 md:grid-cols-12 md:pt-16">
            <motion.div
              initial={{
                y: 28,
                opacity: 0,
              }}
              animate={
                isInView
                  ? {
                      y: 0,
                      opacity: 1,
                    }
                  : {
                      y: 28,
                      opacity: 0,
                    }
              }
              transition={{
                duration: 0.95,
                delay: 0.2,
                ease,
              }}
              className="hidden md:col-span-3 md:col-start-10 md:block"
            >
              <p className="text-right text-sm font-medium leading-[1.18] tracking-[-0.045em] text-[#161310]/80 md:text-md">
                Lighting and objects selected for rooms that feel slower,
                softer, and more intentional.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="relative md:col-span-12">
          <div className="relative">
            {lines.map((line, index) => (
              <AssembleLine
                key={line}
                text={line}
                active={isInView}
                lineIndex={index}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:col-span-12 md:grid-cols-12 md:items-end">
          <motion.div
            initial={{
              y: 34,
              opacity: 0,
            }}
            animate={
              isInView
                ? {
                    y: 0,
                    opacity: 1,
                  }
                : {
                    y: 34,
                    opacity: 0,
                  }
            }
            transition={{
              duration: 1,
              delay: 1.24,
              ease,
            }}
            className="flex flex-col items-end gap-5 md:col-span-4 md:col-start-9"
          >
            <Link
              href="/shop"
              className="
                group
                inline-flex
                items-center
                gap-4
                text-[28px]
                font-bold
                uppercase
                leading-none
                tracking-[-0.01em]
                md:text-[42px]
              "
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 52 18"
                fill="none"
                className="h-[18px] w-[52px] overflow-visible"
              >
                <path
                  d="M51 9H6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />

                <path
                  d="M6 9L13 2"
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
                  d="M6 9L13 16"
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

              <span>View all</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AssembleLine({
  text,
  active,
  lineIndex,
}: {
  text: string;
  active: boolean;
  lineIndex: number;
}) {
  return (
    <div className="relative -mb-[0.05em] overflow-hidden pb-[0.08em] pt-[0.04em] md:-mb-[0.075em]">
      <motion.h2
        initial={{
          y: "115%",
          rotate: 2,
          skewY: 3,
        }}
        animate={
          active
            ? {
                y: "0%",
                rotate: 0,
                skewY: 0,
              }
            : {
                y: "115%",
                rotate: 2,
                skewY: 3,
              }
        }
        transition={{
          duration: 1.25,
          delay: 0.08 + lineIndex * 0.13,
          ease: textEase,
        }}
        className="
          origin-bottom-left
          whitespace-nowrap
          text-[clamp(2.4rem,9.4vw,11rem)]
          font-normal
          leading-[0.9]
          tracking-[-0.015em]
          text-[#28311f]
          will-change-transform
          md:text-[clamp(1.2rem,7.5vw,9rem)]
        "
      >
        {text}
      </motion.h2>
    </div>
  );
}
