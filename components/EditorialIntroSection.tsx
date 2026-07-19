"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useMemo, useRef } from "react";

const lines = ["SOFT LIGHT", "QUIET ROOMS", "WARM OBJECTS"];

const ease = [0.16, 1, 0.3, 1] as const;

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
            <motion.p
              initial={{ y: 28, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 28, opacity: 0 }}
              transition={{
                duration: 0.95,
                delay: 0.12,
                ease,
              }}
              className="max-w-[260px] text-sm font-black uppercase leading-[0.9] tracking-[-0.06em] text-[#161310]/60 md:col-span-3 md:text-base"
            >
              Before the product comes the atmosphere.
            </motion.p>

            <motion.div
              initial={{ y: 28, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 28, opacity: 0 }}
              transition={{
                duration: 0.95,
                delay: 0.2,
                ease,
              }}
              className="hidden md:col-span-3 md:col-start-10 md:block"
            >
              <p className="text-right text-sm font-medium leading-[1.18] tracking-[-0.045em] text-[#161310]/45">
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
          <motion.p
            initial={{ y: 34, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 34, opacity: 0 }}
            transition={{
              duration: 1,
              delay: 1.12,
              ease,
            }}
            className="max-w-[520px] text-[clamp(1.25rem,2.2vw,2.4rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[#161310]/85 md:col-span-6"
          >
            A compact edit of pieces made to soften the room, warm the corners,
            and keep the atmosphere still.
          </motion.p>

          <motion.div
            initial={{ y: 34, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 34, opacity: 0 }}
            transition={{
              duration: 1,
              delay: 1.24,
              ease,
            }}
            className="flex flex-col gap-5 md:col-span-4 md:col-start-9 md:items-end"
          >
            <Link
              href="/shop"
              className="group relative inline-flex h-12 w-fit items-center overflow-hidden border border-[#161310] px-7 text-xs font-black uppercase tracking-[-0.045em] text-[#161310]"
            >
              <span className="absolute inset-0 translate-y-full bg-[#161310] transition-transform duration-300 ease-out group-hover:translate-y-0" />

              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#ecebeb]">
                View products
              </span>
            </Link>

            <div className="flex items-center gap-4 text-sm font-medium tracking-[-0.04em] text-[#161310]/45">
              <span className="h-px w-16 bg-[#161310]/45" />
              <span>New pieces next</span>
            </div>
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
  const characters = useMemo(() => text.split(""), [text]);

  const visibleCharacters = characters.filter((char) => char !== " ");
  const centerIndex = (visibleCharacters.length - 1) / 2;

  let visibleCharIndex = -1;

  return (
    <div className="group relative -mb-[0.05em] overflow-hidden md:-mb-[0.075em]">
      <h2 className="relative flex justify-start whitespace-nowrap text-[clamp(2.7rem,9.4vw,11rem)] font-black uppercase leading-[0.82] tracking-[-0.035em] text-[#28311f] md:text-[clamp(2.3rem,9.6vw,11.2rem)]">
        {characters.map((char, charIndex) => {
          const isSpace = char === " ";

          if (!isSpace) {
            visibleCharIndex += 1;
          }

          const distanceFromCenter = isSpace
            ? 0
            : Math.abs(visibleCharIndex - centerIndex);

          const isLeftSide = !isSpace && visibleCharIndex < centerIndex;
          const isRightSide = !isSpace && visibleCharIndex > centerIndex;

          const startX = isSpace
            ? 0
            : isLeftSide
              ? -52 - distanceFromCenter * 5
              : isRightSide
                ? 52 + distanceFromCenter * 5
                : 0;

          const startY = isSpace ? 0 : 42 + distanceFromCenter * 3;

          const delay = 0.1 + lineIndex * 0.2 + distanceFromCenter * 0.015;

          const hiddenState = {
            x: startX,
            y: startY,
            opacity: isSpace ? 1 : 0,
            filter: isSpace ? "blur(0px)" : "blur(5px)",
          };

          return (
            <motion.span
              key={`${text}-${charIndex}-${char}`}
              initial={hiddenState}
              animate={
                active
                  ? {
                      x: 0,
                      y: 0,
                      opacity: 1,
                      filter: "blur(0px)",
                    }
                  : hiddenState
              }
              transition={{
                duration: 1.18,
                delay,
                ease,
              }}
              className={
                isSpace
                  ? "w-[0.24em]"
                  : "inline-block will-change-transform transition-[letter-spacing] duration-500 group-hover:tracking-[-0.08em]"
              }
            >
              {isSpace ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </h2>
    </div>
  );
}
