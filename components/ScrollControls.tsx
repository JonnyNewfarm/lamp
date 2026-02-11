import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useAtom } from "jotai";
import { pageAtom } from "./UI";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export function ScrollSync({
  totalStops,
  intro = 0.15, // <-- % av scroll brukt på tilt før flipping starter
}: {
  totalStops: number;
  intro?: number;
}) {
  const scroll = useScroll();
  const [page, setPage] = useAtom(pageAtom);

  const lastFromScroll = useRef<number>(-1);
  const isProgrammatic = useRef(false);
  const programmaticTimeout = useRef<number | null>(null);

  // Scroll -> pageAtom, men først etter "intro"
  useFrame(() => {
    if (isProgrammatic.current) return;

    const t = scroll.offset; // 0..1
    const t2 = clamp01((t - intro) / (1 - intro)); // 0..1 etter intro

    const raw = t2 * (totalStops - 1);
    const next = Math.max(0, Math.min(totalStops - 1, Math.round(raw)));

    if (next !== lastFromScroll.current) {
      lastFromScroll.current = next;
      setPage((cur) => (cur === next ? cur : next));
    }
  });

  // Page -> Scroll (hvis du senere vil sync, ellers kan du droppe denne helt)
  useEffect(() => {
    const el = scroll.el;
    if (!el) return;

    // map page tilbake til scroll offset, men med intro “reservert”
    const t2 = page / (totalStops - 1); // 0..1
    const t = intro + t2 * (1 - intro); // intro..1

    const targetTop = (el.scrollHeight - el.clientHeight) * t;

    isProgrammatic.current = true;
    el.scrollTo({ top: targetTop, behavior: "smooth" });

    if (programmaticTimeout.current)
      window.clearTimeout(programmaticTimeout.current);
    programmaticTimeout.current = window.setTimeout(() => {
      isProgrammatic.current = false;
    }, 250);

    return () => {
      if (programmaticTimeout.current)
        window.clearTimeout(programmaticTimeout.current);
    };
  }, [page, scroll.el, totalStops, intro]);

  return null;
}
