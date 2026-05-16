"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const heroImages = {
  smallTop: {
    light: "/images/lamp-1.jpg",
  },
  smallBottom: {
    light: "/images/lamp-2.jpg",
  },
  large: {
    light: "/images/lamp-3.jpg",
  },
};

const collageImages = [
  "/images/lamp-1.jpg",
  "/images/lamp-2.jpg",
  "/images/lamp-3.jpg",
  "/images/lamp-4.jpg",
  "/images/lamp-5.jpg",
  "/images/lamp-6.jpg",
  "/images/lamp-7.jpg",
];

const ease = [0.16, 1, 0.3, 1] as const;

type CollageImage = {
  id: number;
  src: string;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  width: number;
  height: number;
  rotate: number;
  zIndex: number;
};

export default function CaleroHero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const lastMouse = useRef({ x: 0, y: 0 });
  const lastSpawnTime = useRef(0);
  const imageIndex = useRef(0);
  const zIndex = useRef(30);

  const [isDesktop, setIsDesktop] = useState(false);
  const [collage, setCollage] = useState<CollageImage[]>([]);

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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 32,
    mass: 0.7,
  });

  const titleY = useTransform(smoothProgress, [0, 1], [0, 34]);
  const centerTextY = useTransform(smoothProgress, [0, 1], [0, -28]);
  const bottomTextY = useTransform(smoothProgress, [0, 1], [0, 48]);

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    if (!isDesktop) return;

    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();

    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;

    const now = Date.now();
    const deltaTime = now - lastSpawnTime.current;

    const velocityX = localX - lastMouse.current.x;
    const velocityY = localY - lastMouse.current.y;
    const distance = Math.hypot(velocityX, velocityY);

    lastMouse.current = {
      x: localX,
      y: localY,
    };

    if (deltaTime < 115 || distance < 20) return;

    lastSpawnTime.current = now;

    const src = collageImages[imageIndex.current % collageImages.length];

    imageIndex.current += 1;
    zIndex.current += 1;

    const id = now + Math.random();

    const width = 140 + Math.random() * 58;
    const height = width * (1 + Math.random() * 0.12);

    const newImage: CollageImage = {
      id,
      src,
      x: localX,
      y: localY,
      velocityX,
      velocityY,
      width,
      height,
      rotate: -3.5 + Math.random() * 7,
      zIndex: zIndex.current,
    };

    setCollage((prev) => [...prev.slice(-11), newImage]);

    window.setTimeout(() => {
      setCollage((prev) => prev.filter((image) => image.id !== id));
    }, 3200);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#ecebeb] text-[#161310]"
    >
      <MouseCollage images={collage} />

      <div className="relative z-30 flex min-h-screen flex-col px-6 pb-8 pt-24 md:px-10 md:pb-10 md:pt-24">
        <motion.div style={{ y: titleY }} className="relative z-30 w-fit">
          <h1 className="font-black uppercase leading-[0.78] tracking-[-0.09em] md:leading-[0.74] md:tracking-[-0.105em]">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease }}
              className="mb-2 text-right text-[clamp(0.7rem,1vw,1rem)] font-black uppercase leading-none tracking-[-0.035em] text-[#161310]"
            >
              MADE FOR LIGHT. BUILT FOR CALM.
            </motion.p>

            <HoverSlideWord
              text="Calero"
              delay={0.1}
              className="text-[16vw] md:text-[8.6vw]"
            />

            <HoverSlideWord
              text="Studio"
              delay={0.22}
              className="text-[14vw] md:text-[7.4vw]"
            />
          </h1>
        </motion.div>

        <motion.div
          style={{ y: centerTextY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          className="relative z-20 mt-[11vh] max-w-[48rem] md:ml-[38vw] md:mt-[6vh]"
        >
          <p className="text-[clamp(2.35rem,5.6vw,7.6rem)] font-black uppercase leading-[0.82] tracking-[-0.09em] text-[#161310]">
            Soft light for quiet interiors.
          </p>
        </motion.div>

        <div className="relative z-40 mt-auto grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
          <motion.div
            style={{ y: bottomTextY }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="md:col-span-4"
          >
            <p className="max-w-sm text-base leading-[1.7] text-[#161310]/60 md:text-lg">
              Minimal lighting selected for soft contrast, quiet atmosphere and
              everyday calm.
            </p>

            <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-8">
              <Link
                href="/shop"
                className="group relative inline-flex h-[56px] overflow-hidden border-2 border-[#161310] px-7 text-sm font-semibold text-[#161310] transition hover:bg-[#161310] hover:text-[#ecebeb]"
              >
                <span className="flex h-full items-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                  Shop collection
                </span>

                <span className="absolute left-10 top-0 flex h-full translate-y-full items-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                  Enter shop
                </span>
              </Link>

              <Link
                href="#new-products"
                className="group flex items-center gap-4 text-sm"
              >
                <span className="relative overflow-hidden">
                  <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                    New products
                  </span>

                  <span className="absolute left-0 top-full block transition-transform duration-500 group-hover:-translate-y-full">
                    Explore now
                  </span>
                </span>

                <span className="h-px w-12 bg-[#161310] transition-all duration-500 group-hover:w-20" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            style={{ y: bottomTextY }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease }}
            className="md:col-span-4 md:col-start-9"
          >
            <p className="ml-auto max-w-[28rem] text-right text-lg uppercase leading-tight tracking-[-0.04em] text-[#161310] md:text-2xl">
              Lighting, objects and interior atmosphere.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MouseCollage({ images }: { images: CollageImage[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden md:block">
      <AnimatePresence initial={false}>
        {images.map((image) => (
          <CollageItem key={image.id} image={image} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function CollageItem({ image }: { image: CollageImage }) {
  const moveX = image.velocityX * 0.68;
  const moveY = image.velocityY * 0.68;

  const startX = image.x - image.width / 2;
  const startY = image.y - image.height / 2;

  return (
    <motion.div
      initial={{
        x: startX,
        y: startY,
        rotate: image.rotate,
      }}
      animate={{
        x: startX + moveX,
        y: startY + moveY,
        rotate: image.rotate + (image.velocityX > 0 ? 1.6 : -1.6),
      }}
      exit={{
        x: startX + moveX * 1.04,
        y: startY + moveY * 1.04,
        rotate: image.rotate + (image.velocityX > 0 ? 2.5 : -2.5),
      }}
      transition={{
        type: "spring",
        stiffness: 92,
        damping: 24,
        mass: 0.7,
      }}
      className="absolute transform-gpu"
      style={{
        width: image.width,
        height: image.height,
        zIndex: image.zIndex,
        willChange: "transform",
      }}
    >
      <motion.div
        initial={{
          scale: 0.001,
        }}
        animate={{
          scale: 1,
        }}
        exit={{
          scale: [1, 1.045, 0.96, 0.001],
        }}
        transition={{
          scale: {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            times: [0, 0.28, 0.5, 1],
          },
        }}
        className="relative h-full w-full origin-center transform-gpu overflow-hidden bg-[#161310]"
        style={{
          willChange: "transform",
        }}
      >
        <Image
          src={image.src}
          alt=""
          fill
          sizes="220px"
          className="object-cover"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

function HoverSlideWord({
  text,
  delay,
  className = "",
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <span
      className={`block overflow-hidden py-[0.08em] whitespace-nowrap ${className}`}
    >
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 1,
          delay,
          ease,
        }}
        className="inline-flex"
      >
        {text.split("").map((letter, index) => (
          <HoverSlideLetter
            key={`${letter}-${index}`}
            letter={letter}
            index={index}
          />
        ))}
      </motion.span>
    </span>
  );
}

function HoverSlideLetter({
  letter,
  index,
}: {
  letter: string;
  index: number;
}) {
  const controls = useAnimationControls();
  const isAnimating = useRef(false);

  async function handleMouseEnter() {
    if (isAnimating.current) return;

    isAnimating.current = true;

    await controls.start({
      x: "-50%",
      transition: {
        duration: 0.75,
        delay: index * 0.01,
        ease,
      },
    });

    controls.set({
      x: "0%",
    });

    isAnimating.current = false;
  }

  return (
    <span
      onMouseEnter={handleMouseEnter}
      className="relative inline-block overflow-hidden"
      style={{
        lineHeight: "0.78em",
      }}
    >
      <span className="invisible inline-block">{letter}</span>

      <motion.span
        initial={{ x: "0%" }}
        animate={controls}
        className="absolute left-0 top-0 inline-flex"
      >
        <span className="inline-block">{letter}</span>
        <span className="inline-block">{letter}</span>
      </motion.span>
    </span>
  );
}
