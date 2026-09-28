"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

import ProductCard from "./ProductCard";
import ShopEmptyState from "./ShopEmptyState";

type Product = ComponentProps<typeof ProductCard>["product"];

type ShopProductGridProps = {
  products: Product[];
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function ShopProductGrid({ products }: ShopProductGridProps) {
  if (products.length === 0) {
    return <ShopEmptyState />;
  }

  return (
    <div
      className="
        grid
        gap-x-5
        gap-y-14
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {products.map((product, index) => {
        const direction = index % 2 === 0 ? -1 : 1;

        return (
          <motion.div
            key={product.id}
            initial={{
              opacity: 0,
              x: direction * 26,
              y: 34,
              scale: 0.985,
              filter: "blur(8px)",
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            viewport={{
              once: true,
              amount: 0.12,
              margin: "0px 0px -40px 0px",
            }}
            transition={{
              duration: 0.9,
              delay: (index % 3) * 0.07,
              ease,
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        );
      })}
    </div>
  );
}
