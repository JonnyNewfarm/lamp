"use client";

import { useEffect, useMemo, useState } from "react";

type ScrambleTextProps = {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
  scrambleChars?: string;
  play?: boolean;
};

export default function ScrambleText({
  text,
  className = "",
  speed = 30,
  startDelay = 0,
  scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  play = true,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState("");
  const chars = useMemo(() => text.split(""), [text]);

  useEffect(() => {
    if (!play) {
      setDisplayText("");
      return;
    }

    let frame = 0;
    let timeout: NodeJS.Timeout | null = null;
    let interval: NodeJS.Timeout | null = null;

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame += 1;

        const revealedCount = Math.floor(frame / 2);

        const next = chars
          .map((char, index) => {
            if (char === " " || char === "," || char === "." || char === "—") {
              return char;
            }

            if (index < revealedCount) {
              return text[index];
            }

            return scrambleChars[
              Math.floor(Math.random() * scrambleChars.length)
            ];
          })
          .join("");

        setDisplayText(next);

        if (revealedCount >= chars.length) {
          if (interval) clearInterval(interval);
          setDisplayText(text);
        }
      }, speed);
    }, startDelay);

    return () => {
      if (timeout) clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [chars, play, scrambleChars, speed, startDelay, text]);

  return <span className={className}>{displayText}</span>;
}
