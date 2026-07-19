// components/shop/ProductDetailsClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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

type GalleryImage = ProductImage & {
  imageType: "variant" | "lifestyle";
};

function uniqueValues(values: Array<string | null | undefined>) {
  return Array.from(
    new Set(
      values
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  );
}

function formatDescription(description: string) {
  return description
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default function ProductDetailsClient({
  product,
}: {
  product: ProductDetailsType;
}) {
  const { addItem } = useCart();

  const description = product.description?.trim() || "";

  const hasPlugTypes = product.variants.some((variant) => variant.plugType);

  const colors = useMemo(() => {
    return uniqueValues(product.variants.map((variant) => variant.color));
  }, [product.variants]);

  const plugTypes = useMemo(() => {
    return uniqueValues(product.variants.map((variant) => variant.plugType));
  }, [product.variants]);

  const firstVariant = product.variants[0];

  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    firstVariant?.color || undefined,
  );

  const [selectedPlugType, setSelectedPlugType] = useState<string | undefined>(
    firstVariant?.plugType || undefined,
  );

  const [selectedImageId, setSelectedImageId] = useState<string | undefined>();
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const selectedVariant = useMemo(() => {
    if (!product.variants.length) return undefined;

    if (hasPlugTypes) {
      return (
        product.variants.find((variant) => {
          const colorMatches = selectedColor
            ? variant.color === selectedColor
            : true;

          const plugMatches = selectedPlugType
            ? variant.plugType === selectedPlugType
            : !variant.plugType;

          return colorMatches && plugMatches;
        }) || product.variants[0]
      );
    }

    return (
      product.variants.find((variant) => {
        if (colors.length > 0) {
          return variant.color === selectedColor;
        }

        return variant.id === firstVariant?.id;
      }) || product.variants[0]
    );
  }, [
    product.variants,
    hasPlugTypes,
    selectedColor,
    selectedPlugType,
    colors.length,
    firstVariant?.id,
  ]);

  const galleryImages = useMemo<GalleryImage[]>(() => {
    const variantImages =
      selectedVariant?.images.map((image) => ({
        ...image,
        imageType: "variant" as const,
      })) || [];

    const lifestyleImages = product.images.map((image) => ({
      ...image,
      imageType: "lifestyle" as const,
    }));

    return [...variantImages, ...lifestyleImages];
  }, [selectedVariant, product.images]);

  useEffect(() => {
    if (galleryImages.length === 0) return;

    setSelectedImageId((currentId) => {
      const currentStillExists = galleryImages.some(
        (image) => image.id === currentId,
      );

      if (currentId && currentStillExists) {
        return currentId;
      }

      return galleryImages[0].id;
    });
  }, [galleryImages]);

  const selectedImage =
    galleryImages.find((image) => image.id === selectedImageId) ||
    galleryImages[0];

  function showPreviousImage() {
    if (galleryImages.length <= 1 || !selectedImage) return;

    const currentIndex = galleryImages.findIndex(
      (image) => image.id === selectedImage.id,
    );

    const previousImage =
      galleryImages[
        (currentIndex - 1 + galleryImages.length) % galleryImages.length
      ];

    if (previousImage) {
      setSelectedImageId(previousImage.id);
    }
  }

  function showNextImage() {
    if (galleryImages.length <= 1 || !selectedImage) return;

    const currentIndex = galleryImages.findIndex(
      (image) => image.id === selectedImage.id,
    );

    const nextImage = galleryImages[(currentIndex + 1) % galleryImages.length];

    if (nextImage) {
      setSelectedImageId(nextImage.id);
    }
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    setTouchStartX(event.touches[0].clientX);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      showNextImage();
    }

    if (distance < -minSwipeDistance) {
      showPreviousImage();
    }

    setTouchStartX(null);
  }

  useEffect(() => {
    if (!fullscreenOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setFullscreenOpen(false);
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fullscreenOpen, galleryImages, selectedImage]);

  const price = selectedVariant?.price || product.price;
  const inStock = selectedVariant ? selectedVariant.stock > 0 : false;

  function colorIsAvailable(color: string) {
    return product.variants.some((variant) => {
      const colorMatches = variant.color === color;
      const plugMatches = hasPlugTypes
        ? selectedPlugType
          ? variant.plugType === selectedPlugType
          : true
        : true;

      return colorMatches && plugMatches && variant.stock > 0;
    });
  }

  function plugIsAvailable(plugType: string) {
    return product.variants.some((variant) => {
      const plugMatches = variant.plugType === plugType;
      const colorMatches = selectedColor
        ? variant.color === selectedColor
        : true;

      return plugMatches && colorMatches && variant.stock > 0;
    });
  }

  function handleColorChange(color: string) {
    setSelectedColor(color);

    if (hasPlugTypes) {
      const matchingVariant =
        product.variants.find(
          (variant) =>
            variant.color === color && variant.plugType === selectedPlugType,
        ) ||
        product.variants.find(
          (variant) => variant.color === color && variant.stock > 0,
        ) ||
        product.variants.find((variant) => variant.color === color);

      setSelectedPlugType(matchingVariant?.plugType || undefined);
      setSelectedImageId(
        matchingVariant?.images[0]?.id || product.images[0]?.id,
      );
      return;
    }

    const matchingVariant =
      product.variants.find(
        (variant) => variant.color === color && variant.stock > 0,
      ) || product.variants.find((variant) => variant.color === color);

    setSelectedImageId(matchingVariant?.images[0]?.id || product.images[0]?.id);
  }

  function handlePlugChange(plugType: string) {
    setSelectedPlugType(plugType);

    const matchingVariant =
      product.variants.find(
        (variant) =>
          variant.plugType === plugType &&
          (!selectedColor || variant.color === selectedColor) &&
          variant.stock > 0,
      ) ||
      product.variants.find(
        (variant) =>
          variant.plugType === plugType &&
          (!selectedColor || variant.color === selectedColor),
      );

    if (matchingVariant?.color) {
      setSelectedColor(matchingVariant.color);
    }

    setSelectedImageId(matchingVariant?.images[0]?.id || product.images[0]?.id);
  }

  function handleAddToCart() {
    if (!selectedVariant || !inStock) return;

    const cartImage =
      selectedVariant.images[0]?.url || selectedImage?.url || null;

    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      title: product.title,
      slug: product.slug,
      variantName: selectedVariant.name,
      color: selectedVariant.color,
      image: cartImage,
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
          <span className="h-px w-10 bg-[#161310]/80" />
          Back to shop
        </Link>
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        <section className="min-w-0 lg:col-span-7">
          <button
            type="button"
            onClick={() => selectedImage && setFullscreenOpen(true)}
            disabled={!selectedImage}
            className="relative aspect-[4/5] w-full overflow-hidden bg-[#f4f3f0] text-left disabled:cursor-default"
            aria-label="Open product image fullscreen"
          >
            {selectedImage ? (
              <>
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.alt || product.title}
                  fill
                  priority
                  quality={75}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />

                <span className="absolute bottom-4 right-4 bg-[#ecebeb]/90 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#161310]/60">
                  View fullscreen
                </span>
              </>
            ) : (
              <div className="flex h-full items-center justify-center px-8 text-center text-sm leading-[1.7] text-[#161310]/40">
                Add product images to this variant in admin.
              </div>
            )}
          </button>

          {galleryImages.length > 1 && (
            <div className="no-scrollbar mt-5 w-full min-w-0 overflow-x-auto">
              <div className="flex w-max gap-3 pb-3">
                {galleryImages.map((image, index) => {
                  const active = selectedImage?.id === image.id;

                  return (
                    <button
                      key={`${image.imageType}-${image.id}`}
                      type="button"
                      onClick={() => setSelectedImageId(image.id)}
                      className={`relative h-24 w-20 shrink-0 overflow-hidden bg-[#f4f3f0] transition md:h-28 md:w-24 ${
                        active ? "opacity-100" : "opacity-45 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || product.title}
                        fill
                        quality={60}
                        sizes="120px"
                        className="object-cover"
                      />

                      <span className="absolute bottom-0 left-0 right-0 bg-[#ecebeb]/85 px-1.5 py-1 text-center text-[10px] uppercase tracking-[0.14em] text-[#161310]/55">
                        {image.imageType === "lifestyle"
                          ? "Room"
                          : String(index + 1).padStart(2, "0")}
                      </span>

                      {active && (
                        <span className="absolute bottom-0 left-0 h-px w-full bg-[#161310]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        <section className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
              {product.category.name}
            </p>

            <h1 className="mt-5 max-w-2xl text-[14vw] font-semibold leading-[0.95] tracking-[-0.035em] md:text-[7vw] lg:text-[5.2vw]">
              {product.title}
            </h1>

            <div className="mt-8 flex items-baseline gap-4">
              <p className="text-4xl font-light tracking-[-0.05em] md:text-5xl">
                {formatPrice(price, product.currency)}
              </p>

              {product.compareAtPrice && (
                <p className="text-xl text-[#161310]/35 line-through md:text-2xl">
                  {formatPrice(product.compareAtPrice, product.currency)}
                </p>
              )}
            </div>

            <ProductDescription
              description={description}
              open={descriptionOpen}
              onToggle={() => setDescriptionOpen((current) => !current)}
            />

            <ProductSpecs
              specs={product.specs}
              open={specsOpen}
              onToggle={() => setSpecsOpen((current) => !current)}
            />

            {colors.length > 0 && (
              <div className="mt-10 border-t border-[#161310]/15 pt-8">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-sm text-[#161310]/45">Color</p>
                  {selectedColor && <p className="text-sm">{selectedColor}</p>}
                </div>

                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => {
                    const active = selectedColor === color;
                    const available = colorIsAvailable(color);

                    const colorHex =
                      product.variants.find(
                        (variant) =>
                          variant.color === color && variant.colorHex,
                      )?.colorHex || "#d8d1c7";

                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleColorChange(color)}
                        disabled={!available}
                        className={`flex items-center gap-3 border px-4 py-3 text-sm transition disabled:cursor-not-allowed disabled:opacity-35 ${
                          active
                            ? "border-[#161310]"
                            : "border-[#161310]/15 hover:border-[#161310]/40"
                        }`}
                      >
                        <span
                          className="h-4 w-4 border border-[#161310]/20"
                          style={{ backgroundColor: colorHex }}
                        />
                        <span>{color}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {hasPlugTypes && plugTypes.length > 0 && (
              <div className="mt-8 border-t border-[#161310]/15 pt-8">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-sm text-[#161310]/45">Plug type</p>
                  {selectedPlugType && (
                    <p className="text-sm">{selectedPlugType} Plug</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {plugTypes.map((plugType) => {
                    const active = selectedPlugType === plugType;
                    const available = plugIsAvailable(plugType);

                    return (
                      <button
                        key={plugType}
                        type="button"
                        onClick={() => handlePlugChange(plugType)}
                        disabled={!available}
                        className={`border px-4 py-3 text-sm transition disabled:cursor-not-allowed disabled:opacity-35 ${
                          active
                            ? "border-[#161310]"
                            : "border-[#161310]/15 hover:border-[#161310]/40"
                        }`}
                      >
                        {plugType} Plug
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
              <InfoBlock title="Shipping" text="Free tracked shipping" />
              <InfoBlock title="Payment" text="Secure checkout" />
              <InfoBlock title="Returns" text="30-day returns" />
              <InfoBlock title="Support" text="Email support" />
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
              everyday use. Each available variant may differ in finish, color,
              plug type and supplier details.
            </p>
          </div>
        </div>
      </section>

      {fullscreenOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-[#161310]/95 text-[#ecebeb]"
          role="dialog"
          aria-modal="true"
          aria-label="Product image fullscreen view"
        >
          <button
            type="button"
            onClick={() => setFullscreenOpen(false)}
            className="absolute right-5 top-5 z-20 px-4 py-3 text-sm uppercase tracking-[0.18em] text-[#ecebeb]/70 transition hover:text-[#ecebeb]"
          >
            Close
          </button>

          {galleryImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPreviousImage}
                className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 px-5 py-5 text-4xl font-light text-[#ecebeb]/60 transition hover:text-[#ecebeb] md:block"
                aria-label="Previous image"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={showNextImage}
                className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 px-5 py-5 text-4xl font-light text-[#ecebeb]/60 transition hover:text-[#ecebeb] md:block"
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}

          <div
            className="flex h-full w-full touch-pan-y items-center justify-center px-6 py-20 md:px-16"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative h-full w-full">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt || product.title}
                fill
                quality={85}
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {galleryImages.length > 1 && (
            <div className="absolute bottom-5 left-1/2 z-20 w-full max-w-4xl -translate-x-1/2 px-6">
              <div className="no-scrollbar overflow-x-auto">
                <div className="mx-auto flex w-max gap-3">
                  {galleryImages.map((image, index) => {
                    const active = selectedImage.id === image.id;

                    return (
                      <button
                        key={`fullscreen-${image.imageType}-${image.id}`}
                        type="button"
                        onClick={() => setSelectedImageId(image.id)}
                        className={`relative h-16 w-14 shrink-0 overflow-hidden bg-[#f4f3f0] transition md:h-20 md:w-16 ${
                          active
                            ? "opacity-100"
                            : "opacity-40 hover:opacity-100"
                        }`}
                        aria-label={`View image ${index + 1}`}
                      >
                        <Image
                          src={image.url}
                          alt={image.alt || product.title}
                          fill
                          quality={60}
                          sizes="80px"
                          className="object-cover"
                        />

                        {active && (
                          <span className="absolute bottom-0 left-0 h-px w-full bg-[#ecebeb]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

function ProductDescription({
  description,
  open,
  onToggle,
}: {
  description: string;
  open: boolean;
  onToggle: () => void;
}) {
  const paragraphs = useMemo(() => {
    return formatDescription(description);
  }, [description]);

  const hasDescription = paragraphs.length > 0;
  const shouldCollapse = description.length > 220 || paragraphs.length > 1;

  if (!hasDescription) {
    return (
      <div className="mt-10 max-w-md border-t border-[#161310]/15 pt-8">
        <p className="text-sm text-[#161310]/45">Description</p>
        <p className="mt-4 text-sm leading-[1.8] text-[#161310]/45">
          No product description available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-md border-t border-[#161310]/15 pt-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm text-[#161310]/45">Description</p>
      </div>

      <div
        className={`relative overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          shouldCollapse && !open ? "max-h-28" : "max-h-[900px]"
        }`}
      >
        <div className="space-y-3">
          {paragraphs.map((paragraph, index) => (
            <p
              key={`${paragraph.slice(0, 20)}-${index}`}
              className="whitespace-pre-line text-sm leading-[1.75] text-[#161310]/60 md:text-base md:leading-[1.85]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {shouldCollapse && !open && (
          <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-[#ecebeb] to-transparent" />
        )}
      </div>

      {shouldCollapse && (
        <button
          type="button"
          onClick={onToggle}
          className="mt-4 inline-flex items-center gap-3 text-sm text-[#161310] transition hover:opacity-60"
          aria-expanded={open}
        >
          <span>{open ? "Hide description" : "View full description"}</span>
          <span className="h-px w-8 bg-[#161310]/40" />
        </button>
      )}
    </div>
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

function parseSpecs(specs?: string | null) {
  if (!specs) return [];

  return specs
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split(":");

      if (!rest.length) {
        return {
          label: line,
          value: "",
        };
      }

      return {
        label: label.trim(),
        value: rest.join(":").trim(),
      };
    });
}

function ProductSpecs({
  specs,
  open,
  onToggle,
}: {
  specs?: string | null;
  open: boolean;
  onToggle: () => void;
}) {
  const items = parseSpecs(specs);

  if (items.length === 0) return null;

  const shouldCollapse = items.length > 3;

  return (
    <div className="mt-10 border-t border-[#161310]/15 pt-8">
      <p className="mb-5 text-sm text-[#161310]/45">Product specs</p>

      <div
        className={`relative overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          shouldCollapse && !open ? "max-h-[92px]" : "max-h-[1200px]"
        }`}
      >
        <div className="divide-y divide-[#161310]/10 border-y border-[#161310]/10">
          {items.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="grid grid-cols-[1fr_1.3fr] gap-6 py-3 text-sm"
            >
              <p className="text-[#161310]/45">{item.label}</p>
              <p className="break-words">{item.value || "—"}</p>
            </div>
          ))}
        </div>

        {shouldCollapse && !open && (
          <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-full bg-gradient-to-t from-[#ecebeb] to-transparent" />
        )}
      </div>

      {shouldCollapse && (
        <button
          type="button"
          onClick={onToggle}
          className="mt-4 inline-flex items-center gap-3 text-sm text-[#161310] transition hover:opacity-60"
          aria-expanded={open}
        >
          <span>{open ? "Hide specs" : "View full specs"}</span>
          <span className="h-px w-8 bg-[#161310]/40" />
        </button>
      )}
    </div>
  );
}
