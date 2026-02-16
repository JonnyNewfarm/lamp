"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";

type Props = {
  href: string;
  children: ReactNode;
};

type Phase = "idle" | "in" | "out";

export default function AnimatedButton({ href, children }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");

  const bgClass =
    phase === "in"
      ? "animate-fillUpIn"
      : phase === "out"
        ? "animate-fillUpOut"
        : "translate-y-full";

  const textClass = phase === "idle" ? "text-black/80" : "text-white";

  return (
    <Link
      href={href}
      onMouseEnter={() => setPhase("in")}
      onMouseLeave={() => setPhase("out")}
      className="relative inline-flex items-center overflow-hidden border border-black/40 px-5 py-3 text-sm"
    >
      <span
        className={`absolute inset-0 bg-black ${bgClass}`}
        onAnimationEnd={() => {
          if (phase === "out") setPhase("idle");
        }}
      />

      <span
        className={`relative z-10 transition-colors duration-200 ${textClass}`}
      >
        {children}
      </span>
    </Link>
  );
}
