"use client";

import { useEffect } from "react";
import { useScroll } from "@react-three/drei";
import { useSetAtom } from "jotai";
import { pageAtom } from "./UI";

export function ResetOnMount() {
  const scroll = useScroll();
  const setPage = useSetAtom(pageAtom);

  useEffect(() => {
    setPage(0);

    const el = scroll.el;
    if (el) el.scrollTop = 0;

    requestAnimationFrame(() => {
      const el2 = scroll.el;
      if (el2) el2.scrollTop = 0;
    });
  }, [scroll, setPage]);

  return null;
}
