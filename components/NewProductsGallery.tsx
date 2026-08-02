"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import {
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

const ease = [0.16, 1, 0.3, 1] as const;

const productLayouts = [
  "md:col-start-1 md:col-span-2 md:mt-0",
  "md:col-start-5 md:col-span-2 md:mt-36",
  "md:col-start-3 md:col-span-2 md:mt-12",
  "md:col-start-6 md:col-span-2 md:mt-40 mr-5",
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

function getVariantColorKey(variant: ProductVariantItem) {
  const colorHex = variant.colorHex?.trim().toLowerCase();

  if (colorHex) {
    return colorHex;
  }

  const colorName = variant.color?.trim().toLowerCase();

  if (colorName) {
    return colorName;
  }

  return null;
}

export default function NewProductsGallery({
  products,
}: NewProductsGalleryProps) {
  const visibleProducts = products.slice(0, 6);

  const sectionRef = useRef<HTMLElement | null>(null);

  const [isSectionInView, setIsSectionInView] = useState(false);
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

  useEffect(() => {
    const checkSectionPosition = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const showAfter = viewportHeight * 0.35;
      const hideBefore = viewportHeight * 0.65;

      const shouldShow = rect.top <= showAfter && rect.bottom >= hideBefore;

      setIsSectionInView(shouldShow);
    };

    checkSectionPosition();

    window.addEventListener("scroll", checkSectionPosition, {
      passive: true,
    });

    window.addEventListener("resize", checkSectionPosition);

    return () => {
      window.removeEventListener("scroll", checkSectionPosition);
      window.removeEventListener("resize", checkSectionPosition);
    };
  }, []);

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
    <section ref={sectionRef} className="relative bg-[#ecebeb] text-[#161310]">
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: isSectionInView ? 1 : 0,
          x: isSectionInView ? 0 : 14,
        }}
        transition={{
          duration: 0.55,
          ease,
        }}
        className="
          pointer-events-none
          fixed
          right-2
          top-1/2
          z-40
          hidden
          -translate-y-1/2
          mix-blend-difference
          md:block
          lg:right-4
        "
      >
        <span
          className="
            hidden
            translate-x-[42%]
            rotate-90
            whitespace-nowrap
            text-[10px]
            font-normal
            uppercase
            tracking-[0.2em]
            text-white
            mix-blend-difference
            md:block
            lg:text-[12px]
          "
        >
          New products — 2026
        </span>
      </motion.div>

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
          text-white
          mix-blend-difference
          md:flex
        "
      >
        <span
          className="
            max-w-[34vw]
            text-center
            text-[3.6vw]
            font-black
            uppercase
            leading-[0.9]
            tracking-[-0.01em]
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
                font-merchant
                text-[36px]
                font-bold
                leading-[0.85]
                tracking-[-0.01em]
                sm:text-[44px]
                md:text-[50px]
                lg:text-[60px]
              "
            >
              Added <br /> lately
            </h2>

            <span
              className="
                font-merchant
                absolute
                -right-4
                top-0
                -translate-y-[115%]
                text-[9px]
                font-bold
                uppercase
                tracking-[0.08em]
                opacity-90
                md:text-[14px]
              "
            >
              {String(visibleProducts.length).padStart(2, "0")}
            </span>
          </div>
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

            const variants = product.variants ?? [];

            const uniqueColors = Array.from(
              variants
                .reduce<Map<string, ProductVariantItem>>((map, variant) => {
                  const colorKey = getVariantColorKey(variant);

                  if (colorKey && !map.has(colorKey)) {
                    map.set(colorKey, variant);
                  }

                  return map;
                }, new Map())
                .values(),
            );

            const visibleColors = uniqueColors.slice(0, 4);
            const hiddenColorCount = uniqueColors.length - visibleColors.length;

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
                  <span className="pb-1 text-lg font-merchant uppercase tracking-[0.08em]">
                    {displayNumber}
                  </span>

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
                      w-fit
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
                        max-w-full
                        transition-transform
                        duration-700
                        ease-[cubic-bezier(0.16,1,0.3,1)]
                        group-hover:scale-[1.035]
                      "
                    />

                    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-3 text-white mix-blend-difference">
                      <span className="text-[10px] uppercase md:hidden">
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
                      {title}
                    </p>
                  </div>

                  <div className="hidden justify-between pt-3 md:flex">
                    <span className="flex flex-col text-sm font-bold tracking-[-0.55.em] md:text-lg">
                      {title}
                    </span>

                    <span className="flex flex-col text-xs font-bold tracking-[0.08em] md:text-sm">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  {variants.length > 0 && (
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="text-[9px] font-bold uppercase tracking-[0.08em] opacity-50 md:text-[10px]">
                        {variants.length}{" "}
                        {variants.length === 1 ? "variant" : "variants"}
                      </span>

                      {visibleColors.length > 0 && (
                        <div className="flex items-center gap-1.5">
                          {visibleColors.map((variant) => {
                            const colorKey = getVariantColorKey(variant);

                            return (
                              <span
                                key={colorKey}
                                title={variant.color || variant.name}
                                className="h-2.5 w-2.5 border border-[#161310]/20 md:h-3 md:w-3"
                                style={{
                                  backgroundColor:
                                    variant.colorHex ||
                                    variant.color ||
                                    "#d8d1c7",
                                }}
                              />
                            );
                          })}

                          {hiddenColorCount > 0 && (
                            <span className="ml-0.5 text-[9px] font-bold opacity-40 md:text-[10px]">
                              +{hiddenColorCount}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
