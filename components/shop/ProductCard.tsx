// components/shop/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import type {
  Product,
  ProductImage,
  ProductVariant,
  Category,
} from "@/prisma/generated/prisma/client";

type ProductCardType = Product & {
  category: Category;
  variants: Array<ProductVariant & { images: ProductImage[] }>;
  images: ProductImage[];
};

export default function ProductCard({ product }: { product: ProductCardType }) {
  const firstVariant = product.variants[0];
  const firstVariantImage = firstVariant?.images[0];
  const fallbackImage = product.images[0];

  const image = firstVariantImage || fallbackImage;
  const price = firstVariant?.price || product.price;

  const totalStock = product.variants.reduce(
    (total, variant) => total + variant.stock,
    0,
  );

  const colors = product.variants
    .filter((variant) => variant.color || variant.colorHex)
    .slice(0, 4);

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <article className="relative">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f3f0]">
          <div className="absolute left-4 top-4 z-10 text-xs uppercase tracking-[0.2em] text-[#161310]/35">
            {product.category.name}
          </div>

          {product.featured && (
            <div className="absolute right-4 top-4 z-10 text-xs uppercase tracking-[0.2em] text-[#161310]/35">
              Featured
            </div>
          )}

          {image ? (
            <Image
              src={image.url}
              alt={image.alt || product.title}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
              className="object-contain p-10 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[#161310]/35">
              No image
            </div>
          )}

          <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center justify-between border border-[#161310]/15 bg-[#ecebeb]/90 px-4 py-3 text-sm backdrop-blur">
              <span>{totalStock > 0 ? "View product" : "Out of stock"}</span>
              <span className="h-px w-10 bg-[#161310]" />
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex items-start justify-between gap-5">
            <div>
              <h2 className="text-lg font-light tracking-[-0.04em] md:text-xl">
                {product.title}
              </h2>

              <p className="mt-1 text-sm text-[#161310]/45">
                {product.variants.length}{" "}
                {product.variants.length === 1 ? "variant" : "variants"}
              </p>
            </div>

            <div className="text-right text-sm">
              <p>{formatPrice(price, product.currency)}</p>

              {product.compareAtPrice && (
                <p className="mt-1 text-[#161310]/35 line-through">
                  {formatPrice(product.compareAtPrice, product.currency)}
                </p>
              )}
            </div>
          </div>

          {colors.length > 0 && (
            <div className="mt-4 flex items-center gap-2">
              {colors.map((variant) => (
                <span
                  key={variant.id}
                  title={variant.color || variant.name}
                  className="h-3 w-3 border border-[#161310]/20"
                  style={{
                    backgroundColor: variant.colorHex || "#d8d1c7",
                  }}
                />
              ))}

              {product.variants.length > colors.length && (
                <span className="ml-1 text-xs text-[#161310]/35">
                  +{product.variants.length - colors.length}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
