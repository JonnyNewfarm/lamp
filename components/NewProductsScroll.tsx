"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

type ProductItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  price?: string | null;
};

type NewProductsScrollProps = {
  products: ProductItem[];
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function NewProductsScroll({
  products,
}: NewProductsScrollProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 26,
    mass: 0.9,
  });

  useMotionValueEvent(progress, "change", (latest) => {
    const nextIndex = Math.min(
      products.length - 1,
      Math.max(0, Math.floor(latest * products.length)),
    );

    setActiveIndex(nextIndex);
  });

  const activeProduct = products[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#ecebeb] text-[#161310]"
      style={{
        height: `calc(${products.length} * 105vh)`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Desktop info panel */}
        <div className="hidden md:block">
          <ProductInfoPanel
            activeProduct={activeProduct}
            activeIndex={activeIndex}
            total={products.length}
          />
        </div>

        {/* Mobile intro text */}
        <MobileProductsIntro progress={progress} />

        <div className="absolute inset-0">
          {products.map((product, index) => (
            <ScrollProductImage
              key={product.id}
              product={product}
              index={index}
              activeIndex={activeIndex}
              progress={progress}
              total={products.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductInfoPanel({
  activeProduct,
  activeIndex,
  total,
}: {
  activeProduct: ProductItem;
  activeIndex: number;
  total: number;
}) {
  return (
    <>
      {/* Top info */}
      <div className="pointer-events-auto absolute left-12 top-12 z-40 max-w-[28rem]">
        <motion.p
          key={`category-${activeProduct.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
          className="mb-3 text-[11px] font-black uppercase tracking-[0.24em] text-[#161310]/55"
        >
          {activeProduct.category}
        </motion.p>

        <motion.h2
          key={`title-${activeProduct.id}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          className="max-w-[22rem] text-[clamp(1.7rem,2.9vw,3.7rem)] font-black uppercase leading-[0.88] tracking-[-0.07em]"
        >
          {activeProduct.title}
        </motion.h2>
      </div>

      {/* Bottom info - no enter animation */}
      <div className="pointer-events-auto absolute bottom-12 left-12 z-40 max-w-[28rem]">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-[#161310]/65">
          {activeProduct.price ? (
            <>
              <span className="uppercase tracking-[0.08em] text-[#161310]/50">
                Price
              </span>
              <span>{formatPrice(activeProduct.price)}</span>

              <span className="h-px w-8 bg-[#161310]/25" />
            </>
          ) : (
            <span className="h-px w-10 bg-[#161310]/25" />
          )}

          <span className="uppercase tracking-[0.08em] text-[#161310]/50">
            Selected
          </span>

          <span>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-8 max-w-[28rem] text-base leading-[1.65] text-[#161310]/60">
          Carefully selected lighting for soft contrast, warm atmosphere and
          calm interiors.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-6">
          <Link
            href={`/products/${activeProduct.slug}`}
            className="inline-flex h-[64px] items-center border-2 border-[#161310] px-8 text-sm font-semibold text-[#161310] transition hover:bg-[#161310] hover:text-[#ecebeb]"
          >
            View product
          </Link>

          <Link
            href="/shop"
            className="group inline-flex items-center gap-4 text-sm font-medium text-[#161310]"
          >
            <span className="relative overflow-hidden">
              <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                Shop all
              </span>
              <span className="absolute left-0 top-full block transition-transform duration-500 group-hover:-translate-y-full">
                Explore more
              </span>
            </span>

            <span className="h-px w-12 bg-[#161310] transition-all duration-500 group-hover:w-16" />
          </Link>
        </div>
      </div>
    </>
  );
}

function MobileProductsIntro({
  progress,
}: {
  progress: ReturnType<typeof useSpring>;
}) {
  const opacity = useTransform(progress, [0, 0.035, 0.075], [1, 1, 0]);
  const y = useTransform(progress, [0, 0.16], ["0vh", "-4vh"]);

  return (
    <motion.div
      style={{
        opacity,
        y,
      }}
      className="pointer-events-none absolute left-5 top-24 z-30 max-w-[18rem] md:hidden"
    >
      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-[#161310]/55">
        Latest arrivals
      </p>

      <h2 className="text-[clamp(2.2rem,10vw,4.2rem)] font-black uppercase leading-[0.78] tracking-[-0.09em]">
        Newly
        <br />
        added
        <br />
        products
      </h2>

      <p className="mt-5 max-w-[15rem] text-sm leading-[1.55] text-[#161310]/55">
        Selected lighting pieces for calm interiors and everyday atmosphere.
      </p>
    </motion.div>
  );
}

function ScrollProductImage({
  product,
  index,
  activeIndex,
  progress,
  total,
}: {
  product: ProductItem;
  index: number;
  activeIndex: number;
  progress: ReturnType<typeof useSpring>;
  total: number;
}) {
  const isActive = index === activeIndex;

  const segment = 1 / total;
  const start = index * segment;
  const middle = start + segment * 0.5;
  const end = start + segment;

  const desktop = getDesktopImagePosition(index);
  const mobile = getMobileImagePosition(index);

  const desktopY = useTransform(
    progress,
    [start - segment * 0.7, middle, end + segment * 0.7],
    ["85vh", "0vh", "-38vh"],
  );

  const mobileY = useTransform(
    progress,
    [start - segment * 0.7, middle, end + segment * 0.7],
    ["82vh", "0vh", "-34vh"],
  );

  const desktopX = useTransform(
    progress,
    [start - segment * 0.7, middle, end + segment * 0.7],
    [desktop.fromX, desktop.x, desktop.toX],
  );

  const mobileX = useTransform(
    progress,
    [start - segment * 0.7, middle, end + segment * 0.7],
    [mobile.fromX, mobile.x, mobile.toX],
  );

  const desktopRotate = useTransform(
    progress,
    [start - segment * 0.7, middle, end + segment * 0.7],
    [desktop.rotateFrom, desktop.rotate, desktop.rotateTo],
  );

  const mobileRotate = useTransform(
    progress,
    [start - segment * 0.7, middle, end + segment * 0.7],
    [mobile.rotateFrom, mobile.rotate, mobile.rotateTo],
  );

  const opacity = useTransform(
    progress,
    [
      start - segment * 0.65,
      start - segment * 0.25,
      end + segment * 0.2,
      end + segment * 0.62,
    ],
    [0, 1, 1, 0],
  );

  return (
    <>
      {/* Mobile */}
      <motion.article
        style={{
          x: mobileX,
          y: mobileY,
          rotate: mobileRotate,
          opacity,
        }}
        animate={{
          scale: isActive ? 1 : 0.92,
          filter: isActive ? "blur(0px)" : "blur(3px)",
        }}
        transition={{
          scale: { duration: 0.45, ease },
          filter: { duration: 0.45, ease },
        }}
        className={`absolute md:hidden ${mobile.className}`}
      >
        <ProductImageLink product={product} isActive={isActive} />
      </motion.article>

      {/* Desktop */}
      <motion.article
        style={{
          x: desktopX,
          y: desktopY,
          rotate: desktopRotate,
          opacity,
        }}
        animate={{
          scale: isActive ? 1.03 : 0.94,
          filter: isActive ? "blur(0px)" : "blur(4px)",
        }}
        transition={{
          scale: { duration: 0.45, ease },
          filter: { duration: 0.45, ease },
        }}
        className={`absolute hidden md:block ${desktop.className}`}
      >
        <ProductImageLink product={product} isActive={isActive} />
      </motion.article>
    </>
  );
}

function ProductImageLink({
  product,
  isActive,
}: {
  product: ProductItem;
  isActive: boolean;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative block h-full w-full overflow-hidden bg-[#161310]"
    >
      <Image
        src={product.image}
        alt={product.title}
        fill
        sizes="(min-width: 768px) 42vw, 92vw"
        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />

      <motion.div
        animate={{
          opacity: isActive ? 0.08 : 0.44,
        }}
        transition={{ duration: 0.45, ease }}
        className="absolute inset-0 bg-[#161310]"
      />

      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-4 text-white md:gap-5 md:p-6">
        <div>
          <p className="mb-2 text-[9px] font-black uppercase tracking-[0.22em] text-white/70 md:text-[10px]">
            {product.category}
          </p>

          <h3 className="max-w-[14rem] text-lg font-black uppercase leading-[0.9] tracking-[-0.055em] md:max-w-[16rem] md:text-2xl">
            {product.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

function getMobileImagePosition(index: number) {
  const pattern = index % 3;

  if (pattern === 0) {
    return {
      className: "left-[5vw] top-[28vh] h-[56vh] w-[90vw]",
      x: "0vw",
      fromX: "14vw",
      toX: "-10vw",
      rotate: -1,
      rotateFrom: -3,
      rotateTo: 2,
    };
  }

  if (pattern === 1) {
    return {
      className: "left-[8vw] top-[31vh] h-[52vh] w-[84vw]",
      x: "0vw",
      fromX: "16vw",
      toX: "-12vw",
      rotate: 1.2,
      rotateFrom: 3,
      rotateTo: -2,
    };
  }

  return {
    className: "left-[4vw] top-[30vh] h-[54vh] w-[92vw]",
    x: "0vw",
    fromX: "14vw",
    toX: "-9vw",
    rotate: 0.5,
    rotateFrom: 2.5,
    rotateTo: -2.5,
  };
}

function getDesktopImagePosition(index: number) {
  const pattern = index % 5;

  if (pattern === 0) {
    return {
      className: "right-[8vw] top-[17vh] h-[48vh] w-[34vw]",
      x: "0vw",
      fromX: "10vw",
      toX: "-4vw",
      rotate: -1.5,
      rotateFrom: -4,
      rotateTo: 2,
    };
  }

  if (pattern === 1) {
    return {
      className: "right-[15vw] bottom-[8vh] h-[40vh] w-[38vw]",
      x: "0vw",
      fromX: "14vw",
      toX: "-6vw",
      rotate: 1.5,
      rotateFrom: 4,
      rotateTo: -2,
    };
  }

  if (pattern === 2) {
    return {
      className: "right-[4vw] top-[34vh] h-[46vh] w-[36vw]",
      x: "0vw",
      fromX: "12vw",
      toX: "-8vw",
      rotate: 0.8,
      rotateFrom: 3,
      rotateTo: -3,
    };
  }

  if (pattern === 3) {
    return {
      className: "right-[26vw] bottom-[12vh] h-[38vh] w-[30vw]",
      x: "0vw",
      fromX: "8vw",
      toX: "-5vw",
      rotate: -2,
      rotateFrom: -5,
      rotateTo: 2,
    };
  }

  return {
    className: "right-[9vw] top-[20vh] h-[52vh] w-[36vw]",
    x: "0vw",
    fromX: "12vw",
    toX: "-7vw",
    rotate: 2,
    rotateFrom: 5,
    rotateTo: -2,
  };
}

function formatPrice(price: string) {
  const numeric = Number(price);

  if (Number.isNaN(numeric)) {
    return price;
  }

  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  }).format(numeric);
}
