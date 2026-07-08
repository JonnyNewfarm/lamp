"use client";

import HeroPreloader from "@/components/HeroPreloader";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

const collageImages = [
  "/images/grain-lamp1.jpg",
  "/images/grain-lamp2.jpg",
  "/images/grain-lamp9.jpg",
  "/images/grain-lamp10.jpg",
];

const heroImages = [
  {
    src: collageImages[0],
    href: "/shop?category=table-lamps",
    alt: "Explore table lamps",
    hoverText: "Table",
  },
  {
    src: collageImages[1],
    href: "/shop?category=pendant-lighting",
    alt: "Explore pendant lighting",
    hoverText: "Pendant",
  },
  {
    src: collageImages[2],
    href: "/shop?category=wall-lights",
    alt: "Explore wall lights",
    hoverText: "Wall",
  },
  {
    src: collageImages[3],
    href: "/shop?category=ceiling-lights",
    alt: "Explore ceiling lights",
    hoverText: "Ceiling",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function CaleroHero() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isHeroReady, setIsHeroReady] = useState(false);

  const [hoverText, setHoverText] = useState("");
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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

  const preloaderImages = useMemo(() => collageImages, []);

  useEffect(() => {
    const hasSeenPreloader =
      window.sessionStorage.getItem("calero-preloader-seen") === "true";

    if (hasSeenPreloader) {
      setShowPreloader(false);
      setIsHeroReady(true);
    }
  }, []);

  function handlePreloaderComplete() {
    window.sessionStorage.setItem("calero-preloader-seen", "true");
    setShowPreloader(false);
    setIsHeroReady(true);
  }

  function handleImageMouseMove(event: ReactMouseEvent<HTMLAnchorElement>) {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  }

  function handleImageMouseEnter(
    event: ReactMouseEvent<HTMLAnchorElement>,
    text: string,
  ) {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);

    setHoverText(text);
    setIsHoveringImage(true);
  }

  function handleImageMouseLeave() {
    setIsHoveringImage(false);
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

      <section className="noise-bg relative min-h-screen overflow-hidden bg-[#ecebeb] text-[#161310]">
        <motion.div
          aria-hidden="true"
          style={{
            x: cursorX,
            y: cursorY,
          }}
          initial={false}
          animate={{
            opacity: isHoveringImage ? 1 : 0,
            scale: isHoveringImage ? 1 : 0.5,
          }}
          transition={{
            opacity: {
              duration: 0.18,
              ease: "easeOut",
            },
            scale: {
              duration: 0.35,
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
              leading-[0.8]
              tracking-[-0.055em]
              text-white
              mix-blend-difference
            "
          >
            {hoverText}
          </span>
        </motion.div>

        {isHeroReady && (
          <div className="flex min-h-screen flex-col px-4 pb-4 pt-10 sm:px-5 sm:pb-5 md:px-8 md:pb-8 md:pt-14">
            <div className="flex flex-1 items-center pt-28 sm:pt-32 md:pt-28 lg:pt-36">
              <div className="w-full">
                <div className="overflow-hidden flex justify-center">
                  <motion.h1
                    initial={{ y: "115%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 1.1,
                      delay: 0.05,
                      ease,
                    }}
                    className="
                      whitespace-nowrap
                      text-center
                      text-[22vw]
                      font-black
                      uppercase
                      leading-[0.76]
                      tracking-[-0.055em]
                      md:text-[20.5vw]
                    "
                  >
                    Calero
                  </motion.h1>
                  <motion.h1
                    initial={{ y: "115%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 1.1,
                      delay: 0.05,
                      ease,
                    }}
                    className="
                      whitespace-nowrap
                      text-left
                      text-[2vw]
                      font-black
                      uppercase
                      leading-[0.76]
                      tracking-[-0.055em]
                      md:text-[2.5vw]
                    "
                  >
                    Studio
                  </motion.h1>
                </div>
              </div>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.45,
                ease,
              }}
              className="mt-10 border-t border-[#161310] pt-4 md:mt-14 md:pt-5"
            >
              <div className="mb-5 grid grid-cols-2 gap-x-4 gap-y-5 md:mb-7 md:grid-cols-4 md:gap-x-7">
                <div>
                  <p className="text-[0.68rem] font-black uppercase leading-none tracking-[-0.025em] md:text-xs">
                    Calero
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="max-w-[520px] text-[0.68rem] font-semibold uppercase leading-[1.05] tracking-[-0.035em] md:text-sm">
                    Soft light for quiet interiors. Selected forms, warm corners
                    and calm rooms.
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[0.68rem] font-black uppercase leading-none tracking-[-0.025em] md:text-xs">
                    Calm by design
                  </p>
                </div>
              </div>

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
          </div>
        )}
      </section>
    </>
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
        y: 40,
        clipPath: "inset(0 0 100% 0)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
      }}
      transition={{
        duration: 0.95,
        delay: 0.55 + index * 0.1,
        ease,
      }}
    >
      <Link
        href={href}
        aria-label={alt}
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
            group-hover:scale-[1.025]
          "
          draggable={false}
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-black/0
            transition-colors
            duration-500
            group-hover:bg-black/5
          "
        />

        <span
          className="
            absolute
            left-3
            top-3
            z-10
            text-[0.62rem]
            font-black
            leading-none
            tracking-[0.16em]
            text-white
            mix-blend-difference
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className="
            pointer-events-none
            absolute
            bottom-3
            left-3
            z-10
            text-[0.65rem]
            font-black
            uppercase
            leading-none
            tracking-[0.12em]
            text-white
            mix-blend-difference
            md:hidden
          "
        >
          {hoverText}
        </span>
      </Link>
    </motion.div>
  );
}
