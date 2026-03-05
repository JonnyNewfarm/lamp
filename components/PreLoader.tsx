"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type PreloaderProps = {
  onDone?: () => void;
  holdMs?: number;
};

export default function Preloader({ onDone, holdMs = 1200 }: PreloaderProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), holdMs);
    return () => clearTimeout(t);
  }, [holdMs]);

  return (
    <AnimatePresence mode="wait" onExitComplete={onDone}>
      {show && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#0b0b0b",
            display: "grid",
            placeItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "16px",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontSize: "clamp(44px, 9vw, 120px)",
              fontWeight: 600,
              color: "#fff",
              textTransform: "lowercase",
              whiteSpace: "nowrap",
            }}
          >
            <motion.span
              initial={{ x: "-120%" }}
              animate={{ x: 0, transition: { duration: 0.85, ease } }}
            >
              calero
            </motion.span>

            <motion.span
              initial={{ x: "120%" }}
              animate={{ x: 0, transition: { duration: 0.85, ease } }}
            >
              studio
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
