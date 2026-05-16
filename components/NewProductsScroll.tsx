"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/shop/ProductCard";

type NewProductsScrollProps = {
  products: any[];
};

export default function NewProductsScroll({
  products,
}: NewProductsScrollProps) {
  const duplicatedProducts = [...products, ...products];

  return (
    <div className="relative mt-16 overflow-hidden md:mt-24">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#ecebeb] to-transparent md:w-40" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#ecebeb] to-transparent md:w-40" />

      <motion.div
        className="flex w-max items-stretch gap-5 px-6 pb-4 md:px-12"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 35,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedProducts.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="w-[78vw] shrink-0 sm:w-[420px] md:w-[360px] xl:w-[390px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
