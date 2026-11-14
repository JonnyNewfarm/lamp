"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { formatPrice } from "@/lib/formatPrice";

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

  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  return (
    <section className="relative bg-[#eeeeec] pt-20 text-[#1a1817]">
      <div className="px-4 pt-10 md:px-9 md:pt-14">
        <div className="flex items-start justify-between gap-8">
          <div className="relative inline-block">
            <h2
              className="
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

            const isInactive =
              hoveredProduct !== null && hoveredProduct !== product.id;

            return (
              <article
                key={product.id}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onFocus={() => setHoveredProduct(product.id)}
                onBlur={(event) => {
                  if (
                    !event.currentTarget.contains(
                      event.relatedTarget as Node | null,
                    )
                  ) {
                    setHoveredProduct(null);
                  }
                }}
                className={[
                  "col-span-1",
                  "transition-[filter]",
                  "duration-700",
                  "ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isInactive ? "blur-[2px]" : "blur-0",
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
                  <Link
                    href={`/products/${product.slug}`}
                    aria-label={`View ${title}`}
                    className="
                      group
                      relative
                      block
                      w-full
                      max-w-full
                      cursor-pointer
                      overflow-hidden
                      bg-[#d7d6d4]
                    "
                  >
                    {/* PRODUCT IMAGE WITH SUBTLE ZOOM */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
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

                    {/* IMAGE LABELS */}
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
                      <span
                        className="
                          text-[10px]
                          font-black
                          uppercase
                          md:text-xs
                        "
                      >
                        {displayNumber}
                      </span>

                      <span
                        className="
                          text-[10px]
                          font-black
                          uppercase
                          md:text-xs
                        "
                      >
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
                    <span
                      className="
                        flex
                        flex-col
                        text-sm
                        font-bold
                        tracking-[-0.055em]
                        md:text-lg
                      "
                    >
                      {title}
                    </span>

                    <span
                      className="
                        flex
                        flex-col
                        text-xs
                        font-bold
                        tracking-[0.08em]
                        md:text-sm
                      "
                    >
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
