"use client";

import Image from "next/image";
import gsap from "gsap";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import HeroPreloader from "@/components/HeroPreloader";

const collageImages = [
  "/images/grain-lamp1.jpg",
  "/images/grain-lamp2.jpg",
  "/images/grain-lamp3.jpg",
  "/images/grain-lamp4.jpg",
  "/images/grain-lamp5.jpg",
  "/images/grain-lamp6.jpg",
  "/images/grain-lamp7.jpg",
  "/images/grain-lamp8.jpg",
];

const galleryImages = [
  { id: "01", src: collageImages[0] },
  { id: "02", src: collageImages[1] },
  { id: "03", src: collageImages[2] },
  { id: "04", src: collageImages[3] },
  { id: "05", src: collageImages[4] },
  { id: "06", src: collageImages[5] },
  { id: "07", src: collageImages[6] },
  { id: "08", src: collageImages[7] },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function CaleroHero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const plane1 = useRef<HTMLDivElement | null>(null);
  const plane2 = useRef<HTMLDivElement | null>(null);
  const plane3 = useRef<HTMLDivElement | null>(null);

  const requestRef = useRef<number | null>(null);
  const xForce = useRef(0);
  const yForce = useRef(0);

  const [showPreloader, setShowPreloader] = useState<boolean | null>(null);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const preloaderImages = useMemo(
    () => galleryImages.map((image) => image.src),
    [],
  );

  useEffect(() => {
    const hasSeenPreloader =
      window.sessionStorage.getItem("calero-preloader-seen") === "true";

    if (hasSeenPreloader) {
      setShowPreloader(false);
      setIsHeroReady(true);
      return;
    }

    setShowPreloader(true);
    setIsHeroReady(false);
  }, []);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.8,
  });

  const centerY = useTransform(smoothProgress, [0, 1], [0, 40]);

  function handlePreloaderComplete() {
    window.sessionStorage.setItem("calero-preloader-seen", "true");
    setShowPreloader(false);
    setIsHeroReady(true);
  }

  const lerp = (start: number, target: number, amount: number) =>
    start * (1 - amount) + target * amount;

  const animateGallery = () => {
    xForce.current = lerp(xForce.current, 0, 0.075);
    yForce.current = lerp(yForce.current, 0, 0.075);

    if (plane1.current) {
      gsap.set(plane1.current, {
        x: `+=${xForce.current}`,
        y: `+=${yForce.current}`,
      });
    }

    if (plane2.current) {
      gsap.set(plane2.current, {
        x: `+=${xForce.current * 0.55}`,
        y: `+=${yForce.current * 0.55}`,
      });
    }

    if (plane3.current) {
      gsap.set(plane3.current, {
        x: `+=${xForce.current * 0.28}`,
        y: `+=${yForce.current * 0.28}`,
      });
    }

    if (Math.abs(xForce.current) < 0.01) xForce.current = 0;
    if (Math.abs(yForce.current) < 0.01) yForce.current = 0;

    if (xForce.current !== 0 || yForce.current !== 0) {
      requestRef.current = requestAnimationFrame(animateGallery);
    } else {
      requestRef.current = null;
    }
  };

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    if (!isHeroReady || !isDesktop) return;

    xForce.current += event.movementX * 0.012;
    yForce.current += event.movementY * 0.012;

    xForce.current = Math.max(Math.min(xForce.current, 2.2), -2.2);
    yForce.current = Math.max(Math.min(yForce.current, 2.2), -2.2);

    if (requestRef.current === null) {
      requestRef.current = requestAnimationFrame(animateGallery);
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && (
          <HeroPreloader
            images={preloaderImages}
            onComplete={handlePreloaderComplete}
          />
        )}
      </AnimatePresence>

      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="relative noise-bg min-h-[110vh] overflow-hidden bg-[#ecebeb] text-[#161310]"
      >
        {isHeroReady && (
          <div className="relative min-h-screen">
            <FloatingCenteredGallery
              plane1={plane1}
              plane2={plane2}
              plane3={plane3}
            />

            <motion.div
              style={{ y: centerY }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-30 flex w-[min(94vw,1500px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center mix-blend-difference"
            >
              <RevealLine delay={0.08}>
                <h1 className="text-[18vw] font-black uppercase leading-[1] tracking-[-0.045em] text-[#ecebeb] md:text-[8.5vw]">
                  Calero
                </h1>
              </RevealLine>

              <RevealLine delay={0.18}>
                <h1 className="-mt-[0.01em] text-[15vw] font-black uppercase leading-[1] tracking-[-0.045em] text-[#ecebeb] md:text-[6.8vw]">
                  Studio
                </h1>
              </RevealLine>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease }}
                className="mt-5 max-w-[760px] text-[clamp(1.1rem,2vw,2rem)] font-semibold uppercase leading-[0.96] tracking-[-0.05em] text-[#ecebeb]"
              >
                Soft light for quiet interiors
              </motion.p>
            </motion.div>
          </div>
        )}
      </section>
    </>
  );
}

function FloatingCenteredGallery({
  plane1,
  plane2,
  plane3,
}: {
  plane1: React.RefObject<HTMLDivElement | null>;
  plane2: React.RefObject<HTMLDivElement | null>;
  plane3: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-visible">
      <div ref={plane1} className="absolute inset-0">
        <GalleryImage
          src={galleryImages[0].src}
          label={galleryImages[0].id}
          priority
          className="
            left-[5%] top-[10%] h-[32vh] w-[42vw]
            md:left-[5%] md:top-[10%] md:h-[42vh] md:w-[17vw]
          "
        />

        <GalleryImage
          src={galleryImages[1].src}
          label={galleryImages[1].id}
          priority
          className="
            left-[35%] top-[1%] h-[30vh] w-[34vw]
            md:left-[35%] md:top-[-4%] md:h-[38vh] md:w-[15vw]
          "
        />

        <GalleryImage
          src={galleryImages[2].src}
          label={galleryImages[2].id}
          priority
          className="
            left-[80%] invisible top-[6%] h-[28vh] w-[34vw]
            md:left-[78%] md:top-[8%] md:visible md:h-[38vh] md:w-[13vw]
          "
        />
      </div>

      <div ref={plane2} className="absolute inset-0">
        <GalleryImage
          src={galleryImages[3].src}
          label={galleryImages[3].id}
          className="
            left-[65%] top-[12%] invisible h-[24vh] w-[28vw]
            md:left-[65%] md:top-[3%] md:visible md:h-[31vh] md:w-[10vw]
          "
        />

        <GalleryImage
          src={galleryImages[4].src}
          label={galleryImages[4].id}
          className="
            left-[5%] top-[66%] h-[28vh] w-[44vw]
            md:left-[5%] md:top-[66%] md:h-[48vh] md:w-[20vw]
          "
        />

        <GalleryImage
          src={galleryImages[5].src}
          label={galleryImages[5].id}
          className="
            left-[60%] top-[60%] h-[30vh] w-[34vw]
            md:left-[60%] md:top-[60%] md:h-[48vh] md:w-[15vw]
          "
        />
      </div>

      <div ref={plane3} className="absolute inset-0">
        <GalleryImage
          src={galleryImages[6].src}
          label={galleryImages[6].id}
          className="
            left-[38%] top-[76%] h-[25vh] w-[33vw]
            md:left-[40%] md:top-[75%] md:h-[25vh] md:w-[13vw]
          "
        />

        <GalleryImage
          src={galleryImages[7].src}
          label={galleryImages[7].id}
          className="
            left-[90%] top-[72%] h-[23vh] w-[34vw]
            md:left-[90%] md:top-[71%] md:h-[30vh] md:w-[12vw]
          "
        />
      </div>
    </div>
  );
}

function GalleryImage({
  src,
  label,
  className,
  priority = false,
}: {
  src: string;
  label: string;
  className: string;
  priority?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
      transition={{
        duration: 0.9,
        delay: 0.08 + Number(label) * 0.07,
        ease,
      }}
      className={`absolute ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden border border-[#161310]/10 bg-[#dfddd8]">
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 768px) 44vw, 20vw"
          className="object-cover"
          draggable={false}
        />

        <div className="absolute left-3 top-3 text-[0.62rem] font-black leading-none tracking-[0.16em] text-[#ecebeb] mix-blend-difference">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

function RevealLine({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <div className="-mx-[0.18em] -my-[0.28em] overflow-hidden px-[0.18em] py-[0.28em]">
      <motion.div
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 0.95,
          delay,
          ease,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
