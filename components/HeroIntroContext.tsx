"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export type HeroIntroStage = "loading" | "navigation" | "complete";

type HeroIntroContextValue = {
  stage: HeroIntroStage;
  setIntroStage: (stage: HeroIntroStage) => void;
};

type IntroState = {
  pathname: string;
  stage: HeroIntroStage;
};

const HeroIntroContext = createContext<HeroIntroContextValue | null>(null);

export function HeroIntroProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const [state, setState] = useState<IntroState>({
    pathname,
    stage: pathname === "/" ? "loading" : "complete",
  });

  // Reset when navigating between pages.
  useEffect(() => {
    setState({
      pathname,
      stage: pathname === "/" ? "loading" : "complete",
    });
  }, [pathname]);

  const stage =
    state.pathname === pathname
      ? state.stage
      : pathname === "/"
        ? "loading"
        : "complete";

  const setIntroStage = useCallback(
    (nextStage: HeroIntroStage) => {
      setState({
        pathname,
        stage: nextStage,
      });
    },
    [pathname],
  );

  const value = useMemo(
    () => ({
      stage,
      setIntroStage,
    }),
    [stage, setIntroStage],
  );

  return (
    <HeroIntroContext.Provider value={value}>
      {children}
    </HeroIntroContext.Provider>
  );
}

export function useHeroIntro() {
  const context = useContext(HeroIntroContext);

  if (!context) {
    throw new Error("useHeroIntro must be used inside HeroIntroProvider");
  }

  return context;
}
