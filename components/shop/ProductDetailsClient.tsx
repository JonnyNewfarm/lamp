// components/shop/ProductDetailsClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/components/cart/CartProvider";
import type {
  Category,
  Product,
  ProductImage,
  ProductVariant,
} from "@/prisma/generated/prisma/client";

type ProductDetailsType = Product & {
  category: Category;
  images: ProductImage[];
  variants: Array<ProductVariant & { images: ProductImage[] }>;
};

export default function ProductDetailsClient({
  product,
}: {
  product: ProductDetailsType;
}) {
  const { addItem } = useCart();

  const initialVariant = product.variants[0];

  const [selectedVariantId, setSelectedVariantId] = useState<
    string | undefined
  >(initialVariant?.id);

  const selectedVariant = useMemo(() => {
    return (
      product.variants.find((variant) => variant.id === selectedVariantId) ||
      product.variants[0]
    );
  }, [product.variants, selectedVariantId]);

  const activeImages =
    selectedVariant?.images.length > 0
      ? selectedVariant.images
      : product.images;

  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined>(
    activeImages[0]?.url,
  );

  const selectedImage =
    activeImages.find((image) => image.url === selectedImageUrl) ||
    activeImages[0];

  const price = selectedVariant?.price || product.price;
  const inStock = selectedVariant ? selectedVariant.stock > 0 : false;

  function handleVariantChange(variantId: string) {
    const variant = product.variants.find((item) => item.id === variantId);

    setSelectedVariantId(variantId);

    const nextImage =
      variant && variant.images.length > 0
        ? variant.images[0]
        : product.images[0];

    setSelectedImageUrl(nextImage?.url);
  }

  function handleAddToCart() {
    if (!selectedVariant || !inStock) return;

    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      title: product.title,
      slug: product.slug,
      variantName: selectedVariant.name,
      color: selectedVariant.color,
      image: selectedImage?.url || null,
      price,
      currency: product.currency,
      quantity: 1,
      stock: selectedVariant.stock,
    });
  }

  return (
    <main className="min-h-screen bg-[#ecebeb] px-6 py-24 text-[#161310] md:px-12">
      <div className="mb-10">
        <Link
          href="/shop"
          className="inline-flex items-center gap-4 text-sm text-[#161310]/55 transition hover:text-[#161310]"
        >
          <span className="h-px w-10 bg-[#161310]/40" />
          Back to shop
        </Link>
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f3f0]">
            {selectedImage ? (
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt || product.title}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-contain p-8 md:p-14"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-[#161310]/40">
                No image
              </div>
            )}
          </div>

          {activeImages.length > 1 && (
            <div className="mt-5 grid grid-cols-4 gap-3 md:grid-cols-6">
              {activeImages.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImageUrl(image.url)}
                  className={`relative aspect-square overflow-hidden bg-[#f4f3f0] transition ${
                    selectedImage?.id === image.id
                      ? "outline outline-1 outline-[#161310]"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || product.title}
                    fill
                    sizes="120px"
                    className="object-contain p-3"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
              {product.category.name}
            </p>

            <h1 className="mt-5 max-w-2xl text-[14vw] font-light leading-[0.86] tracking-[-0.085em] md:text-[7vw] lg:text-[5.2vw]">
              {product.title}
            </h1>

            <div className="mt-8 flex items-center gap-4">
              <p className="text-2xl font-light tracking-[-0.04em]">
                {formatPrice(price, product.currency)}
              </p>

              {product.compareAtPrice && (
                <p className="text-lg text-[#161310]/35 line-through">
                  {formatPrice(product.compareAtPrice, product.currency)}
                </p>
              )}
            </div>

            <p className="mt-8 max-w-md text-base leading-[1.8] text-[#161310]/60">
              {product.description}
            </p>

            {product.variants.length > 0 && (
              <div className="mt-10 border-t border-[#161310]/15 pt-8">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-sm text-[#161310]/45">Variant</p>

                  {selectedVariant?.color && (
                    <p className="text-sm">{selectedVariant.color}</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => {
                    const selected = selectedVariant?.id === variant.id;
                    const disabled = variant.stock <= 0;

                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => handleVariantChange(variant.id)}
                        disabled={disabled}
                        className={`flex items-center gap-3 border px-4 py-3 text-sm transition disabled:cursor-not-allowed disabled:opacity-35 ${
                          selected
                            ? "border-[#161310]"
                            : "border-[#161310]/15 hover:border-[#161310]/40"
                        }`}
                      >
                        {variant.colorHex && (
                          <span
                            className="h-4 w-4 border border-[#161310]/20"
                            style={{ backgroundColor: variant.colorHex }}
                          />
                        )}

                        <span>{variant.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-8 border-t border-[#161310]/15 pt-8">
              <div className="flex items-center justify-between text-sm">
                <p className="text-[#161310]/45">Availability</p>

                {selectedVariant ? (
                  <p>
                    {inStock
                      ? `${selectedVariant.stock} in stock`
                      : "Out of stock"}
                  </p>
                ) : (
                  <p>Unavailable</p>
                )}
              </div>

              {selectedVariant?.sku && (
                <div className="mt-4 flex items-center justify-between text-sm">
                  <p className="text-[#161310]/45">SKU</p>
                  <p>{selectedVariant.sku}</p>
                </div>
              )}
            </div>

            <button
              type="button"
              disabled={!inStock}
              onClick={handleAddToCart}
              className="mt-8 w-full bg-[#161310] px-8 py-5 text-sm text-[#ecebeb] transition hover:bg-[#2a261f] disabled:cursor-not-allowed disabled:opacity-35"
            >
              {inStock ? "Add to cart" : "Out of stock"}
            </button>

            <button
              type="button"
              disabled={!inStock}
              onClick={handleAddToCart}
              className="mt-3 w-full border border-[#161310]/20 px-8 py-5 text-sm transition hover:border-[#161310] disabled:cursor-not-allowed disabled:opacity-35"
            >
              Buy now
            </button>

            <div className="mt-10 grid grid-cols-2 gap-px bg-[#161310]/15 text-sm">
              <InfoBlock title="Shipping" text="Calculated at checkout" />
              <InfoBlock title="Payment" text="Secure checkout" />
              <InfoBlock title="Returns" text="Simple return flow" />
              <InfoBlock title="Support" text="Order help available" />
            </div>
          </div>
        </section>
      </div>

      <section className="mt-24 border-t border-[#161310]/15 pt-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
              Details
            </p>
          </div>

          <div className="md:col-span-8">
            <h2 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.07em] md:text-7xl">
              A quiet object for everyday atmosphere.
            </h2>

            <p className="mt-8 max-w-2xl leading-[1.8] text-[#161310]/60">
              Selected by Calero Studio for soft interiors, calm lighting and
              everyday use. Each available variant may differ in finish, color
              and supplier details.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-[#ecebeb] p-5">
      <p>{title}</p>
      <p className="mt-2 text-[#161310]/45">{text}</p>
    </div>
  );
}
