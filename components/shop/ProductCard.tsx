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

  const firstVariantImage = product.variants
    .flatMap((variant) => variant.images)
    .find(Boolean);

  const lifestyleImage = product.images[0];

  const image = firstVariantImage || lifestyleImage;

  const price = firstVariant?.price || product.price;

  const totalStock = product.variants.reduce(
    (total, variant) => total + variant.stock,
    0,
  );

  const colors = product.variants
    .filter((variant) => variant.color || variant.colorHex)
    .slice(0, 4);

  const hasDifferentLifestyleImage =
    lifestyleImage && image && lifestyleImage.id !== image.id;

  return (
    <Link href={`/products/${product.slug}`} className="block">
      <article className="relative">
        {/* PRODUCT IMAGE */}
        <div
          className="
            group/image
            isolate
            relative
            aspect-[4/5]
            overflow-hidden
            bg-[#f4f3f0]
          "
        >
          {/* CATEGORY */}
          <div
            className="
              pointer-events-none
              absolute
              left-4
              top-4
              z-20
              text-xs
              uppercase
              tracking-[0.2em]
              text-black
              transition-opacity
              duration-300
              ease-out
              lg:group-hover/image:opacity-0
            "
          >
            {product.category.name}
          </div>

          {/* FEATURED */}
          {product.featured && (
            <div
              className="
                pointer-events-none
                absolute
                right-4
                top-4
                z-20
                text-xs
                uppercase
                tracking-[0.2em]
                text-[#161310]/35
              "
            >
              Featured
            </div>
          )}

          {/* MAIN IMAGE */}
          {image ? (
            <Image
              src={image.url}
              alt={image.alt || product.title}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
              className="
                z-0
                object-contain
                p-10
                transition-transform
                duration-700
                ease-out
                lg:group-hover/image:scale-[1.03]
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                items-center
                justify-center
                text-sm
                text-[#161310]/35
              "
            >
              No image
            </div>
          )}

          {hasDifferentLifestyleImage && (
            <Image
              src={lifestyleImage.url}
              alt={lifestyleImage.alt || product.title}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
              className="
                z-10
                hidden
                object-cover
                opacity-0
                transition-opacity
                duration-500
                ease-out
                lg:block
                lg:group-hover/image:opacity-100
              "
            />
          )}

          <div
            className="
              pointer-events-none
              absolute
              bottom-4
              left-4
              z-20
              translate-y-4
              opacity-0
              transition-all
              duration-500
              ease-[cubic-bezier(0.16,1,0.3,1)]
              lg:group-hover/image:translate-y-0
              lg:group-hover/image:opacity-100
            "
          >
            <span
              className="
                font-bueno
                text-[clamp(1rem,1.5vw,1.5rem)]
                font-bold
                uppercase
                leading-none
                tracking-[-0.025em]
                text-white
              "
            >
              {totalStock > 0 ? "View product" : "Out of stock"}
            </span>
          </div>
        </div>

        {/* PRODUCT INFORMATION */}
        <div className="pt-5">
          <div className="flex items-start justify-between gap-5">
            <div>
              <h2
                className="
                  text-lg
                  font-light
                  tracking-[-0.04em]
                  md:text-xl
                "
              >
                {product.title}
              </h2>

              <p className="mt-1 text-sm text-[#161310]/45">
                {product.variants.length}{" "}
                {product.variants.length === 1 ? "variant" : "variants"}
              </p>
            </div>

            {/* PRICE */}
            <div className="text-right text-sm">
              <p>{formatPrice(price, product.currency)}</p>

              {product.compareAtPrice && (
                <p
                  className="
                    mt-1
                    text-[#161310]/35
                    line-through
                  "
                >
                  {formatPrice(product.compareAtPrice, product.currency)}
                </p>
              )}
            </div>
          </div>

          {/* COLORS */}
          {colors.length > 0 && (
            <div className="mt-4 flex items-center gap-2">
              {colors.map((variant) => (
                <span
                  key={variant.id}
                  title={variant.color || variant.name}
                  className="
                    h-3
                    w-3
                    border
                    border-[#161310]/20
                  "
                  style={{
                    backgroundColor: variant.colorHex || "#d8d1c7",
                  }}
                />
              ))}

              {product.variants.length > colors.length && (
                <span
                  className="
                    ml-1
                    text-xs
                    text-[#161310]/35
                  "
                >
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
