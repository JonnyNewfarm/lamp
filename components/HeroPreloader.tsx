"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type HeroPreloaderProps = {
  images: string[];
  onComplete: () => void;
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroPreloader({
  images,
  onComplete,
}: HeroPreloaderProps) {
  const [imagesReady, setImagesReady] = useState(false);
  const [imagesOut, setImagesOut] = useState(false);
  const [slideUp, setSlideUp] = useState(false);
  const [progress, setProgress] = useState(0);

  const preloaderImages = useMemo(() => {
    return images.filter(Boolean).slice(0, 8);
  }, [images]);

  useEffect(() => {
    let mounted = true;

    async function preloadImages() {
      if (preloaderImages.length === 0) {
        if (mounted) setImagesReady(true);
        return;
      }

      await Promise.all(
        preloaderImages.map((src) => {
          return new Promise<void>((resolve) => {
            const img = new window.Image();

            img.onload = () => resolve();
            img.onerror = () => {
              console.error("Preloader image failed:", src);
              resolve();
            };

            img.src = src;
          });
        }),
      );

      if (mounted) {
        setImagesReady(true);
      }
    }

    preloadImages();

    return () => {
      mounted = false;
    };
  }, [preloaderImages]);

  useEffect(() => {
    if (!imagesReady) return;

    const duration = 3150;
    let frameId = 0;
    let startTime: number | null = null;

    function tick(timestamp: number) {
      if (startTime === null) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
      const nextProgress = Math.round(easedProgress * 100);

      setProgress(nextProgress);

      if (rawProgress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    }

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [imagesReady]);

  useEffect(() => {
    if (!imagesReady) return;

    const outTimer = window.setTimeout(() => {
      setImagesOut(true);
    }, 1900);

    const slideTimer = window.setTimeout(() => {
      setSlideUp(true);
    }, 3150);

    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, 4100);

    return () => {
      window.clearTimeout(outTimer);
      window.clearTimeout(slideTimer);
      window.clearTimeout(completeTimer);
    };
  }, [imagesReady, onComplete]);

  return (
    <motion.div
      initial={{ y: "0%" }}
      animate={{ y: slideUp ? "-100%" : "0%" }}
      exit={{ y: "-100%" }}
      transition={{
        duration: 0.9,
        ease,
      }}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#ecebeb] text-[#161310]"
    >
      <div className="absolute left-5 top-5 z-50 text-[0.65rem] font-black uppercase tracking-[0.18em] md:left-8 md:top-8">
        Loading
      </div>

      <div className="absolute right-5 top-5 z-50 text-[0.75rem] font-black uppercase tabular-nums tracking-[0.18em] md:right-8 md:top-8">
        {String(progress).padStart(3, "0")}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{
          opacity: imagesReady ? 1 : 0,
          y: imagesReady ? 0 : 24,
        }}
        transition={{
          duration: 0.75,
          delay: 0.15,
          ease,
        }}
        className="absolute bottom-5 left-5 z-20 text-[16vw] font-black uppercase leading-[0.78] tracking-[-0.08em] text-[#161310] md:bottom-8 md:left-8 md:text-[8vw]"
      >
        Calero
      </motion.h1>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[220px] w-[160px] md:h-[290px] md:w-[210px]">
          {imagesReady &&
            preloaderImages.map((src, index) => {
              const total = preloaderImages.length;
              const middle = (total - 1) / 2;
              const offset = index - middle;

              const stackX = offset * 2.2;
              const stackY = offset * 2.8;

              const enterDelay = index * 0.13;
              const exitDelay = (total - 1 - index) * 0.09;

              return (
                <motion.div
                  key={`${src}-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: stackX,
                    y: stackY + 28,
                  }}
                  animate={
                    imagesOut
                      ? {
                          opacity: 0,
                          scale: 0,
                          x: stackX,
                          y: stackY - 28,
                        }
                      : {
                          opacity: 1,
                          scale: 1,
                          x: stackX,
                          y: stackY,
                        }
                  }
                  transition={{
                    duration: imagesOut ? 0.45 : 0.55,
                    delay: imagesOut ? exitDelay : enterDelay,
                    ease,
                  }}
                  className="absolute inset-0 overflow-hidden border border-[#161310]/10 bg-[#dfddd8]"
                  style={{
                    zIndex: index + 1,
                  }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${src}")`,
                    }}
                  />
                </motion.div>
              );
            })}
        </div>
      </div>
    </motion.div>
  );
}
