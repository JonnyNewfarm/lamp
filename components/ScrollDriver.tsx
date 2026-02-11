"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSetAtom } from "jotai";
import { pageAtom } from "./UI";

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function ScrollDriver({
  totalStops,
  sensitivity = 0.0016, // øk hvis du vil bla fortere
}: {
  totalStops: number;
  sensitivity?: number;
}) {
  const setPage = useSetAtom(pageAtom);

  // 0..1 “virtuell scroll”
  const target = useRef(0);
  const current = useRef(0);

  const lastPage = useRef(-1);

  // Touch state
  const touchY = useRef<number | null>(null);

  useEffect(() => {
    // Hindre iOS “bounce” og gjør at vi alltid fanger swipe
    const prevOverscroll = document.body.style.overscrollBehavior;
    const prevOverflow = document.body.style.overflow;

    document.body.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";

    const onWheel = (e: WheelEvent) => {
      // Ikke la siden scrolle
      e.preventDefault();
      target.current = clamp(target.current + e.deltaY * sensitivity, 0, 1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchY.current == null) return;
      // Ikke la siden scrolle / bounce
      e.preventDefault();

      const y = e.touches[0]?.clientY ?? touchY.current;
      const dy = touchY.current - y; // swipe opp => dy positiv => fremover
      touchY.current = y;

      // Konverter fingerbevegelse til scroll progress
      target.current = clamp(target.current + dy * 0.0032, 0, 1);
    };

    const onTouchEnd = () => {
      touchY.current = null;
    };

    // NB: passive:false ellers kan vi ikke preventDefault på iOS
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel as any);
      window.removeEventListener("touchstart", onTouchStart as any);
      window.removeEventListener("touchmove", onTouchMove as any);
      window.removeEventListener("touchend", onTouchEnd as any);
      window.removeEventListener("touchcancel", onTouchEnd as any);

      document.body.style.overscrollBehavior = prevOverscroll;
      document.body.style.overflow = prevOverflow;
    };
  }, [sensitivity]);

  // Smooth/damped update + map to pages
  useFrame((_, dt) => {
    // damping
    const k = 1 - Math.pow(0.0001, dt); // føles smooth uansett FPS
    current.current = current.current + (target.current - current.current) * k;

    const raw = current.current * (totalStops - 1);
    const next = clamp(Math.round(raw), 0, totalStops - 1);

    if (next !== lastPage.current) {
      lastPage.current = next;
      setPage(next);
    }
  });

  return null;
}
