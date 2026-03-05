import { atom, useAtom } from "jotai";
import React, { useEffect, useMemo, useRef } from "react";

const pictures = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
];

export const pageAtom = atom(0);

export const pages = [{ front: "book-cover6", back: pictures[0] }];

for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const scrollToPage = (index: number) => {
  if (typeof window === "undefined") return;
  const h = window.innerHeight;
  window.scrollTo({ top: index * h, behavior: "smooth" });
};

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  const maxIndex = pages.length;
  const rafRef = useRef<number | null>(null);

  const scrollHeight = useMemo(() => {
    return (maxIndex + 1) * 100;
  }, [maxIndex]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;

        const h = window.innerHeight || 1;
        const raw = window.scrollY / h;
        const next = Math.max(0, Math.min(maxIndex, Math.round(raw)));

        setPage((current) => (current === next ? current : next));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [maxIndex, setPage]);

  return (
    <>
      <div style={{ height: `${scrollHeight}vh` }} />

      <main className="pointer-events-none select-none z-10 fixed inset-0" />
    </>
  );
};
