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

// liten helper (også brukt i Page-klikk)
export const scrollToPage = (index: number) => {
  if (typeof window === "undefined") return;
  const h = window.innerHeight;
  window.scrollTo({ top: index * h, behavior: "smooth" });
};

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  const maxIndex = pages.length; // inkluderer "Back Cover" som pages.length
  const rafRef = useRef<number | null>(null);

  // total scroll: (maxIndex + 1) “stopp”, én per viewport-høyde
  const scrollHeight = useMemo(() => {
    // +1 fordi index 0..maxIndex er (maxIndex+1) posisjoner
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

        // unngå spam av setPage
        setPage((current) => (current === next ? current : next));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // sync ved mount

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [maxIndex, setPage]);

  // valgfritt: hvis page endres av klikk på 3D-sidene, synk scroll-posisjon
  useEffect(() => {
    // hvis du IKKE vil auto-scroll når man klikker, kan du fjerne hele denne effekten
    const h = window.innerHeight || 1;
    const targetY = page * h;

    // liten terskel så vi ikke "fighting" med bruker-scroll
    if (Math.abs(window.scrollY - targetY) > h * 0.25) {
      scrollToPage(page);
    }
  }, [page]);

  return (
    <>
      {/* Denne gir deg scroll-lengden uten å “ligge over” og blokkere klikk */}
      <div style={{ height: `${scrollHeight}vh` }} />

      {/* Hvis du har overlays kan de være pointer-events-none */}
      <main className="pointer-events-none select-none z-10 fixed inset-0" />
    </>
  );
};
