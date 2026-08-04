import type { ComponentProps } from "react";

import ProductCard from "./ProductCard";
import ShopEmptyState from "./ShopEmptyState";

type Product = ComponentProps<typeof ProductCard>["product"];

type ShopProductGridProps = {
  products: Product[];
};

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
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
