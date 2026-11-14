"use client";

import Link from "next/link";
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

type ProductCardProps = {
  product: ProductItem;
  index: number;
  small?: boolean;
};

function cleanTitle(title: string) {
  return title.split(/[–-]/)[0].trim();
}

function ProductCard({ product, index, small = false }: ProductCardProps) {
  const title = cleanTitle(product.title);
  const displayNumber = String(index + 1).padStart(2, "0");

  return (
    <article className="min-w-0">
      <Link
        href={`/products/${product.slug}`}
        aria-label={`View ${title}`}
        className="
          group
          relative
          block
          w-full
          cursor-pointer
          overflow-hidden
          bg-[#d7d6d4]
        "
      >
        {/* PRODUCT IMAGE */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={title}
          draggable={false}
          className="
            block
            aspect-[4/5]
            w-full
            object-cover
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
            className={
              small
                ? "text-[9px] font-black uppercase lg:text-[10px]"
                : "text-[10px] font-black uppercase md:text-xs"
            }
          >
            {displayNumber}
          </span>

          <span
            className={
              small
                ? "text-[9px] font-black uppercase lg:text-[10px]"
                : "text-[10px] font-black uppercase md:text-xs"
            }
          >
            New
          </span>
        </div>
      </Link>

      {/* TITLE + PRICE */}
      <div className="flex items-start justify-between gap-2 pt-3">
        <h3
          className={[
            "min-w-0 font-bold uppercase tracking-[-0.045em]",
            small
              ? "text-[11px] leading-[1.1] sm:text-[12px] lg:text-[13px]"
              : "text-[17px] leading-[1] sm:text-[18px] lg:text-[20px]",
          ].join(" ")}
        >
          {title}
        </h3>

        <span
          className={[
            "hidden shrink-0 font-bold md:block",
            small ? "text-[10px] lg:text-[11px]" : "text-[12px] lg:text-[14px]",
          ].join(" ")}
        >
          {formatPrice(product.price)}
        </span>
      </div>
    </article>
  );
}

export default function NewProductsGallery({
  products,
}: NewProductsGalleryProps) {
  const visibleProducts = products.slice(0, 6);

  const largeProducts = visibleProducts.slice(0, 2);
  const smallProducts = visibleProducts.slice(2, 6);

  return (
    <section className="relative bg-[#eeeeec] pt-20 text-[#1a1817]">
      {/* HEADING */}
      <div className="px-4 pt-10 md:px-9 md:pt-14">
        <h2 className="text-xl font-medium leading-[0.85] sm:text-2xl lg:text-3xl">
          Added lately(06)
        </h2>
      </div>

      {/* PRODUCTS */}
      <div className="px-4 pb-36 pt-8 md:px-9 md:pb-56 md:pt-8">
        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-x-6
            gap-y-12
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-x-9
          "
        >
          {/* TWO LARGE PRODUCTS */}
          {largeProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}

          {/* FOUR SMALL PRODUCTS — 2x2 */}
          {smallProducts.length > 0 && (
            <div
              className="
                grid
                min-w-0
                grid-cols-2
                gap-x-3
                gap-y-6
                sm:col-span-2
                sm:gap-x-5
                lg:col-span-1
                lg:gap-x-4
                lg:gap-y-5
              "
            >
              {smallProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index + 2}
                  small
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
