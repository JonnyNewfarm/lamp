"use client";

import { useEffect } from "react";
import { useScroll } from "@react-three/drei";
import { useSetAtom } from "jotai";
import { pageAtom } from "./UI";

export function ResetOnMount() {
  const scroll = useScroll();
  const setPage = useSetAtom(pageAtom);

  useEffect(() => {
    // reset state
    setPage(0);

    // reset ScrollControls sin container
    const el = scroll.el;
    if (el) el.scrollTop = 0;

    // noen ganger må den “poke” en gang til etter layout
    requestAnimationFrame(() => {
      const el2 = scroll.el;
      if (el2) el2.scrollTop = 0;
    });
  }, [scroll, setPage]);

  return null;
}
