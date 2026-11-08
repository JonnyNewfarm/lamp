"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const heroImages = [
  {
    src: "/images/lamp-grain-1.jpg",
    href: "/shop?category=table-lamps",
    alt: "Explore table lamps",
    title: "Table Lamps",
    hoverText: "Table",
  },
  {
    src: "/images/pend-1.jpg",
    href: "/shop?category=pendant-lighting",
    alt: "Explore pendant lighting",
    title: "Pendant Lighting",
    hoverText: "Pendant",
  },
  {
    src: "/images/wall-2.jpg",
    href: "/shop?category=wall-lights",
    alt: "Explore wall lights",
    title: "Wall Lights",
    hoverText: "Wall",
  },
  {
    src: "/images/floor-2.jpg",
    href: "/shop?category=floor-lamps",
    alt: "Explore floor lamps",
    title: "Floor Lamps",
    hoverText: "Floor",
  },
];

type HeroImageData = (typeof heroImages)[number];

const ease = [0.16, 1, 0.3, 1] as const;

// SCROLL DRIFT
const IMAGE_DRIFT = 12;
const CARD_DRIFT = 3;

// ENTRANCE ANIMATION
const REVEAL_Y = 70;
const REVEAL_SCALE = 0.97;
const REVEAL_DURATION = 1.65;
const REVEAL_STAGGER = 0.16;

export default function CaleroHero() {
  return (
    <section className="noise-bg relative min-h-screen overflow-x-clip bg-[#eeeeec] text-[#1a1817]">
      <div
        className="
          w-full
          px-4
          pb-20
          pt-32
          sm:px-5
          md:px-8
          md:pb-32
          md:pt-32
        "
      >
        <div
          className="
            grid
            grid-cols-1
            gap-y-12
            md:grid-cols-[39%_51%]
            md:items-start
            md:justify-between
          "
        >
          {/* LEFT COLUMN */}
          <div className="contents md:flex md:flex-col">
            {/* IMAGE 01 */}
            <div className="order-1 w-full">
              <HeroImage
                image={heroImages[0]}
                aspect="aspect-square"
                index={0}
                priority
              />
            </div>

            {/* IMAGE 03 */}
            <div
              className="
                order-3
                w-[88%]
                self-end
                md:ml-[35%]
                md:mt-[clamp(50px,6vw,105px)]
                md:w-[75%]
              "
            >
              <HeroImage
                image={heroImages[2]}
                aspect="aspect-[9/10]"
                index={2}
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="contents md:flex md:flex-col">
            {/* IMAGE 02 */}
            <div className="order-2 w-full">
              <HeroImage
                image={heroImages[1]}
                aspect="aspect-[4/5]"
                index={1}
                priority
              />
            </div>

            {/* IMAGE 04 */}
            <div
              className="
                order-4
                w-[88%]
                md:ml-[12%]
                md:mt-[clamp(45px,5vw,90px)]
                md:w-[78%]
              "
            >
              <HeroImage
                image={heroImages[3]}
                aspect="aspect-[5/4]"
                index={3}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroImage({
  image,
  aspect,
  index,
  priority = false,
}: {
  image: HeroImageData;
  aspect: string;
  index: number;
  priority?: boolean;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isInView = useInView(frameRef, {
    once: true,
    amount: 0.15,
  });

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });

  // IMAGE DRIFT
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [IMAGE_DRIFT, -IMAGE_DRIFT],
  );

  // CARD DRIFT
  const cardY = useTransform(
    scrollYProgress,
    [0, 1],
    [-CARD_DRIFT, CARD_DRIFT],
  );

  const smoothImageY = useSpring(imageY, {
    stiffness: 80,
    damping: 28,
    mass: 0.7,
  });

  const smoothCardY = useSpring(cardY, {
    stiffness: 80,
    damping: 28,
    mass: 0.7,
  });

  const showImage = imageLoaded && isInView;

  const revealDelay = index < 2 ? index * REVEAL_STAGGER : 0;

  return (
    <motion.article style={{ y: smoothCardY }} className="w-full min-w-0">
      {/* FADE + MOVEMENT + SCALE */}
      <motion.div
        initial={{
          opacity: 0,
          y: REVEAL_Y,
          scale: REVEAL_SCALE,
        }}
        animate={{
          opacity: showImage ? 1 : 0,
          y: showImage ? 0 : REVEAL_Y,
          scale: showImage ? 1 : REVEAL_SCALE,
        }}
        transition={{
          opacity: {
            duration: 1.3,
            delay: revealDelay,
            ease: [0.22, 1, 0.36, 1],
          },
          y: {
            duration: REVEAL_DURATION,
            delay: revealDelay,
            ease,
          },
          scale: {
            duration: 1.8,
            delay: revealDelay,
            ease,
          },
        }}
        className="w-full"
      >
        <Link
          href={image.href}
          aria-label={image.alt}
          data-calero-cursor={image.hoverText}
          className="group block w-full cursor-pointer"
        >
          <div
            ref={frameRef}
            className={`
              relative
              w-full
              overflow-hidden
              bg-[#dfddd8]
              ${aspect}
            `}
          >
            {/* DRIFTING IMAGE */}
            <motion.div
              style={{ y: smoothImageY }}
              className="
                absolute
                -inset-[12%]
                will-change-transform
              "
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={priority}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 767px) 100vw, 55vw"
                className="
                  object-cover
                  transition-transform
                  duration-[1000ms]
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  group-hover:scale-[1.045]
                "
                draggable={false}
              />
            </motion.div>

            {/* HOVER DARKEN */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-black/0
                transition-colors
                duration-700
                group-hover:bg-black/10
              "
            />
          </div>

          {/* CATEGORY NAME */}
          <div
            className="
              mt-3
              flex
              items-center
              justify-end
              text-[11px]
              font-medium
              md:mt-4
              md:text-[12px]
            "
          >
            <span>{image.title}</span>
          </div>
        </Link>
      </motion.div>
    </motion.article>
  );
}
