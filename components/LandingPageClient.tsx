"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const heroImages = [
  {
    src: "/images/grain-lamp1.jpg",
    href: "/shop?category=table-lamps",
    alt: "Explore table lamps",
    hoverText: "Table",
  },
  {
    src: "/images/grain-lamp2.jpg",
    href: "/shop?category=pendant-lighting",
    alt: "Explore pendant lighting",
    hoverText: "Pendant",
  },
  {
    src: "/images/grain-lamp9.jpg",
    href: "/shop?category=wall-lights",
    alt: "Explore wall lights",
    hoverText: "Wall",
  },
  {
    src: "/images/grain-lamp10.jpg",
    href: "/shop?category=floor-lamps",
    alt: "Explore floor lamps",
    hoverText: "Floor",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;
const imageEase = [0.76, 0, 0.24, 1] as const;
const letterEase = [0.65, 0, 0.35, 1] as const;

const TITLE_FROM = "STUDIO";
const TITLE_TO = "CALERO";

const TITLE_REVEAL_DELAY = 0.25;
const TITLE_MORPH_DELAY = 1.15;
const TITLE_MORPH_DURATION = 0.9;
const TITLE_STAGGER_WINDOW = 0.26;

const textRevealVariants = {
  hidden: {
    y: 24,
    opacity: 0,
    filter: "blur(8px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease,
    },
  },
};

type HeroLinkElement = HTMLAnchorElement & {
  dataset: {
    heroImage?: string;
    hoverText?: string;
  };
};

export default function CaleroHero() {
  const [hoverText, setHoverText] = useState("");
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const pointerPosition = useRef({
    x: 0,
    y: 0,
  });

  const hasPointerPosition = useRef(false);
  const frameRef = useRef<number | null>(null);

  const cursorX = useSpring(mouseX, {
    stiffness: 220,
    damping: 25,
    mass: 0.35,
  });

  const cursorY = useSpring(mouseY, {
    stiffness: 220,
    damping: 25,
    mass: 0.35,
  });

  const updateHoverAtPointer = useCallback(() => {
    if (!hasPointerPosition.current) {
      setIsHoveringImage(false);
      return;
    }

    const { x, y } = pointerPosition.current;

    if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) {
      setIsHoveringImage(false);
      return;
    }

    const element = document.elementFromPoint(x, y);

    const heroLink =
      element?.closest<HeroLinkElement>("[data-hero-image]") ?? null;

    if (!heroLink) {
      setIsHoveringImage(false);
      return;
    }

    const nextHoverText = heroLink.dataset.hoverText;

    if (!nextHoverText) {
      setIsHoveringImage(false);
      return;
    }

    mouseX.set(x);
    mouseY.set(y);

    setHoverText(nextHoverText);
    setIsHoveringImage(true);
  }, [mouseX, mouseY]);

  const scheduleHoverCheck = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      updateHoverAtPointer();
      frameRef.current = null;
    });
  }, [updateHoverAtPointer]);

  useEffect(() => {
    const updatePointerPosition = (x: number, y: number) => {
      hasPointerPosition.current = true;

      pointerPosition.current = {
        x,
        y,
      };

      mouseX.set(x);
      mouseY.set(y);

      scheduleHoverCheck();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }

      updatePointerPosition(event.clientX, event.clientY);
    };

    const handleMouseMove = (event: globalThis.MouseEvent) => {
      updatePointerPosition(event.clientX, event.clientY);
    };

    const handleWheel = (event: WheelEvent) => {
      updatePointerPosition(event.clientX, event.clientY);
    };

    const handleViewportChange = () => {
      scheduleHoverCheck();
    };

    const handleMouseLeaveWindow = (event: globalThis.MouseEvent) => {
      if (event.relatedTarget === null) {
        setIsHoveringImage(false);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    window.addEventListener("wheel", handleWheel, {
      passive: true,
    });

    window.addEventListener("resize", handleViewportChange, {
      passive: true,
    });

    document.addEventListener("scroll", handleViewportChange, {
      passive: true,
      capture: true,
    });

    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleViewportChange);

      document.removeEventListener("scroll", handleViewportChange, true);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [mouseX, mouseY, scheduleHoverCheck]);

  function handleImageMouseMove(event: ReactMouseEvent<HTMLAnchorElement>) {
    hasPointerPosition.current = true;

    pointerPosition.current = {
      x: event.clientX,
      y: event.clientY,
    };

    mouseX.set(event.clientX);
    mouseY.set(event.clientY);

    const text = event.currentTarget.dataset.hoverText;

    if (text) {
      setHoverText(text);
      setIsHoveringImage(true);
    }
  }

  function handleImageMouseEnter(
    event: ReactMouseEvent<HTMLAnchorElement>,
    text: string,
  ) {
    hasPointerPosition.current = true;

    pointerPosition.current = {
      x: event.clientX,
      y: event.clientY,
    };

    mouseX.set(event.clientX);
    mouseY.set(event.clientY);

    setHoverText(text);
    setIsHoveringImage(true);
  }

  function handleImageMouseLeave() {
    scheduleHoverCheck();
  }

  return (
    <section className="noise-bg relative min-h-screen overflow-x-hidden bg-[#ecebeb] text-[#161310]">
      <motion.div
        aria-hidden="true"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        initial={false}
        animate={{
          opacity: isHoveringImage ? 1 : 0,
          scale: isHoveringImage ? 1 : 0.7,
        }}
        transition={{
          opacity: {
            duration: 0.15,
            ease: "easeOut",
          },
          scale: {
            duration: 0.3,
            ease,
          },
        }}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9999]
          hidden
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          md:flex
        "
      >
        <span
          className="
            whitespace-nowrap
            text-center
            text-[5vw]
            font-black
            uppercase
            leading-none
            tracking-[-0.055em]
            text-white
            mix-blend-difference
          "
        >
          {hoverText}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="
          flex
          min-h-screen
          flex-col
          px-4
          pb-4
          pt-10
          sm:px-5
          sm:pb-5
          md:px-8
          md:pb-8
          md:pt-14
        "
      >
        <div className="flex flex-1 items-center pt-32 sm:pt-32 md:pt-32">
          <div className="w-full">
            <div className="relative flex justify-start">
              <div
                className="
                  overflow-hidden
                  px-[0.08em]
                  pb-[0.14em]
                  pt-[0.12em]
                "
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: TITLE_REVEAL_DELAY,
                    ease,
                  }}
                >
                  <SlotMachineHeading from={TITLE_FROM} to={TITLE_TO} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.62,
            ease,
          }}
          className="mt-2"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren: 0.78,
                  staggerChildren: 0.1,
                },
              },
            }}
            className="
              mb-5
              grid
              grid-cols-1
              gap-x-1
              
              gap-y-5
              pt-4
              md:mb-7
              md:grid-cols-4
              md:gap-x-7
              md:pt-5
            "
          >
            <motion.div variants={textRevealVariants}>
              <p className="text-[0.68rem] hidden md:block font-black uppercase leading-none tracking-[-0.025em] md:text-xs">
                Categories
              </p>
            </motion.div>

            <motion.div variants={textRevealVariants} className="md:col-span-2">
              <p className="max-w-[270px] sm:max-w-[520px] text-[0.9rem] font-semibold uppercase leading-[1.05] tracking-[-0.035em] md:text-sm">
                Soft light for quiet interiors. Selected forms, warm corners and
                calm rooms.
              </p>
            </motion.div>

            <motion.div variants={textRevealVariants} className="text-right">
              <p className="text-[0.68rem] font-black uppercase leading-none tracking-[-0.025em] md:text-xs">
                Calm by design
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
            {heroImages.map((image, index) => (
              <HeroImage
                key={image.href}
                src={image.src}
                href={image.href}
                alt={image.alt}
                hoverText={image.hoverText}
                index={index}
                priority={index < 2}
                onMouseMove={handleImageMouseMove}
                onMouseEnter={handleImageMouseEnter}
                onMouseLeave={handleImageMouseLeave}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SlotMachineHeading({ from, to }: { from: string; to: string }) {
  const fromLetters = Array.from(from);
  const toLetters = Array.from(to);

  const letterCount = Math.max(fromLetters.length, toLetters.length);

  const morphStagger =
    letterCount > 1 ? TITLE_STAGGER_WINDOW / (letterCount - 1) : 0;

  return (
    <div
      className="
        relative
        grid
        w-fit
        overflow-hidden
        px-[0.02em]
        pb-[0.12em]
        pt-[0.1em]
        text-[20.5vw]
        font-black
        uppercase
        leading-[0.82]
        tracking-[-0.035em]
        md:text-[14.5vw]
      "
    >
      <span
        aria-hidden="true"
        className="
          invisible
          col-start-1
          row-start-1
          whitespace-nowrap
        "
      >
        {from}
      </span>

      <span
        aria-hidden="true"
        className="
          invisible
          col-start-1
          row-start-1
          whitespace-nowrap
        "
      >
        {to}
      </span>

      <h1
        aria-label={to}
        className="
          pointer-events-none
          absolute
          inset-0
          m-0
        "
      >
        {/* STUDIO */}
        <span
          aria-hidden="true"
          className="
            absolute
            left-[0.02em]
            top-[0.1em]
            inline-flex
            whitespace-nowrap
            leading-[0.82]
            tracking-[-0.035em]
          "
        >
          {fromLetters.map((letter, index) => {
            const movesUp = index % 2 === 0;
            const exitY = movesUp ? "-140%" : "140%";
            const delay = TITLE_MORPH_DELAY + index * morphStagger;

            return (
              <motion.span
                key={`from-${letter}-${index}`}
                initial={{ y: "0%" }}
                animate={{ y: exitY }}
                transition={{
                  duration: TITLE_MORPH_DURATION,
                  delay,
                  ease: letterEase,
                }}
                className="
                  inline-block
                  shrink-0
                  will-change-transform
                "
              >
                {displayLetter(letter)}
              </motion.span>
            );
          })}
        </span>

        {/* CALERO */}
        <span
          aria-hidden="true"
          className="
            absolute
            left-[0.02em]
            top-[0.1em]
            inline-flex
            whitespace-nowrap
            leading-[0.82]
            tracking-[-0.035em]
          "
        >
          {toLetters.map((letter, index) => {
            const movesUp = index % 2 === 0;
            const startY = movesUp ? "140%" : "-140%";
            const delay = TITLE_MORPH_DELAY + index * morphStagger;

            return (
              <motion.span
                key={`to-${letter}-${index}`}
                initial={{ y: startY }}
                animate={{ y: "0%" }}
                transition={{
                  duration: TITLE_MORPH_DURATION,
                  delay,
                  ease: letterEase,
                }}
                className="
                  inline-block
                  shrink-0
                  will-change-transform
                "
              >
                {displayLetter(letter)}
              </motion.span>
            );
          })}
        </span>
      </h1>
    </div>
  );
}

function displayLetter(letter: string) {
  return letter === " " ? "\u00A0" : letter;
}

function HeroImage({
  src,
  href,
  alt,
  hoverText,
  index,
  priority = false,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
}: {
  src: string;
  href: string;
  alt: string;
  hoverText: string;
  index: number;
  priority?: boolean;
  onMouseMove: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
  onMouseEnter: (
    event: ReactMouseEvent<HTMLAnchorElement>,
    text: string,
  ) => void;
  onMouseLeave: () => void;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.94,
        rotate: index % 2 === 0 ? -2 : 2,
        filter: "blur(12px)",
        clipPath: "inset(100% 0 0 0)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        filter: "blur(0px)",
        clipPath: "inset(0% 0 0 0)",
      }}
      transition={{
        duration: 1.25,
        delay: 0.82 + index * 0.12,
        ease: imageEase,
      }}
      className="origin-bottom"
    >
      <Link
        href={href}
        aria-label={alt}
        data-hero-image="true"
        data-hover-text={hoverText}
        onMouseMove={onMouseMove}
        onMouseEnter={(event) => onMouseEnter(event, hoverText)}
        onMouseLeave={onMouseLeave}
        className="
          group
          relative
          block
          aspect-[3/4]
          w-full
          cursor-pointer
          overflow-hidden
          border
          border-[#161310]/10
          bg-[#dfddd8]
          md:aspect-[4/5]
          md:cursor-none
        "
      >
        <motion.div
          initial={{ scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.6,
            delay: 0.82 + index * 0.12,
            ease: imageEase,
          }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 767px) 50vw, 25vw"
            className="
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.04]
            "
            draggable={false}
          />
        </motion.div>

        <motion.div
          initial={{ x: "-105%" }}
          animate={{ x: "105%" }}
          transition={{
            duration: 1.15,
            delay: 1 + index * 0.12,
            ease: imageEase,
          }}
          className="
            pointer-events-none
            absolute
            inset-y-0
            z-20
            w-1/2
            bg-gradient-to-r
            from-transparent
            via-white/30
            to-transparent
            blur-xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            bg-black/0
            transition-colors
            duration-500
            group-hover:bg-black/10
          "
        />

        <motion.span
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 1.35 + index * 0.12,
            ease,
          }}
          className="
            absolute
            left-3
            top-3
            z-30
            text-[0.62rem]
            font-black
            leading-none
            tracking-[0.16em]
            text-white
          "
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        <motion.span
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 1.4 + index * 0.12,
            ease,
          }}
          className="
            pointer-events-none
            absolute
            bottom-3
            left-3
            z-30
            text-[0.7rem]
            font-black
            uppercase
            leading-none
            tracking-[0.12em]
            text-white
            md:hidden
          "
        >
          {hoverText}
        </motion.span>
      </Link>
    </motion.div>
  );
}
