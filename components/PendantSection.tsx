"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const PRODUCT_URL =
  "/products/vintage-ceramic-pendant-light-hand-painted-copper-hanging-lamp";

const slides = [
  {
    src: "/ceramic-03.jpg",
    alt: "Red hand-painted ceramic pendant light",
  },
  {
    src: "/ceramic-04.jpg",
    alt: "Blue hand-painted ceramic pendant light",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;
const sliderEase = [0.76, 0, 0.24, 1] as const;

const SLIDE_INTERVAL = 3200;
const SLIDE_DURATION = 1;

type ProductLinkElement = HTMLAnchorElement & {
  dataset: {
    pendantLink?: string;
  };
};

type SliderProps = {
  sliderY: MotionValue<string>;
};

function PendantSlider({ sliderY }: SliderProps) {
  const [position, setPosition] = useState(0);
  const [instantReset, setInstantReset] = useState(false);

  const loopedSlides = useMemo(() => {
    return [...slides, slides[0]];
  }, []);

  const activeIndex = position % slides.length;

  const trackWidth = loopedSlides.length * 100;
  const slideWidth = 100 / loopedSlides.length;
  const trackX = -(position * slideWidth);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setInstantReset(false);
      setPosition((currentPosition) => currentPosition + 1);
    }, SLIDE_INTERVAL);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const handleAnimationComplete = () => {
    if (position !== slides.length) {
      return;
    }

    setInstantReset(true);
    setPosition(0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setInstantReset(false);
      });
    });
  };

  return (
    <motion.div
      style={{ y: sliderY }}
      className="
        pointer-events-none
        absolute
        bottom-5
        right-5
        z-20
        w-[28vw]
        min-w-[112px]
        max-w-[150px]
        will-change-transform
        md:bottom-10
        md:right-10
        md:w-[14vw]
        md:max-w-[190px]
        lg:bottom-14
        lg:right-14
        lg:max-w-[210px]
      "
    >
      <div
        className="
          relative
          aspect-[4.3/4.8]
          w-[98%]
          overflow-hidden
          bg-transparent
        "
      >
        <motion.div
          animate={{
            x: `${trackX}%`,
          }}
          transition={
            instantReset
              ? {
                  duration: 0,
                }
              : {
                  duration: SLIDE_DURATION,
                  ease: sliderEase,
                }
          }
          onAnimationComplete={handleAnimationComplete}
          style={{
            width: `${trackWidth}%`,
          }}
          className="
            absolute
            inset-y-0
            left-0
            flex
            transform-gpu
            will-change-transform
          "
        >
          {loopedSlides.map((slide, index) => (
            <div
              key={`${slide.src}-${index}`}
              style={{
                width: `${slideWidth}%`,
              }}
              className="
                relative
                h-full
                shrink-0
                overflow-hidden
              "
            >
              <Image
                src={slide.src}
                alt={index === loopedSlides.length - 1 ? "" : slide.alt}
                fill
                priority
                sizes="
                  (max-width: 767px) 28vw,
                  (max-width: 1279px) 14vw,
                  210px
                "
                className="
                  pointer-events-none
                  scale-[1.005]
                  select-none
                  object-cover
                  object-center
                "
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div
        className="
          mt-3
          flex
          items-center
          justify-end
          font-montserrat
          text-[8px]
          font-medium
          uppercase
          tracking-[0.15em]
          text-white
          md:text-[9px]
        "
      >
        <span>
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
}

export default function PendantImageSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const [isHoveringSection, setIsHoveringSection] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const pointerPosition = useRef({
    x: 0,
    y: 0,
  });

  const hasPointerPosition = useRef(false);

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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  const textY = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);

  const sliderY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  const updateHoverAtPointer = useCallback(() => {
    if (!hasPointerPosition.current) {
      setIsHoveringSection(false);
      return;
    }

    const { x, y } = pointerPosition.current;

    const isOutsideViewport =
      x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight;

    if (isOutsideViewport) {
      setIsHoveringSection(false);
      return;
    }

    const element = document.elementFromPoint(x, y);

    const productLink =
      element?.closest<ProductLinkElement>("[data-pendant-link]") ?? null;

    setIsHoveringSection(Boolean(productLink));
  }, []);

  const scheduleHoverCheck = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      updateHoverAtPointer();
      frameRef.current = null;
    });
  }, [updateHoverAtPointer]);

  const updatePointerPosition = useCallback(
    (x: number, y: number) => {
      hasPointerPosition.current = true;

      pointerPosition.current = {
        x,
        y,
      };

      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }

      updatePointerPosition(event.clientX, event.clientY);
      scheduleHoverCheck();
    };

    const handleWheel = (event: WheelEvent) => {
      updatePointerPosition(event.clientX, event.clientY);
      scheduleHoverCheck();
    };

    const handleViewportChange = () => {
      scheduleHoverCheck();
    };

    const handleMouseLeaveWindow = (event: globalThis.MouseEvent) => {
      if (event.relatedTarget === null) {
        setIsHoveringSection(false);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
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

      window.removeEventListener("wheel", handleWheel);

      window.removeEventListener("resize", handleViewportChange);

      document.removeEventListener("scroll", handleViewportChange, true);

      document.removeEventListener("mouseleave", handleMouseLeaveWindow);

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [scheduleHoverCheck, updatePointerPosition]);

  function handleSectionMouseMove(event: ReactMouseEvent<HTMLAnchorElement>) {
    updatePointerPosition(event.clientX, event.clientY);
    setIsHoveringSection(true);
  }

  function handleSectionMouseEnter(event: ReactMouseEvent<HTMLAnchorElement>) {
    updatePointerPosition(event.clientX, event.clientY);
    setIsHoveringSection(true);
  }

  function handleSectionMouseLeave() {
    scheduleHoverCheck();
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        initial={false}
        animate={{
          opacity: isHoveringSection ? 1 : 0,
          scale: isHoveringSection ? 1 : 0.72,
        }}
        transition={{
          opacity: {
            duration: 0.15,
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
            font-merchant
            text-[clamp(1.5rem,3vw,4rem)]
            font-normal
            leading-[0.8]
            tracking-[-0.045em]
            text-white
            mix-blend-difference
          "
        >
          View lamp
        </span>
      </motion.div>

      <section
        ref={sectionRef}
        className="
          relative
          h-[78svh]
          min-h-[620px]
          w-full
          overflow-hidden
          bg-[#1a1817]
          md:h-[92svh]
          md:min-h-[720px]
        "
      >
        <Link
          href={PRODUCT_URL}
          aria-label="View Ceramic Pendant Light"
          data-pendant-link="true"
          onMouseMove={handleSectionMouseMove}
          onMouseEnter={handleSectionMouseEnter}
          onMouseLeave={handleSectionMouseLeave}
          className="
            absolute
            inset-0
            block
            cursor-pointer
            md:cursor-none
          "
        >
          <motion.div
            style={{ y: backgroundY }}
            className="
              absolute
              inset-x-0
              -inset-y-[12%]
              will-change-transform
            "
          >
            <Image
              src="/pendant-4.jpg"
              alt="Ceramic pendant lights surrounded by greenery"
              fill
              priority
              sizes="100vw"
              className="
                pointer-events-none
                select-none
                object-cover
                object-center
              "
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-black/15" />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-r
              from-black/55
              via-black/20
              to-black/5
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/40
              via-transparent
              to-black/10
            "
          />

          <motion.div
            style={{ y: textY }}
            className="
              pointer-events-none
              absolute
              left-5
              top-1/2
              z-10
              max-w-[88vw]
              -translate-y-1/2
              text-white
              will-change-transform
              md:left-10
              lg:left-14
            "
          >
            <h2
              className="
                font-merchant
                text-[clamp(4rem,9vw,10rem)]
                font-light
                leading-[0.76]
                tracking-[-0.055em]
                text-white
              "
            >
              Ceramic
              <br />
              Pendant Light
            </h2>

            <p
              className="
                mt-5
                font-merchant
                text-[clamp(1.55rem,2.8vw,3.25rem)]
                font-light
                leading-none
                tracking-[-0.04em]
                text-white/80
                md:mt-8
              "
            >
              – Hand-painted
            </p>
          </motion.div>

          <PendantSlider sliderY={sliderY} />

          <div
            className="
              pointer-events-none
              absolute
              bottom-5
              left-5
              z-30
              font-merchant
              text-[1.7rem]
              font-light
              leading-none
              tracking-[-0.04em]
              text-white
              md:hidden
            "
          >
            View lamp →
          </div>
        </Link>
      </section>
    </>
  );
}
