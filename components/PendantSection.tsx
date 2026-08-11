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
  useRef,
  useState,
} from "react";

const PRODUCT_URL =
  "/products/vintage-ceramic-pendant-light-hand-painted-copper-hanging-lamp";

const ease = [0.16, 1, 0.3, 1] as const;

type ProductLinkElement = HTMLAnchorElement & {
  dataset: {
    pendantLink?: string;
  };
};

type FloatingImageProps = {
  imageY: MotionValue<string>;
};

function FloatingImage({ imageY }: FloatingImageProps) {
  return (
    <motion.div
      style={{
        y: imageY,
      }}
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
          w-full
          overflow-hidden
        "
      >
        <Image
          src="/ceramic-03.jpg"
          alt="Red hand-painted ceramic pendant light"
          fill
          priority
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

  const floatingImageY = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);

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
            font-morganite
            text-[clamp(3.5rem,5vw,6rem)]
            font-black
            uppercase
            leading-[0.8]
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
            style={{
              y: backgroundY,
            }}
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

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-black/15
            "
          />

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
            style={{
              y: textY,
            }}
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
                font-morganite
                text-[clamp(6rem,11vw,12rem)]
                font-black
                uppercase
                leading-[0.76]
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
                font-morganite
                text-[clamp(2.55rem,3.8vw,4.25rem)]
                font-semibold
                leading-none
                text-white/80

                md:mt-8
              "
            >
              – Hand-painted
            </p>
          </motion.div>

          <FloatingImage imageY={floatingImageY} />

          <div
            className="
              pointer-events-none
              absolute
              bottom-5
              left-5
              z-30
              font-morganite
              text-[3.7rem]
              leading-none
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
