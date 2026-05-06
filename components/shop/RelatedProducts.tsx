// components/shop/RelatedProducts.tsx
import ProductCard from "@/components/shop/ProductCard";
import type {
  Category,
  Product,
  ProductImage,
  ProductVariant,
} from "@/prisma/generated/prisma/client";

type RelatedProduct = Product & {
  category: Category;
  images: ProductImage[];
  variants: Array<ProductVariant & { images: ProductImage[] }>;
};

export default function RelatedProducts({
  products,
}: {
  products: RelatedProduct[];
}) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#ecebeb] px-6 pb-24 pt-10 text-[#161310] md:px-12 md:pb-32">
      <div className="border-t border-[#161310]/15 pt-10">
        <div className="mb-10 flex items-end justify-between gap-8">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.34em] text-[#161310]/45">
              Related products
            </p>

            <h2 className="max-w-2xl text-5xl font-light leading-[0.95] tracking-[-0.07em] md:text-7xl">
              You may also like.
            </h2>
          </div>
        </div>

        <div className="no-scrollbar overflow-x-auto">
          <div className="flex w-max gap-5 pb-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="w-[78vw] shrink-0 sm:w-[420px] md:w-[360px] xl:w-[390px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
