// components/admin/ProductForm.tsx
"use client";

import type {
  Category,
  Product,
  ProductImage,
  ProductVariant,
} from "@/prisma/generated/prisma/client";
import { useMemo, useState } from "react";
import { createProduct, updateProduct } from "@/lib/actions/product.actions";
import ImageUploadField from "@/components/admin/ImageUploadField";

type ProductWithVariants = Product & {
  images: ProductImage[];
  variants: Array<ProductVariant & { images: ProductImage[] }>;
};

type ImageState = {
  url: string;
  alt: string;
};

type VariantState = {
  name: string;
  color: string;
  colorHex: string;
  price: string;
  stock: string;
  sku: string;
  images: ImageState[];
};

export default function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: ProductWithVariants;
}) {
  const [productImages, setProductImages] = useState<ImageState[]>(() => {
    if (product?.images?.length) {
      return product.images.map((image) => ({
        url: image.url,
        alt: image.alt || "",
      }));
    }

    return [{ url: "", alt: "" }];
  });

  const [variants, setVariants] = useState<VariantState[]>(() => {
    if (product?.variants?.length) {
      return product.variants.map((variant) => ({
        name: variant.name,
        color: variant.color || "",
        colorHex: variant.colorHex || "",
        price: variant.price ? String(variant.price / 100) : "",
        stock: String(variant.stock),
        sku: variant.sku || "",
        images: variant.images.length
          ? variant.images.map((image) => ({
              url: image.url,
              alt: image.alt || "",
            }))
          : [{ url: "", alt: "" }],
      }));
    }

    return [
      {
        name: "Default",
        color: "",
        colorHex: "",
        price: "",
        stock: "0",
        sku: "",
        images: [{ url: "", alt: "" }],
      },
    ];
  });

  const serializedProductImages = useMemo(() => {
    return JSON.stringify(
      productImages.filter((image) => image.url.trim().length > 0),
    );
  }, [productImages]);

  const serializedVariants = useMemo(() => {
    return JSON.stringify(
      variants.map((variant) => ({
        name: variant.name,
        color: variant.color,
        colorHex: variant.colorHex,
        price: variant.price
          ? Math.round(Number(variant.price.replace(",", ".")) * 100)
          : null,
        stock: variant.stock ? Number(variant.stock) : 0,
        sku: variant.sku,
        images: variant.images.filter((image) => image.url.trim().length > 0),
      })),
    );
  }, [variants]);

  const action = product ? updateProduct.bind(null, product.id) : createProduct;

  function updateProductImage(
    imageIndex: number,
    key: "url" | "alt",
    value: string,
  ) {
    setProductImages((current) =>
      current.map((image, index) =>
        index === imageIndex ? { ...image, [key]: value } : image,
      ),
    );
  }

  function addProductImage() {
    setProductImages((current) => [...current, { url: "", alt: "" }]);
  }

  function removeProductImage(imageIndex: number) {
    setProductImages((current) =>
      current.length > 1
        ? current.filter((_, index) => index !== imageIndex)
        : current,
    );
  }

  function updateVariant(
    index: number,
    key: keyof VariantState,
    value: string,
  ) {
    setVariants((current) =>
      current.map((variant, variantIndex) =>
        variantIndex === index ? { ...variant, [key]: value } : variant,
      ),
    );
  }

  function updateVariantImage(
    variantIndex: number,
    imageIndex: number,
    key: "url" | "alt",
    value: string,
  ) {
    setVariants((current) =>
      current.map((variant, currentVariantIndex) => {
        if (currentVariantIndex !== variantIndex) return variant;

        return {
          ...variant,
          images: variant.images.map((image, currentImageIndex) =>
            currentImageIndex === imageIndex
              ? { ...image, [key]: value }
              : image,
          ),
        };
      }),
    );
  }

  function addVariant() {
    setVariants((current) => [
      ...current,
      {
        name: "",
        color: "",
        colorHex: "",
        price: "",
        stock: "0",
        sku: "",
        images: [{ url: "", alt: "" }],
      },
    ]);
  }

  function removeVariant(index: number) {
    setVariants((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  function addVariantImage(variantIndex: number) {
    setVariants((current) =>
      current.map((variant, index) =>
        index === variantIndex
          ? {
              ...variant,
              images: [...variant.images, { url: "", alt: "" }],
            }
          : variant,
      ),
    );
  }

  function removeVariantImage(variantIndex: number, imageIndex: number) {
    setVariants((current) =>
      current.map((variant, index) => {
        if (index !== variantIndex) return variant;

        return {
          ...variant,
          images:
            variant.images.length > 1
              ? variant.images.filter((_, imgIndex) => imgIndex !== imageIndex)
              : variant.images,
        };
      }),
    );
  }

  return (
    <form action={action} className="mx-auto max-w-6xl">
      <input type="hidden" name="variants" value={serializedVariants} />
      <input
        type="hidden"
        name="productImages"
        value={serializedProductImages}
      />

      <div className="mb-12 border-b border-[#161310]/15 pb-8">
        <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
          Admin
        </p>

        <h1 className="mt-4 text-6xl font-light tracking-[-0.07em]">
          {product ? "Edit product" : "New product"}
        </h1>
      </div>

      <div className="grid gap-12 md:grid-cols-12">
        <div className="space-y-8 md:col-span-7">
          <Field label="Title">
            <input
              name="title"
              defaultValue={product?.title || ""}
              required
              placeholder="Aven Pendant Lamp"
              className="w-full border border-[#161310]/15 bg-transparent px-4 py-4 outline-none"
            />
          </Field>

          <Field label="Description">
            <textarea
              name="description"
              defaultValue={product?.description || ""}
              required
              rows={8}
              placeholder="Minimal pendant lamp for calm interiors..."
              className="w-full resize-none border border-[#161310]/15 bg-transparent px-4 py-4 outline-none"
            />
          </Field>

          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Price">
              <input
                name="price"
                type="number"
                step="0.01"
                defaultValue={product ? product.price / 100 : ""}
                required
                placeholder="79.00"
                className="w-full border border-[#161310]/15 bg-transparent px-4 py-4 outline-none"
              />
            </Field>

            <Field label="Compare at price">
              <input
                name="compareAtPrice"
                type="number"
                step="0.01"
                defaultValue={
                  product?.compareAtPrice ? product.compareAtPrice / 100 : ""
                }
                placeholder="99.00"
                className="w-full border border-[#161310]/15 bg-transparent px-4 py-4 outline-none"
              />
            </Field>
          </div>

          <Field label="Supplier URL">
            <input
              name="supplierUrl"
              defaultValue={product?.supplierUrl || ""}
              placeholder="Supplier link"
              className="w-full border border-[#161310]/15 bg-transparent px-4 py-4 outline-none"
            />
          </Field>
        </div>

        <div className="space-y-8 md:col-span-5">
          <Field label="Category">
            <select
              name="categoryId"
              defaultValue={product?.categoryId || ""}
              required
              className="w-full border border-[#161310]/15 bg-[#ecebeb] px-4 py-4 outline-none"
            >
              <option value="">Select category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Status">
            <select
              name="status"
              defaultValue={product?.status || "DRAFT"}
              className="w-full border border-[#161310]/15 bg-[#ecebeb] px-4 py-4 outline-none"
            >
              <option value="DRAFT">Draft</option>
              <option value="ACTIVE">Active</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </Field>

          <label className="flex items-center gap-3 border border-[#161310]/15 p-4 text-sm">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={product?.featured || false}
            />
            Featured product
          </label>

          <div className="border border-[#161310]/15 p-5 text-sm leading-[1.7] text-[#161310]/55">
            <p>
              Variant images should be clean product images. Product-level
              images should be lifestyle, mood or room images.
            </p>

            <p className="mt-3">
              The first image of the first variant is used in the shop grid.
            </p>
          </div>
        </div>
      </div>

      {/* Product-level / lifestyle images */}
      <div className="mt-16 border-t border-[#161310]/15 pt-10">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
              Product-level images
            </p>

            <h2 className="mt-3 text-4xl font-light tracking-[-0.06em]">
              Lifestyle and mood images
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-[1.8] text-[#161310]/55">
              These images are not tied to a variant. Use them for room shots,
              atmosphere images and lifestyle content.
            </p>
          </div>

          <button
            type="button"
            onClick={addProductImage}
            className="w-fit border border-[#161310]/20 px-5 py-3 text-sm"
          >
            Add lifestyle image
          </button>
        </div>

        <div className="space-y-6">
          {productImages.map((image, imageIndex) => (
            <div key={imageIndex} className="border border-[#161310]/15 p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-[#161310]/45">
                  Lifestyle image {imageIndex + 1}
                </p>

                <button
                  type="button"
                  onClick={() => removeProductImage(imageIndex)}
                  className="text-sm text-[#161310]/45 hover:text-[#161310]"
                >
                  Remove
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-[1fr_1fr]">
                <div className="space-y-4">
                  <input
                    value={image.url}
                    onChange={(event) =>
                      updateProductImage(imageIndex, "url", event.target.value)
                    }
                    placeholder="Lifestyle image URL"
                    className="w-full border border-[#161310]/15 bg-transparent px-4 py-4 outline-none"
                  />

                  <ImageUploadField
                    label="Upload lifestyle image"
                    value={image.url}
                    onChange={(url) =>
                      updateProductImage(imageIndex, "url", url)
                    }
                  />
                </div>

                <input
                  value={image.alt}
                  onChange={(event) =>
                    updateProductImage(imageIndex, "alt", event.target.value)
                  }
                  placeholder="Alt text"
                  className="h-fit w-full border border-[#161310]/15 bg-transparent px-4 py-4 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Variants */}
      <div className="mt-16 border-t border-[#161310]/15 pt-10">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
              Variants
            </p>

            <h2 className="mt-3 text-4xl font-light tracking-[-0.06em]">
              Colors, stock and product images
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-[1.8] text-[#161310]/55">
              Variant images should be clean product images. The first image of
              the first variant is used in the shop grid.
            </p>
          </div>

          <button
            type="button"
            onClick={addVariant}
            className="w-fit border border-[#161310]/20 px-5 py-3 text-sm"
          >
            Add variant
          </button>
        </div>

        <div className="space-y-8">
          {variants.map((variant, variantIndex) => (
            <div key={variantIndex} className="border border-[#161310]/15 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl tracking-[-0.04em]">
                  Variant {variantIndex + 1}
                </h3>

                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(variantIndex)}
                    className="text-sm text-[#161310]/45 hover:text-[#161310]"
                  >
                    Remove variant
                  </button>
                )}
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <Field label="Variant name">
                  <input
                    value={variant.name}
                    onChange={(event) =>
                      updateVariant(variantIndex, "name", event.target.value)
                    }
                    placeholder="Black / White / Beige"
                    className="w-full border border-[#161310]/15 bg-transparent px-4 py-4 outline-none"
                  />
                </Field>

                <Field label="Color">
                  <input
                    value={variant.color}
                    onChange={(event) =>
                      updateVariant(variantIndex, "color", event.target.value)
                    }
                    placeholder="Black"
                    className="w-full border border-[#161310]/15 bg-transparent px-4 py-4 outline-none"
                  />
                </Field>

                <Field label="Color hex">
                  <input
                    value={variant.colorHex}
                    onChange={(event) =>
                      updateVariant(
                        variantIndex,
                        "colorHex",
                        event.target.value,
                      )
                    }
                    placeholder="#161310"
                    className="w-full border border-[#161310]/15 bg-transparent px-4 py-4 outline-none"
                  />
                </Field>

                <Field label="Variant price">
                  <input
                    value={variant.price}
                    onChange={(event) =>
                      updateVariant(variantIndex, "price", event.target.value)
                    }
                    type="number"
                    step="0.01"
                    placeholder="Optional"
                    className="w-full border border-[#161310]/15 bg-transparent px-4 py-4 outline-none"
                  />
                </Field>

                <Field label="Stock">
                  <input
                    value={variant.stock}
                    onChange={(event) =>
                      updateVariant(variantIndex, "stock", event.target.value)
                    }
                    type="number"
                    className="w-full border border-[#161310]/15 bg-transparent px-4 py-4 outline-none"
                  />
                </Field>

                <Field label="SKU">
                  <input
                    value={variant.sku}
                    onChange={(event) =>
                      updateVariant(variantIndex, "sku", event.target.value)
                    }
                    placeholder="Optional"
                    className="w-full border border-[#161310]/15 bg-transparent px-4 py-4 outline-none"
                  />
                </Field>
              </div>

              <div className="mt-8 border-t border-[#161310]/15 pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-[#161310]/55">
                    Clean variant product images
                  </p>

                  <button
                    type="button"
                    onClick={() => addVariantImage(variantIndex)}
                    className="text-sm underline underline-offset-4"
                  >
                    Add image
                  </button>
                </div>

                <div className="space-y-6">
                  {variant.images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="border border-[#161310]/10 p-5"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm text-[#161310]/45">
                          Product image {imageIndex + 1}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            removeVariantImage(variantIndex, imageIndex)
                          }
                          className="text-sm text-[#161310]/45 hover:text-[#161310]"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid gap-5 md:grid-cols-[1fr_1fr]">
                        <div className="space-y-4">
                          <input
                            value={image.url}
                            onChange={(event) =>
                              updateVariantImage(
                                variantIndex,
                                imageIndex,
                                "url",
                                event.target.value,
                              )
                            }
                            placeholder="Clean product image URL"
                            className="w-full border border-[#161310]/15 bg-transparent px-4 py-4 outline-none"
                          />

                          <ImageUploadField
                            label="Upload product image"
                            value={image.url}
                            onChange={(url) =>
                              updateVariantImage(
                                variantIndex,
                                imageIndex,
                                "url",
                                url,
                              )
                            }
                          />
                        </div>

                        <input
                          value={image.alt}
                          onChange={(event) =>
                            updateVariantImage(
                              variantIndex,
                              imageIndex,
                              "alt",
                              event.target.value,
                            )
                          }
                          placeholder="Alt text"
                          className="h-fit w-full border border-[#161310]/15 bg-transparent px-4 py-4 outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="mt-12 bg-[#161310] px-8 py-4 text-sm text-[#ecebeb]">
        {product ? "Save changes" : "Create product"}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-sm text-[#161310]/55">{label}</span>
      {children}
    </label>
  );
}
