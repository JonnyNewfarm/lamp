"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useMemo, useRef } from "react";

const lines = ["SOFT LIGHT", "QUIET ROOMS", "WARM OBJECTS"];

export default function EditorialTextAssembleSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-22% 0px -22% 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#ecebeb] px-5 py-20 text-[#161310] md:px-12 md:py-28"
    >
      <div className="relative flex min-h-[72vh] flex-col justify-between">
        <div className="relative z-20 flex items-start justify-between gap-8">
          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-[230px] text-sm font-black uppercase leading-[0.95] tracking-[-0.055em] text-[#161310]/55 md:text-base"
          >
            Before the product comes the atmosphere.
          </motion.p>

          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="hidden max-w-[280px] text-right text-sm font-medium leading-[1.25] tracking-[-0.04em] text-[#161310]/45 md:block"
          >
            Lighting and objects selected for rooms that feel slower, softer,
            and more intentional.
          </motion.p>
        </div>

        <div className="relative z-10 my-12 md:my-14">
          {lines.map((line, index) => (
            <AssembleLine
              key={line}
              text={line}
              active={isInView}
              lineIndex={index}
            />
          ))}
        </div>

        <div className="relative z-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{
              duration: 0.85,
              delay: 1.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-[430px] text-base font-medium leading-[1.22] tracking-[-0.045em] text-[#161310]/55 md:text-lg"
          >
            A compact edit of pieces made to soften the room, warm the corners,
            and keep the atmosphere still.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{
              duration: 0.85,
              delay: 1.38,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center gap-5"
          >
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center border border-[#161310] px-6 text-xs font-black uppercase tracking-[-0.045em] text-[#161310] transition-colors duration-200 hover:bg-[#161310] hover:text-[#ecebeb]"
            >
              View products
            </Link>

            <span className="hidden h-px w-14 bg-[#161310]/60 md:block" />

            <span className="text-sm font-medium tracking-[-0.04em] text-[#161310]/45">
              New pieces next
            </span>
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
    <div className="-mb-[0.04em] overflow-hidden md:-mb-[0.06em]">
      <h2 className="flex justify-center whitespace-nowrap text-[clamp(2.8rem,9vw,10.5rem)] font-black uppercase leading-[0.86] tracking-[-0.095em] md:justify-start">
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
              ? -70 - distanceFromCenter * 8
              : isRightSide
                ? 70 + distanceFromCenter * 8
                : 0;

          const startY = isSpace ? 0 : -105 - distanceFromCenter * 12;

          const startRotate = isSpace
            ? 0
            : isLeftSide
              ? -7 - distanceFromCenter * 1
              : isRightSide
                ? 7 + distanceFromCenter * 1
                : 0;

          const delay = 0.16 + lineIndex * 0.24 + distanceFromCenter * 0.04;

          return (
            <motion.span
              key={`${text}-${charIndex}-${char}`}
              initial={{
                x: startX,
                y: startY,
                rotate: startRotate,
                opacity: isSpace ? 1 : 0,
                filter: isSpace ? "blur(0px)" : "blur(9px)",
              }}
              animate={
                active
                  ? {
                      x: 0,
                      y: 0,
                      rotate: 0,
                      opacity: 1,
                      filter: "blur(0px)",
                    }
                  : {
                      x: startX,
                      y: startY,
                      rotate: startRotate,
                      opacity: isSpace ? 1 : 0,
                      filter: isSpace ? "blur(0px)" : "blur(9px)",
                    }
              }
              transition={{
                duration: 0.95,
                delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={isSpace ? "w-[0.24em]" : "inline-block"}
            >
              {isSpace ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </h2>
    </div>
  );
}
