"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSetAtom } from "jotai";
import { pageAtom } from "./UI";

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function ScrollDriver({
  totalStops,
  wheelSpeed = 0.0014, // desktop
  touchSpeed = 0.85, // mobil: lavere = roligere
  snapOnRelease = true,
}: {
  totalStops: number;
  wheelSpeed?: number;
  touchSpeed?: number;
  snapOnRelease?: boolean;
}) {
  const setPage = useSetAtom(pageAtom);

  // virtuell scroll 0..1
  const target = useRef(0);
  const current = useRef(0);

  const lastPage = useRef(-1);

  // touch
  const touchY = useRef<number | null>(null);
  const isTouching = useRef(false);

  // “snap request” på release
  const snapRequested = useRef(false);

  const pageCount = totalStops - 1;

  const requestSnapToNearest = () => {
    // snap target til nærmeste side (i 0..1 space)
    const raw = target.current * pageCount;
    const snapped = Math.round(raw) / pageCount;
    target.current = clamp(snapped, 0, 1);
  };

  useEffect(() => {
    const prevOverscroll = document.body.style.overscrollBehavior;
    const prevOverflow = document.body.style.overflow;

    // hindre iOS bounce + “body scroll”
    document.body.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      target.current = clamp(target.current + e.deltaY * wheelSpeed, 0, 1);
      snapRequested.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      isTouching.current = true;
      snapRequested.current = false;
      touchY.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isTouching.current || touchY.current == null) return;
      e.preventDefault();

      const y = e.touches[0]?.clientY ?? touchY.current;
      const dy = touchY.current - y; // swipe opp => dy + => fremover
      touchY.current = y;

      // viktig: skaler med skjermhøyde så iPhone 8 ikke blir “hyper”
      const h = window.innerHeight || 1;
      const delta = (dy / h) * touchSpeed; // typ ~0.85 per hel skjerm-swipe

      target.current = clamp(target.current + delta, 0, 1);
    };

    const onTouchEnd = () => {
      isTouching.current = false;
      touchY.current = null;

      if (snapOnRelease) {
        snapRequested.current = true; // be om snap i frame-loop (smooth)
      }
    };

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
  }, [wheelSpeed, touchSpeed, snapOnRelease]);

  useFrame((_, dt) => {
    // Smooth mot target (stabil uansett FPS)
    const smooth = 1 - Math.pow(0.00008, dt);
    current.current =
      current.current + (target.current - current.current) * smooth;

    // Når touch slipper, snap target én gang (men smooth inn)
    if (snapRequested.current) {
      requestSnapToNearest();
      snapRequested.current = false;
    }

    // Map til sideindex
    const raw = current.current * pageCount;
    const next = clamp(Math.round(raw), 0, pageCount);

    if (next !== lastPage.current) {
      lastPage.current = next;
      setPage(next);
    }
  });

  return null;
}
