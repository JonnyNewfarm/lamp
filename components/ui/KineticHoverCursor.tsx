"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const FOLLOW_SPEED = 10;
const MAX_TILT_DEG = 2.5;
const MAX_EXTRA_SPACING_EM = 0.25;
const SPREAD_AT_SPEED = 15;
const KINETIC_DAMPING = 11;
const BASE_SPACING_EM = 0.11;

export default function KineticHoverCursor() {
  const [mounted, setMounted] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const kineticRef = useRef<HTMLDivElement>(null);
  const pressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const cursor = cursorRef.current;
    const kinetic = kineticRef.current;
    const press = pressRef.current;
    const text = textRef.current;

    if (!cursor || !kinetic || !press || !text) return;

    const pointerMedia = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)",
    );

    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    let initialized = false;
    let visible = false;
    let currentLabel = "";

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    let tilt = 0;
    let spacing = 0;

    let frame = 0;
    let previousTime = 0;

    const reducedMotion = () => motionMedia.matches;

    const positionCursor = (x: number, y: number) => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const animateCursor = (time: number) => {
      frame = 0;

      const delta = previousTime
        ? Math.max(1, Math.min(50, time - previousTime))
        : 1000 / 60;

      previousTime = time;

      const seconds = delta / 1000;
      const reduce = reducedMotion();

      const follow = reduce ? 1 : 1 - Math.exp(-FOLLOW_SPEED * seconds);

      const lastX = currentX;
      const lastY = currentY;

      currentX += (targetX - currentX) * follow;
      currentY += (targetY - currentY) * follow;

      const motionX = (currentX - lastX) / seconds / 60;

      const motionY = (currentY - lastY) / seconds / 60;

      const speed = Math.hypot(motionX, motionY);

      const strength = reduce ? 0 : Math.min(speed / SPREAD_AT_SPEED, 1);

      const desiredTilt = reduce
        ? 0
        : Math.max(
            -MAX_TILT_DEG,
            Math.min(MAX_TILT_DEG, motionX * 0.22 + motionY * 0.04),
          );

      const desiredSpacing = MAX_EXTRA_SPACING_EM * strength;

      const damping = reduce ? 1 : 1 - Math.exp(-KINETIC_DAMPING * seconds);

      tilt += (desiredTilt - tilt) * damping;
      spacing += (desiredSpacing - spacing) * damping;

      const positionSettled =
        Math.abs(targetX - currentX) < 0.1 &&
        Math.abs(targetY - currentY) < 0.1;

      const kineticSettled =
        Math.abs(tilt) < 0.015 && Math.abs(spacing) < 0.0003;

      if (positionSettled) {
        currentX = targetX;
        currentY = targetY;
      }

      if (kineticSettled && speed < 0.05) {
        tilt = 0;
        spacing = 0;
      }

      positionCursor(currentX, currentY);

      kinetic.style.transform = `rotate(${tilt}deg)`;

      text.style.letterSpacing = `${BASE_SPACING_EM + spacing}em`;

      if (!positionSettled || !kineticSettled) {
        frame = requestAnimationFrame(animateCursor);
      } else {
        previousTime = 0;
      }
    };

    const requestFrame = () => {
      if (frame) return;
      frame = requestAnimationFrame(animateCursor);
    };

    const show = () => {
      if (visible) return;

      visible = true;
      cursor.style.opacity = "1";
    };

    const hide = () => {
      if (!visible) return;

      visible = false;
      cursor.style.opacity = "0";
      press.style.transform = "scale(1)";
    };

    const updateLabel = (label: string) => {
      if (currentLabel === label) return;

      currentLabel = label;
      text.textContent = label;

      text.getAnimations().forEach((animation) => {
        animation.cancel();
      });

      if (!reducedMotion()) {
        text.animate(
          [
            {
              opacity: 0,
              transform: "translateY(7px)",
            },
            {
              opacity: 1,
              transform: "translateY(0px)",
            },
          ],
          {
            duration: 420,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          },
        );
      }
    };

    const refreshHover = () => {
      if (!initialized || !pointerMedia.matches) {
        hide();
        return;
      }

      const element = document.elementFromPoint(targetX, targetY);

      const target = element?.closest<HTMLElement>("[data-calero-cursor]");

      const label = target?.dataset.caleroCursor;

      if (!label) {
        hide();
        return;
      }

      updateLabel(label);
      show();
    };

    const updatePosition = (x: number, y: number) => {
      targetX = x;
      targetY = y;

      if (!initialized) {
        initialized = true;
        currentX = x;
        currentY = y;
        positionCursor(x, y);
      }

      requestFrame();
      refreshHover();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!event.isPrimary || event.pointerType === "touch") {
        return;
      }

      updatePosition(event.clientX, event.clientY);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (
        !visible ||
        !event.isPrimary ||
        event.pointerType === "touch" ||
        event.button !== 0
      ) {
        return;
      }

      press.style.transform = "scale(0.82)";
    };

    const handlePointerUp = () => {
      press.style.transform = "scale(1)";
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        hide();
      }
    };

    const handleViewportChange = () => {
      refreshHover();
    };

    window.addEventListener("pointermove", handlePointerMove, true);

    window.addEventListener("pointerdown", handlePointerDown, true);

    window.addEventListener("pointerup", handlePointerUp, true);

    window.addEventListener("pointercancel", handlePointerUp, true);

    document.addEventListener("scroll", handleViewportChange, true);

    window.addEventListener("resize", handleViewportChange);

    window.addEventListener("wheel", handleViewportChange, { passive: true });

    document.addEventListener("mouseout", handleMouseOut, true);

    window.addEventListener("blur", hide);

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("pointermove", handlePointerMove, true);

      window.removeEventListener("pointerdown", handlePointerDown, true);

      window.removeEventListener("pointerup", handlePointerUp, true);

      window.removeEventListener("pointercancel", handlePointerUp, true);

      document.removeEventListener("scroll", handleViewportChange, true);

      window.removeEventListener("resize", handleViewportChange);

      window.removeEventListener("wheel", handleViewportChange);

      document.removeEventListener("mouseout", handleMouseOut, true);

      window.removeEventListener("blur", hide);

      text.getAnimations().forEach((animation) => {
        animation.cancel();
      });
    };
  }, [mounted]);

  return (
    <>
      <style>{`
        @media (min-width: 768px) and (hover: hover) and (pointer: fine) {
          [data-calero-cursor],
          [data-calero-cursor] * {
            cursor: none !important;
          }
        }
      `}</style>

      {mounted &&
        createPortal(
          <div
            ref={cursorRef}
            aria-hidden="true"
            className="
              pointer-events-none
              fixed
              left-0
              top-0
              z-[9999]
              mix-blend-difference
              opacity-0
              transition-opacity
              duration-200
              ease-out
            "
            style={{
              transform: "translate3d(-200px, -200px, 0)",
              willChange: "transform, opacity",
            }}
          >
            <div
              className="
                absolute
                left-0
                top-0
                -translate-x-1/2
                -translate-y-1/2
              "
            >
              <div
                ref={kineticRef}
                className="
                  origin-center
                  will-change-transform
                "
              >
                <div
                  ref={pressRef}
                  className="
                    origin-center
                    transition-transform
                    duration-300
                    ease-[cubic-bezier(0.16,1,0.3,1)]
                    will-change-transform
                  "
                >
                  <span
                    ref={textRef}
                    className="
                      block
                      whitespace-nowrap
                      font-bueno
                      text-[clamp(1.05rem,1.6vw,1.75rem)]
                      font-bold
                      uppercase
                      leading-none
                      text-white
                      will-change-transform
                    "
                    style={{
                      letterSpacing: `${BASE_SPACING_EM}em`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
