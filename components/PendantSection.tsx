"use client";

import {
  AnimatePresence,
  motion,
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

type ProductLinkElement = HTMLAnchorElement & {
  dataset: {
    pendantLink?: string;
  };
};

export default function PendantImageSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHoveringSection, setIsHoveringSection] = useState(false);

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

    if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) {
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

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % slides.length;
      });
    }, 3200);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

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
        setIsHoveringSection(false);
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

  function handleSectionMouseMove(event: ReactMouseEvent<HTMLAnchorElement>) {
    hasPointerPosition.current = true;

    pointerPosition.current = {
      x: event.clientX,
      y: event.clientY,
    };

    mouseX.set(event.clientX);
    mouseY.set(event.clientY);

    setIsHoveringSection(true);
  }

  function handleSectionMouseEnter(event: ReactMouseEvent<HTMLAnchorElement>) {
    hasPointerPosition.current = true;

    pointerPosition.current = {
      x: event.clientX,
      y: event.clientY,
    };

    mouseX.set(event.clientX);
    mouseY.set(event.clientY);

    setIsHoveringSection(true);
  }

  function handleSectionMouseLeave() {
    scheduleHoverCheck();
  }

  return (
    <>
      {/* Cursor text */}
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
          {/* Background */}
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

          {/* Overlays */}
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

          {/* Main text */}
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

          {/* Slider */}
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
                aspect-[4/5]
                overflow-hidden
                bg-[#eeeeec]
              "
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={slides[activeIndex].src}
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  exit={{ x: "100%" }}
                  transition={{
                    duration: 1,
                    ease: sliderEase,
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slides[activeIndex].src}
                    alt={slides[activeIndex].alt}
                    fill
                    sizes="
                      (max-width: 767px) 28vw,
                      (max-width: 1279px) 14vw,
                      210px
                    "
                    className="
                      pointer-events-none
                      select-none
                      object-cover
                      object-center
                    "
                  />
                </motion.div>
              </AnimatePresence>
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

          {/* Mobile */}
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
