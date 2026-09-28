"use client";

import { motion } from "framer-motion";

import { formatPrice } from "@/lib/formatPrice";

import ProductActions from "./ProductActions";
import ProductAvailability from "./ProductAvailability";
import ProductBenefits from "./ProductBenefits";
import ProductColorSelector from "./ProductColorSelector";
import ProductDescription from "./ProductDescription";
import ProductPlugSelector from "./ProductPlugSelector";
import ProductSpecs from "./ProductSpecs";

import type {
  ProductDetailsType,
  ProductVariantWithImages,
} from "./product.types";

type ProductInformationProps = {
  product: ProductDetailsType;

  colors: string[];
  plugTypes: string[];
  hasPlugTypes: boolean;

  selectedColor?: string;
  selectedPlugType?: string;
  selectedVariant?: ProductVariantWithImages;

  price: number;
  inStock: boolean;

  colorIsAvailable: (color: string) => boolean;
  plugIsAvailable: (plugType: string) => boolean;

  onColorChange: (color: string) => void;
  onPlugChange: (plugType: string) => void;
  onAddToCart: () => void;
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProductInformation({
  product,

  colors,
  plugTypes,
  hasPlugTypes,

  selectedColor,
  selectedPlugType,
  selectedVariant,

  price,
  inStock,

  colorIsAvailable,
  plugIsAvailable,

  onColorChange,
  onPlugChange,
  onAddToCart,
}: ProductInformationProps) {
  const description = product.description?.trim() || "";

  return (
    <section className="lg:col-span-5">
      <div className="lg:sticky lg:top-24">
        {/* CATEGORY */}
        <motion.p
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease,
          }}
          className="
            text-xs
            uppercase
            tracking-[0.34em]
            text-[#1a1817]/45
          "
        >
          {product.category.name}
        </motion.p>

        {/* TITLE */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{
              opacity: 0,
              x: 55,
              y: 12,
              filter: "blur(7px)",
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.05,
              delay: 0.12,
              ease,
            }}
            className="
              mt-5
              max-w-2xl
              font-bueno
              font-semibold
              text-[10vw]
              leading-[0.95]
              md:text-[5vw]
              lg:text-[6.2vw]
            "
          >
            {product.title}
          </motion.h1>
        </div>

        {/* PRICE */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
            filter: "blur(4px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.85,
            delay: 0.3,
            ease,
          }}
          className="mt-8 flex items-baseline gap-4"
        >
          <p
            className="
              text-4xl
              font-light
              tracking-[-0.05em]
              md:text-5xl
            "
          >
            {formatPrice(price, product.currency)}
          </p>

          {product.compareAtPrice && (
            <p
              className="
                text-xl
                text-[#1a1817]/35
                line-through
                md:text-2xl
              "
            >
              {formatPrice(product.compareAtPrice, product.currency)}
            </p>
          )}
        </motion.div>

        {/* REST OF INFORMATION */}
        <motion.div
          initial={{
            opacity: 0,
            y: 28,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.42,
            ease,
          }}
        >
          <ProductDescription description={description} />

          <ProductSpecs specs={product.specs} />

          <ProductColorSelector
            colors={colors}
            variants={product.variants}
            selectedColor={selectedColor}
            isAvailable={colorIsAvailable}
            onChange={onColorChange}
          />

          {hasPlugTypes && (
            <ProductPlugSelector
              plugTypes={plugTypes}
              selectedPlugType={selectedPlugType}
              isAvailable={plugIsAvailable}
              onChange={onPlugChange}
            />
          )}

          <ProductAvailability
            selectedVariant={selectedVariant}
            inStock={inStock}
          />

          <ProductActions inStock={inStock} onAddToCart={onAddToCart} />

          <ProductBenefits />
        </motion.div>
      </div>
    </section>
  );
}
