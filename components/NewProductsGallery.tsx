"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import {
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type ProductItem = {
  id: string;
  number: string;
  title: string;
  slug: string;
  price: number;
  category: string;
  image: string;
};

type NewProductsGalleryProps = {
  products: ProductItem[];
};

type ProductLinkElement = HTMLAnchorElement & {
  dataset: {
    productImage?: string;
    hoverText?: string;
  };
};

const ease = [0.16, 1, 0.3, 1] as const;

const productLayouts = [
  "md:col-start-1 md:col-span-2 md:mt-0",
  "md:col-start-5 md:col-span-2 md:mt-36",
  "md:col-start-3 md:col-span-2 md:mt-12",
  "md:col-start-6 md:col-span-2 md:mt-40",
  "md:col-start-1 md:col-span-2 md:mt-16",
  "md:col-start-4 md:col-span-2 md:mt-32",
];

const productScales = [1, 0.82, 0.93, 0.76, 0.88, 0.8];

const productOrigins = [
  "center center",
  "right top",
  "left center",
  "right center",
  "left top",
  "center center",
];

function cleanTitle(title: string) {
  return title.split(/[–-]/)[0].trim();
}

export default function NewProductsGallery({
  products,
}: NewProductsGalleryProps) {
  const visibleProducts = products.slice(0, 6);

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

    const outsideViewport =
      x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight;

    if (outsideViewport) {
      setIsHoveringImage(false);
      return;
    }

    const element = document.elementFromPoint(x, y);

    const productLink =
      element?.closest<ProductLinkElement>("[data-product-image]") ?? null;

    if (!productLink) {
      setIsHoveringImage(false);
      return;
    }

    const nextHoverText = productLink.dataset.hoverText;

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
    title: string,
  ) {
    hasPointerPosition.current = true;

    pointerPosition.current = {
      x: event.clientX,
      y: event.clientY,
    };

    mouseX.set(event.clientX);
    mouseY.set(event.clientY);

    setHoverText(title);
    setIsHoveringImage(true);
  }

  function handleImageMouseLeave() {
    scheduleHoverCheck();
  }

  return (
    <section className="relative bg-[#ecebeb] text-[#161310]">
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
          text-black
          md:flex
        "
      >
        <span
          className="
            max-w-[34vw]
            text-left
            text-[3.6vw]
            font-black
            uppercase
            leading-[0.9]
            tracking-[-0.055em]
          "
        >
          {hoverText}
        </span>
      </motion.div>

      <div className="px-4 pt-10 md:px-9 md:pt-14">
        <div className="flex items-end justify-between">
          <div className="relative inline-block">
            <h2
              className="
                text-[36px]
                font-black
                uppercase
                leading-[0.85]
                tracking-[-0.06em]
                sm:text-[48px]
                md:text-[64px]
                lg:text-[82px]
              "
            >
              Recently added
            </h2>

            <span
              className="
                absolute
                right-0
                top-0
                -translate-y-[115%]
                text-[9px]
                font-bold
                uppercase
                tracking-[0.08em]
                opacity-90
                md:text-[16px]
              "
            >
              {String(visibleProducts.length).padStart(2, "0")}
            </span>
          </div>

          <p
            className="
              mb-1
              hidden
              max-w-[190px]
              text-right
              text-[11px]
              font-medium
              uppercase
              leading-[1.15]
              tracking-[-0.02em]
              md:block
              md:text-sm
            "
          >
            Selected lighting objects
          </p>
        </div>
      </div>

      <div className="px-4 pb-36 pt-16 md:px-9 md:pb-56 md:pt-24">
        <div
          className="
            grid
            grid-cols-2
            gap-x-4
            gap-y-20
            md:grid-cols-7
            md:gap-x-6
            md:gap-y-20
            lg:gap-x-9
          "
        >
          {visibleProducts.map((product, index) => {
            const title = cleanTitle(product.title);
            const displayNumber = String(index + 1).padStart(2, "0");
            const scale = productScales[index % productScales.length];

            const transformOrigin =
              productOrigins[index % productOrigins.length];

            return (
              <article
                key={product.id}
                className={[
                  "col-span-1",
                  productLayouts[index % productLayouts.length],
                ].join(" ")}
              >
                <div
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin,
                  }}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    aria-label={`View ${title}`}
                    data-product-image="true"
                    data-hover-text={title}
                    onMouseMove={handleImageMouseMove}
                    onMouseEnter={(event) =>
                      handleImageMouseEnter(event, title)
                    }
                    onMouseLeave={handleImageMouseLeave}
                    className="
                      group
                      relative
                      block
                      aspect-[3/4]
                      w-full
                      cursor-pointer
                      overflow-hidden
                      bg-[#d7d6d4]
                      md:cursor-none
                    "
                  >
                    <Image
                      src={product.image}
                      alt={title}
                      fill
                      draggable={false}
                      sizes="
                        (max-width: 767px) 48vw,
                        (max-width: 1024px) 25vw,
                        18vw
                      "
                      className="object-cover"
                    />

                    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-3 text-white mix-blend-difference">
                      <span className="text-[10px] font-black uppercase md:hidden">
                        {product.number}
                      </span>

                      <span className="ml-auto text-[10px] font-black uppercase md:text-xs">
                        New
                      </span>
                    </div>
                  </Link>

                  <div className="pt-3 md:hidden">
                    <h2
                      className="
                        text-[17px]
                        font-black
                        uppercase
                        leading-[0.9]
                        tracking-[-0.055em]
                        sm:text-[20px]
                      "
                    >
                      {title}
                    </h2>

                    <p
                      className="
                        mt-3
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.08em]
                        opacity-60
                      "
                    >
                      {product.category}
                    </p>
                  </div>

                  <div className="hidden pt-2 md:flex justify-between">
                    <span className="text-xl font-bold uppercase tracking-[0.08em]">
                      {displayNumber}
                    </span>
                    <span className="text-xl font-bold uppercase tracking-[0.08em]">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <Link
        href="/shop"
        className="
          group
          flex
          min-h-[86px]
          items-center
          px-4
          md:min-h-[105px]
          md:px-9
        "
      >
        <span
          className="
            flex
            items-center
            gap-4
            text-[28px]
            font-black
            uppercase
            leading-none
            tracking-[-0.055em]
            md:text-[42px]
          "
        >
          View all products
          <svg
            aria-hidden="true"
            viewBox="0 0 52 18"
            fill="none"
            className="h-[18px] w-[52px] overflow-visible"
          >
            <path
              d="M1 9H46"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />

            <path
              d="M46 9L39 2"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              pathLength="1"
              className="
                [stroke-dasharray:1]
                [stroke-dashoffset:1]
                transition-[stroke-dashoffset]
                duration-300
                ease-[cubic-bezier(0.16,1,0.3,1)]
                group-hover:[stroke-dashoffset:0]
              "
            />

            <path
              d="M46 9L39 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              pathLength="1"
              className="
                [stroke-dasharray:1]
                [stroke-dashoffset:1]
                transition-[stroke-dashoffset]
                duration-300
                ease-[cubic-bezier(0.16,1,0.3,1)]
                group-hover:[stroke-dashoffset:0]
              "
            />
          </svg>
        </span>
      </Link>
    </section>
  );
}
