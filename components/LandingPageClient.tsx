"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useHeroIntro } from "./HeroIntroContext";

const ease = [0.16, 1, 0.3, 1] as const;

// PRELOADER
const MIN_LOADING_TIME = 600;
const MAX_LOADING_TIME = 10000;

// MAIN INTRO
const EXPAND_DURATION = 1.85;
const VIDEO_SLIDE_DURATION = 2.05;
const VIDEO_SLIDE_DELAY = 0.12;

// NAVBAR
const NAVBAR_REVEAL_START = 1.15;

// BOTTOM CONTENT
const DESCRIPTION_START = 1.25;
const CENTER_TEXT_START = 1.34;
const EXPLORE_START = 1.4;
const REVEAL_DURATION = 1.15;

const INTRO_COMPLETE_TIME =
  Math.max(
    VIDEO_SLIDE_DELAY + VIDEO_SLIDE_DURATION,
    DESCRIPTION_START + 0.12 + REVEAL_DURATION,
    CENTER_TEXT_START + REVEAL_DURATION,
    EXPLORE_START + REVEAL_DURATION,
  ) + 0.25;

type Phase = "loading" | "playing" | "done";

type TitleDimensions = {
  compact: number;
  expanded: number;
};

export default function CaleroHero() {
  const { setIntroStage } = useHeroIntro();

  const [phase, setPhase] = useState<Phase>("loading");

  const [minimumPassed, setMinimumPassed] = useState(false);
  const [loadingTimedOut, setLoadingTimedOut] = useState(false);

  const [fontsReady, setFontsReady] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const [dimensions, setDimensions] = useState<TitleDimensions | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const calmRef = useRef<HTMLSpanElement>(null);
  const byRef = useRef<HTMLSpanElement>(null);
  const designRef = useRef<HTMLSpanElement>(null);

  const reducedMotion = useReducedMotion();

  const introStarted = phase !== "loading";
  const introFinished = phase === "done";

  // REGISTER INTRO
  useEffect(() => {
    setIntroStage("loading");
  }, [setIntroStage]);

  // MEASURE TITLE
  useLayoutEffect(() => {
    let cancelled = false;

    const measure = () => {
      if (cancelled) return;

      const calmWidth = calmRef.current?.getBoundingClientRect().width ?? 0;

      const byWidth = byRef.current?.getBoundingClientRect().width ?? 0;

      const designWidth = designRef.current?.getBoundingClientRect().width ?? 0;

      if (!calmWidth || !byWidth || !designWidth) {
        return;
      }

      const screenWidth = window.innerWidth;

      const padding = screenWidth >= 768 ? 32 : screenWidth >= 640 ? 20 : 16;

      const expanded = screenWidth - padding * 2;

      const compact = Math.min(
        expanded,
        Math.ceil(Math.max(calmWidth, designWidth) * 2 + byWidth + 28),
      );

      setDimensions((previous) => {
        if (previous?.compact === compact && previous?.expanded === expanded) {
          return previous;
        }

        return { compact, expanded };
      });
    };

    measure();

    window.addEventListener("resize", measure);

    document.fonts?.ready.then(measure).catch(() => {});

    return () => {
      cancelled = true;
      window.removeEventListener("resize", measure);
    };
  }, []);

  // PRELOAD FONTS
  useEffect(() => {
    let cancelled = false;

    const minimumTimer = window.setTimeout(() => {
      if (!cancelled) setMinimumPassed(true);
    }, MIN_LOADING_TIME);

    const maximumTimer = window.setTimeout(() => {
      if (!cancelled) setLoadingTimedOut(true);
    }, MAX_LOADING_TIME);

    if (document.fonts) {
      document.fonts.ready
        .then(() => {
          if (!cancelled) setFontsReady(true);
        })
        .catch(() => {
          if (!cancelled) setFontsReady(true);
        });
    } else {
      setFontsReady(true);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(minimumTimer);
      window.clearTimeout(maximumTimer);
    };
  }, []);

  // VIDEO READY
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      setVideoReady(true);
    }

    if (video.error) {
      setVideoFailed(true);
    }
  }, []);

  // START INTRO
  useEffect(() => {
    if (phase !== "loading") return;

    if (reducedMotion) {
      setPhase("done");
      return;
    }

    const assetsReady = fontsReady && (videoReady || videoFailed);

    if (minimumPassed && dimensions && (assetsReady || loadingTimedOut)) {
      setPhase("playing");
    }
  }, [
    phase,
    reducedMotion,
    fontsReady,
    videoReady,
    videoFailed,
    minimumPassed,
    dimensions,
    loadingTimedOut,
  ]);

  // NAVBAR SYNCHRONIZATION
  useEffect(() => {
    if (phase !== "playing") return;

    const navbarTimer = window.setTimeout(() => {
      setIntroStage("navigation");
    }, NAVBAR_REVEAL_START * 1000);

    const finishTimer = window.setTimeout(() => {
      setPhase("done");
    }, INTRO_COMPLETE_TIME * 1000);

    return () => {
      window.clearTimeout(navbarTimer);
      window.clearTimeout(finishTimer);
    };
  }, [phase, setIntroStage]);

  useEffect(() => {
    if (phase === "done") {
      setIntroStage("complete");
    }
  }, [phase, setIntroStage]);

  // LOCK SCROLL
  useEffect(() => {
    if (introFinished) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [introFinished]);

  const getDelay = (delay: number) =>
    reducedMotion || !introStarted ? 0 : delay;

  return (
    <section
      id="calero-hero"
      className="
        relative
        isolate
        h-svh
        min-h-[560px]
        w-full
        overflow-hidden
        bg-[#0e0c0c]
        text-[#eeeeec]
      "
    >
      {/* VIDEO */}
      <motion.div
        initial={false}
        animate={{
          y: introStarted ? "0%" : "101%",
        }}
        transition={{
          duration: reducedMotion ? 0 : VIDEO_SLIDE_DURATION,
          delay: getDelay(VIDEO_SLIDE_DELAY),
          ease,
        }}
        className="
          absolute
          inset-0
          z-0
          overflow-hidden
          bg-[#1a1817]
          will-change-transform
        "
      >
        <motion.video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          initial={false}
          animate={{
            opacity: videoReady ? 1 : 0,
          }}
          transition={{
            opacity: {
              duration: 0.8,
              ease,
            },
          }}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        >
          <source src="/1114.mp4" type="video/mp4" />
        </motion.video>

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-black/20
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-b
            from-black/10
            via-transparent
            to-black/50
          "
        />
      </motion.div>

      {/* CONTINUOUS TITLE */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-1/2
          z-30
          flex
          -translate-y-1/2
          justify-center
        "
      >
        <motion.h1
          initial={false}
          animate={{
            width: dimensions
              ? introStarted
                ? dimensions.expanded
                : dimensions.compact
              : "max-content",
          }}
          transition={{
            width: {
              duration: reducedMotion ? 0 : EXPAND_DURATION,
              ease,
            },
          }}
          className="
            grid
            grid-cols-[1fr_auto_1fr]
            items-center
            gap-x-2
            whitespace-nowrap
            font-medium
            leading-none
            tracking-[-0.02em]
            text-[clamp(24px,2.9vw,46px)]
            sm:gap-x-3
          "
        >
          <span ref={calmRef} className="justify-self-start">
            Calm
          </span>

          <span ref={byRef} className="justify-self-center ">
            by
          </span>

          <span ref={designRef} className="justify-self-end">
            Design
          </span>
        </motion.h1>
      </div>

      {/* LOADING SPINNER */}
      <motion.div
        initial={false}
        animate={{
          opacity: phase === "loading" ? 1 : 0,
          y: phase === "loading" ? 0 : -10,
        }}
        transition={{
          duration: 0.45,
          ease,
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[calc(50%+65px)]
          z-40
          -translate-x-1/2
        "
        role="status"
        aria-label="Loading Calero Studio"
      >
        <div
          className={`
            h-[23px]
            w-[23px]
            rounded-full
            border-[1.5px]
            border-white/20
            border-t-white
            ${reducedMotion ? "" : "animate-spin"}
          `}
        />
      </motion.div>

      {/* BOTTOM CONTENT */}
      <div
        className="
          absolute
          inset-x-4
          bottom-6
          z-20
          flex
          flex-col
          gap-5
          sm:inset-x-5
          sm:bottom-8
          md:inset-x-8
          md:bottom-10
          md:flex-row
          md:items-end
          md:justify-between
        "
      >
        {/* LEFT — DESCRIPTION */}
        <div
          className="
            max-w-[310px]
            shrink-0
            md:max-w-[225px]
            lg:max-w-[310px]
          "
        >
          {[
            "Thoughtfully designed lighting",
            "for quieter, more considered spaces.",
          ].map((line, index) => (
            <div key={line} className="overflow-hidden">
              <motion.p
                initial={false}
                animate={{
                  y: introStarted ? "0%" : "115%",
                  rotateX: introStarted ? 0 : -12,
                  opacity: introStarted ? 1 : 0.7,
                }}
                transition={{
                  duration: reducedMotion ? 0 : REVEAL_DURATION,
                  delay: getDelay(DESCRIPTION_START + index * 0.12),
                  ease,
                }}
                className="
                  origin-bottom
                  text-[14px]
                  font-medium
                  leading-[1.5]
                  tracking-[-0.02em]
                  md:text-[16px]
                "
              >
                {line}
              </motion.p>
            </div>
          ))}
        </div>

        {/* CENTER — INDEPENDENT POSITION */}
        <div
          className="
            relative
            z-30
            overflow-hidden
            text-[#eeeeec]
            md:absolute
            md:bottom-0
md:left-[67%]            md:-translate-x-1/2
            md:whitespace-nowrap
            md:text-center
          "
        >
          <motion.p
            initial={false}
            animate={{
              y: introStarted ? "0%" : "115%",
              opacity: introStarted ? 1 : 0,
            }}
            transition={{
              duration: reducedMotion ? 0 : REVEAL_DURATION,
              delay: getDelay(CENTER_TEXT_START),
              ease,
            }}
            className="
              text-[14px]
              font-medium
              leading-[1.5]
              tracking-[-0.02em]
              text-[#eeeeec]
              md:text-[16px]
            "
          >
            Light creates atmosphere.
          </motion.p>
        </div>

        {/* RIGHT — EXPLORE */}
        <div
          className="
            relative
            z-30
            flex
            justify-end
            overflow-visible
            md:ml-auto
          "
        >
          <motion.div
            initial={false}
            animate={{
              y: introStarted ? "0%" : "120%",
              opacity: introStarted ? 1 : 0,
            }}
            transition={{
              duration: reducedMotion ? 0 : REVEAL_DURATION,
              delay: getDelay(EXPLORE_START),
              ease,
            }}
          >
            <Link
              href="/shop"
              tabIndex={introFinished ? 0 : -1}
              style={{
                pointerEvents: introFinished ? "auto" : "none",
              }}
              className="
                group
                inline-flex
                items-center
                gap-3
                text-[16px]
                font-medium
                leading-none
                tracking-[-0.02em]
                text-[#eeeeec]
              "
            >
              Collection
              <span
                aria-hidden="true"
                className="
                  inline-block
                  transition-transform
                  duration-500
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              >
                ↗
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
