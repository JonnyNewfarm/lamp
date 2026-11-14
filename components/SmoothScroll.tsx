"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import Lenis from "lenis";

const SmoothScrollerContext = createContext<Lenis | null>(null);

export const useSmoothScroller = () => useContext(SmoothScrollerContext);

export default function ScrollSection({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const scroller = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      syncTouch: false,
    });

    setLenis(scroller);

    return () => {
      scroller.destroy();
    };
  }, []);

  return (
    <SmoothScrollerContext.Provider value={lenis}>
      {children}
    </SmoothScrollerContext.Provider>
  );
}
