"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useSpring } from "framer-motion";

export type ProductItem = {
  id: string;
  number: string;
  title: string;
  slug: string;
  category: string;
  image: string;
};

type NewProductsScrollProps = {
  products: ProductItem[];
};

const NAV_OFFSET = "72px";

export default function NewProductsScroll({
  products,
}: NewProductsScrollProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [rawIndex, setRawIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 62,
    damping: 26,
    mass: 0.55,
  });

  useEffect(() => {
    const updateSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (!products.length) return;

    const nextRawIndex = latest * Math.max(0, products.length - 1);
    setRawIndex(nextRawIndex);
  });

  if (!products.length) return null;

  const maxIndex = products.length - 1;

  const currentIndex = Math.min(maxIndex, Math.max(0, Math.floor(rawIndex)));
  const nextIndex = Math.min(currentIndex + 1, maxIndex);
  const progress = rawIndex - currentIndex;

  const activeIndex = Math.min(maxIndex, Math.max(0, Math.round(rawIndex)));
  const activeProduct = products[activeIndex];

  const frontProduct = products[currentIndex];
  const backProduct = products[nextIndex];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#ecebeb] text-[#161310]"
      style={{
        height: `calc(${Math.max(
          products.length * 74,
          290,
        )}vh + ${NAV_OFFSET})`,
      }}
    >
      <div
        className="sticky overflow-hidden bg-[#ecebeb]"
        style={{
          top: NAV_OFFSET,
          height: `calc(100vh - ${NAV_OFFSET})`,
        }}
      >
        <div className="relative h-full px-5 py-5 md:px-12 md:py-7">
          {/* TOP BAR */}
          <div className="absolute left-5 right-5 top-5 z-[200] flex items-center justify-between gap-4 md:left-12 md:right-12 md:top-7">
            <p className="min-w-0 truncate text-sm font-black uppercase leading-none tracking-[-0.055em] md:text-base">
              Newly added products
            </p>

            <Link
              href={`/products/${activeProduct.slug}`}
              className="inline-flex h-10 shrink-0 items-center justify-center border border-[#161310] bg-[#ecebeb] px-5 text-xs font-black uppercase tracking-[-0.045em] text-[#161310] transition-colors duration-200 hover:bg-[#161310] hover:text-[#ecebeb] md:h-12 md:px-8"
            >
              Shop now
            </Link>
          </div>

          {/* LEFT EDITORIAL TEXT - DESKTOP ONLY */}
          <div className="pointer-events-none absolute left-5 top-[25%] z-40 hidden max-w-[290px] md:left-12 md:block">
            <p className="text-[clamp(1.55rem,2.25vw,3rem)] font-black grain-hero-text uppercase leading-[0.88] tracking-[-0.08em]">
              Recently selected for quiet interiors.
            </p>

            <p className="mt-6 text-sm font-medium leading-[1.35] tracking-[-0.035em] text-[#161310]/55">
              A compact edit of newly added lighting and objects — chosen for
              soft contrast, warm presence and everyday calm.
            </p>
          </div>

          {/* RIGHT TEXT - DESKTOP ONLY */}
          <div className="pointer-events-none absolute right-5 top-[30%] z-40 hidden max-w-[260px] text-right md:right-12 md:block">
            <p className="text-sm font-medium leading-[1.35] tracking-[-0.035em] text-[#161310]/50">
              Scroll to rotate through the latest pieces.
            </p>
          </div>

          {/* ORBIT PRODUCT CARDS */}
          <div
            className="absolute inset-0 z-10 flex items-center justify-center pt-10 md:pt-0"
            style={{
              perspective: isDesktop ? "1900px" : "950px",
            }}
          >
            <div
              className="relative h-[62vh] w-[94vw] md:mt-4 md:h-[68vh] md:w-[52vw]"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <OrbitProductCard
                product={backProduct}
                angle={-180 + progress * 180}
                isFront={progress > 0.5}
                isPriority={progress > 0.5}
                isDesktop={isDesktop}
              />

              <OrbitProductCard
                product={frontProduct}
                angle={progress * 180}
                isFront={progress <= 0.5}
                isPriority={progress <= 0.5}
                isDesktop={isDesktop}
              />
            </div>
          </div>

          {/* SCREEN COUNTER - FAST HØYRE NEDRE HJØRNE */}
          <div className="pointer-events-none absolute bottom-5 right-5 z-[200] md:bottom-7 md:right-12">
            <p className="text-sm font-black uppercase leading-none tracking-[-0.04em] text-[#161310]/45 md:text-lg">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(products.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrbitProductCard({
  product,
  angle,
  isFront,
  isPriority,
  isDesktop,
}: {
  product: ProductItem;
  angle: number;
  isFront: boolean;
  isPriority: boolean;
  isDesktop: boolean;
}) {
  const rad = (angle * Math.PI) / 180;

  const side = Math.sin(rad);
  const depth = Math.cos(rad);

  const orbitX = isDesktop ? 168 : 38;
  const orbitZ = isDesktop ? 300 : 105;
  const rotationAmount = isDesktop ? 50 : 30;

  const x = side * orbitX;
  const z = depth * orbitZ;
  const rotateY = side * -rotationAmount;

  const opacity = 0.4 + ((depth + 1) / 2) * 0.6;

  return (
    <div
      className="absolute left-1/2 top-1/2 w-[56vw] max-w-[290px] md:w-[23vw] md:max-w-[370px]"
      style={{
        zIndex: isFront ? 30 : 10,
        opacity,
        transform: `
          translate(-50%, -50%)
          translateX(${x}px)
          translateZ(${z}px)
          rotateY(${rotateY}deg)
        `,
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50%",
        willChange: "transform, opacity",
      }}
    >
      <Link href={`/products/${product.slug}`} className="block w-full">
        <div className="h-[40vh] overflow-hidden bg-[#d8d2c8] md:h-[53vh]">
          <div className="relative h-full w-full ">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority={isPriority}
              sizes="(min-width: 768px) 23vw, 56vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-3 text-[#161310] md:mt-4">
          <p className="mb-1 truncate text-[10px] font-black uppercase leading-none tracking-[-0.035em] text-[#161310]/80 md:text-xs">
            {product.category}
          </p>

          <h2
            title={product.title}
            className="line-clamp-2 text-sm font-black uppercase leading-[0.95] tracking-[-0.055em] md:text-base"
          >
            {product.title}
          </h2>
        </div>
      </Link>
    </div>
  );
}
