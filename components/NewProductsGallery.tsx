"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import {
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type ProductVariantItem = {
  id: string;
  name: string;
  color?: string | null;
  colorHex?: string | null;
};

type ProductItem = {
  id: string;
  number: string;
  title: string;
  slug: string;
  price: number;
  category: string;
  image: string;
  variants: ProductVariantItem[];
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

const productLayouts = [
  "md:col-start-1 md:col-span-2 md:mt-0",
  "md:col-start-5 md:col-span-2 md:mt-36",
  "md:col-start-3 md:col-span-2 md:mt-12",
  "md:col-start-6 md:col-span-2 md:mt-40",
  "md:col-start-1 md:col-span-2 md:mt-16",
  "md:col-start-4 md:col-span-2 md:mt-32",
];

const productScales = [1.06, 1, 1.03, 1, 1.04, 1.02];

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

  function handleImageMouseEnter(event: ReactMouseEvent<HTMLAnchorElement>) {
    hasPointerPosition.current = true;

    pointerPosition.current = {
      x: event.clientX,
      y: event.clientY,
    };

    mouseX.set(event.clientX);
    mouseY.set(event.clientY);

    setHoverText("View lamp");
    setIsHoveringImage(true);
  }

  function handleImageMouseLeave() {
    scheduleHoverCheck();
  }

  return (
    <section className="relative bg-[#eeeeec] pt-20 text-[#1a1817]">
      {/* CUSTOM TEXT CURSOR */}
      <motion.div
        aria-hidden="true"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        initial={false}
        animate={{
          opacity: isHoveringImage ? 1 : 0,
          scale: isHoveringImage ? 1 : 0.8,
        }}
        transition={{
          opacity: {
            duration: 0.2,
            ease: "easeOut",
          },
          scale: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9999]
          hidden
          mix-blend-difference
          md:block
        "
      >
        <span
          className="
            block
            -translate-x-1/2
            -translate-y-1/2
            whitespace-nowrap
            font-bueno
            text-[clamp(1.05rem,1.6vw,1.75rem)]
            font-bold
            uppercase
            leading-none
            tracking-[-0.025em]
            text-white
          "
        >
          {hoverText}
        </span>
      </motion.div>

      {/* SECTION HEADING */}
      <div className="px-4 pt-10 md:px-9 md:pt-14">
        <div className="flex items-start justify-between gap-8">
          <div className="relative inline-block">
            <h2
              className="
                font-bueno
                text-2xl
                font-bold
                uppercase
                leading-[0.85]
                sm:text-5xl
                lg:text-5xl
              "
            >
              Added lately(06)
            </h2>
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="px-4 pb-36 pt-16 md:px-9 md:pb-56 md:pt-24">
        <div
          className="
            grid
            grid-cols-1
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
                  style={
                    {
                      transform: `scale(${scale})`,
                      transformOrigin,
                    } as CSSProperties
                  }
                >
                  {/* PRODUCT IMAGE */}
                  <Link
                    href={`/products/${product.slug}`}
                    aria-label={`View ${title}`}
                    data-product-image="true"
                    data-hover-text="View lamp"
                    onMouseMove={handleImageMouseMove}
                    onMouseEnter={handleImageMouseEnter}
                    onMouseLeave={handleImageMouseLeave}
                    className="
                      group
                      relative
                      block
                      w-full
                      max-w-full
                      cursor-pointer
                      overflow-hidden
                      bg-[#d7d6d4]
                      md:cursor-none
                    "
                  >
                    <img
                      src={product.image}
                      alt={title}
                      draggable={false}
                      className="
                        block
                        h-auto
                        w-full
                        max-w-full
                        transition-transform
                        duration-700
                        ease-[cubic-bezier(0.16,1,0.3,1)]
                        group-hover:scale-[1.035]
                      "
                    />

                    {/* NUMBER LEFT / NEW RIGHT */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        top-0
                        z-10
                        flex
                        items-start
                        justify-between
                        p-3
                        text-white
                        mix-blend-difference
                      "
                    >
                      <span className="text-[10px] font-black uppercase md:text-xs">
                        {displayNumber}
                      </span>

                      <span className="text-[10px] font-black uppercase md:text-xs">
                        New
                      </span>
                    </div>
                  </Link>

                  {/* MOBILE TITLE */}
                  <div className="pt-3 md:hidden">
                    <h2
                      className="
                        text-[17px]
                        font-bold
                        uppercase
                        leading-[0.9]
                        tracking-[-0.04em]
                        sm:text-[20px]
                      "
                    >
                      {title}
                    </h2>
                  </div>

                  {/* DESKTOP TITLE + PRICE */}
                  <div className="hidden justify-between pt-3 md:flex">
                    <span className="flex flex-col text-sm font-bold tracking-[-0.055em] md:text-lg">
                      {title}
                    </span>

                    <span className="flex flex-col text-xs font-bold tracking-[0.08em] md:text-sm">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
