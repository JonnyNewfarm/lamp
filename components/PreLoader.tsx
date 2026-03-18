"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type PreloaderProps = {
  onDone?: () => void;
  holdMs?: number;
};

export default function PreLoader({ onDone, holdMs = 2400 }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const letters = useMemo(() => "calero studio".split(""), []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, holdMs);

    return () => window.clearTimeout(timer);
  }, [holdMs]);

  return (
    <AnimatePresence mode="wait" onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1, transition: { duration: 0.2 } }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#3a3734]"
        >
          {/* frame lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: 1,
              transition: { duration: 1.1, ease, delay: 0.15 },
            }}
            className="absolute left-6 right-6 top-6 h-px origin-left bg-white/10"
          />

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: 1,
              transition: { duration: 1.1, ease, delay: 0.22 },
            }}
            className="absolute bottom-6 left-6 right-6 h-px origin-right bg-white/10"
          />

          <motion.div
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: 1,
              transition: { duration: 1, ease, delay: 0.2 },
            }}
            className="absolute bottom-20 left-6 top-20 w-px origin-top bg-white/10"
          />

          <motion.div
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: 1,
              transition: { duration: 1, ease, delay: 0.28 },
            }}
            className="absolute bottom-20 right-6 top-20 w-px origin-bottom bg-white/10"
          />

          {/* labels */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: 0.55,
              y: 0,
              transition: { duration: 0.7, delay: 0.45, ease },
            }}
            className="absolute left-6 top-9 text-[10px] uppercase tracking-[0.22em] text-white/70"
          >
            Calero Studio
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: 0.55,
              y: 0,
              transition: { duration: 0.7, delay: 0.55, ease },
            }}
            className="absolute right-6 top-9 text-[10px] uppercase tracking-[0.22em] text-white/70"
          >
            Entering Experience
          </motion.div>

          <div className="relative grid h-full w-full place-items-center p-10">
            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-wrap justify-center overflow-hidden">
                {letters.map((char, index) => {
                  const isSpace = char === " ";

                  return (
                    <motion.span
                      key={`${char}-${index}`}
                      initial={{ y: "130%", opacity: 0 }}
                      animate={{
                        y: "0%",
                        opacity: 1,
                        transition: {
                          duration: 0.95,
                          delay: 0.3 + index * 0.045,
                          ease,
                        },
                      }}
                      exit={{
                        y: "-110%",
                        opacity: 0,
                        transition: {
                          duration: 0.45,
                          ease,
                        },
                      }}
                      className="inline-block whitespace-pre text-[clamp(58px,10vw,148px)] font-semibold lowercase leading-[0.9] tracking-[-0.065em] text-[#f5f5f5]"
                      style={{
                        minWidth: isSpace ? "0.28em" : "auto",
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: 1,
                  transition: { duration: 1, delay: 1.05, ease },
                }}
                className="h-px w-[min(340px,46vw)] origin-center bg-white/15"
              />

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 0.62,
                  y: 0,
                  transition: { duration: 0.7, delay: 1.2, ease },
                }}
                className="m-0 text-[11px] uppercase tracking-[0.24em] text-white/70"
              >
                Nordic objects for calm spaces
              </motion.p>
            </div>

            {/* bottom progress */}
            <div className="absolute bottom-10 left-6 right-6 flex items-center justify-between gap-4">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: 0.55,
                  y: 0,
                  transition: { duration: 0.7, delay: 1.05, ease },
                }}
                className="whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-white/70"
              >
                Please wait
              </motion.span>

              <div className="relative h-px flex-1 overflow-hidden bg-white/10">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: 1,
                    transition: {
                      duration: holdMs / 1000,
                      ease: "linear",
                    },
                  }}
                  className="absolute inset-0 origin-left bg-[#f5f5f5]"
                />

                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{
                    x: "0%",
                    transition: {
                      duration: holdMs / 1000,
                      ease: "linear",
                    },
                  }}
                  className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#f5f5f5]"
                />
              </div>

              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: 0.75,
                  y: 0,
                  transition: { duration: 0.7, delay: 1.15, ease },
                }}
                className="whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-white/80"
              >
                01
              </motion.span>
            </div>
          </div>

          {/* exit wipe */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{
              scaleY: 1,
              transition: {
                duration: 0.7,
                ease,
                delay: 0.05,
              },
            }}
            className="pointer-events-none absolute inset-0 origin-bottom bg-[#3a3734]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
