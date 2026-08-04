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

const titleRevealVariants = {
  hidden: {
    y: "115%",
    rotate: 2,
    skewY: 3,
  },
  visible: {
    y: "0%",
    rotate: 0,
    skewY: 0,
    transition: {
      duration: 1.25,
      delay: 0.08,
      ease: imageEase,
    },
  },
};

const labelContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.42,
      staggerChildren: 0.1,
    },
  },
};

const labelRevealVariants = {
  hidden: {
    y: "125%",
    rotate: 2,
  },
  visible: {
    y: "0%",
    rotate: 0,
    transition: {
      duration: 0.85,
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
    <section
      className="
        noise-bg
        relative
        min-h-screen
        overflow-x-hidden
        bg-[#eeeeec]
        text-[#1a1817]
      "
    >
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
            font-bold
font-merchant            leading-none
            tracking-[-0.01em]
            text-white
            mix-blend-difference
          "
        >
          {hoverText}
        </span>
      </motion.div>

      <div
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
            <div
              className="
                relative
                mt-16
                flex
                w-full
                items-end
                justify-between
              "
            >
              <div
                className="
                  overflow-hidden
                  px-[0.08em]
                  pb-[0.14em]
                  pt-[0.12em]
                "
              >
                <motion.h1
                  variants={titleRevealVariants}
                  initial="hidden"
                  animate="visible"
                  className="
                    origin-bottom-left
                    whitespace-nowrap
                    font-merchant
                    text-[13vw]
                    font-normal
                    leading-[0.9]
                    tracking-[-0.04em]
                    md:text-[11.5vw]
                  "
                >
                  Calero Studio
                </motion.h1>
              </div>

              <motion.div
                variants={labelContainerVariants}
                initial="hidden"
                animate="visible"
                className="
                  mb-[0.8vw]
                  hidden
                  shrink-0
                  items-center
                  sm:flex
                "
              >
                <div className="overflow-hidden pb-[0.08em]">
                  <motion.p
                    variants={labelRevealVariants}
                    className="
                      origin-bottom-left
                      whitespace-nowrap
                      text-[11px]
                      font-semibold
                      uppercase
                    "
                  >
                    Categories
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-2 w-full">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
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
              className="
                grid
                grid-cols-2
                gap-2.5
                md:grid-cols-4
                md:gap-4
              "
            >
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
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
        delay: 0.2 + index * 0.12,
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
          border-[#1a1817]/10
          bg-[#dfddd8]
          md:aspect-[4/5]
          md:cursor-none
        "
      >
        <motion.div
          initial={{
            scale: 1.18,
          }}
          animate={{
            scale: 1,
          }}
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
