// lib/actions/product.actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { ProductStatus } from "@/prisma/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ImageInput = {
  url: string;
  alt?: string;
};

type VariantInput = {
  name: string;
  color?: string;
  colorHex?: string;
  price?: number | null;
  stock: number;
  sku?: string;
  images: ImageInput[];
};

function parseMoneyToCents(value: FormDataEntryValue | null) {
  if (!value) return 0;

  const numberValue = Number(String(value).replace(",", "."));

  if (Number.isNaN(numberValue)) return 0;

  return Math.round(numberValue * 100);
}

function parseOptionalMoneyToCents(value: FormDataEntryValue | null) {
  if (!value) return null;

  const stringValue = String(value).trim();

  if (!stringValue) return null;

  const numberValue = Number(stringValue.replace(",", "."));

  if (Number.isNaN(numberValue)) return null;

  return Math.round(numberValue * 100);
}

function parseVariants(formData: FormData): VariantInput[] {
  const raw = formData.get("variants");

  if (!raw || typeof raw !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as VariantInput[];

    return parsed
      .filter((variant) => variant.name.trim().length > 0)
      .map((variant) => ({
        ...variant,
        stock: Number(variant.stock || 0),
        price: variant.price ? Number(variant.price) : null,
        images: variant.images.filter((image) => image.url.trim().length > 0),
      }));
  } catch {
    return [];
  }
}

function parseProductImages(formData: FormData): ImageInput[] {
  const raw = formData.get("productImages");

  if (!raw || typeof raw !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as ImageInput[];

    return parsed.filter((image) => image.url.trim().length > 0);
  } catch {
    return [];
  }
}

async function createUniqueSlug(title: string, productId?: string) {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.product.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing || existing.id === productId) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

export async function createProduct(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const categoryId = String(formData.get("categoryId") || "");
  const status = String(formData.get("status") || "DRAFT") as ProductStatus;
  const featured = formData.get("featured") === "on";
  const supplierUrl = String(formData.get("supplierUrl") || "").trim();

  const price = parseMoneyToCents(formData.get("price"));
  const compareAtPrice = parseOptionalMoneyToCents(
    formData.get("compareAtPrice"),
  );

  const variants = parseVariants(formData);
  const productImages = parseProductImages(formData);

  if (!title || !description || !categoryId || !price) {
    throw new Error("Missing required product fields");
  }

  const slug = await createUniqueSlug(title);

  const product = await prisma.product.create({
    data: {
      title,
      slug,
      description,
      categoryId,
      status,
      featured,
      price,
      compareAtPrice,
      supplierUrl: supplierUrl || null,
    },
  });

  for (let index = 0; index < productImages.length; index++) {
    const image = productImages[index];

    await prisma.productImage.create({
      data: {
        productId: product.id,
        variantId: null,
        url: image.url,
        alt: image.alt || `${product.title} lifestyle image`,
        order: index,
      },
    });
  }

  for (const variant of variants) {
    const createdVariant = await prisma.productVariant.create({
      data: {
        productId: product.id,
        name: variant.name,
        color: variant.color || null,
        colorHex: variant.colorHex || null,
        price: variant.price,
        stock: variant.stock || 0,
        sku: variant.sku || null,
      },
    });

    for (let index = 0; index < variant.images.length; index++) {
      const image = variant.images[index];

      await prisma.productImage.create({
        data: {
          productId: product.id,
          variantId: createdVariant.id,
          url: image.url,
          alt: image.alt || `${product.title} ${variant.name}`,
          order: index,
        },
      });
    }
  }

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");

  redirect("/admin/products");
}

export async function updateProduct(productId: string, formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const categoryId = String(formData.get("categoryId") || "");
  const status = String(formData.get("status") || "DRAFT") as ProductStatus;
  const featured = formData.get("featured") === "on";
  const supplierUrl = String(formData.get("supplierUrl") || "").trim();

  const price = parseMoneyToCents(formData.get("price"));
  const compareAtPrice = parseOptionalMoneyToCents(
    formData.get("compareAtPrice"),
  );

  const variants = parseVariants(formData);
  const productImages = parseProductImages(formData);

  if (!title || !description || !categoryId || !price) {
    throw new Error("Missing required product fields");
  }

  const slug = await createUniqueSlug(title, productId);

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      title,
      slug,
      description,
      categoryId,
      status,
      featured,
      price,
      compareAtPrice,
      supplierUrl: supplierUrl || null,
    },
  });

  await prisma.productImage.deleteMany({
    where: {
      productId,
    },
  });

  await prisma.productVariant.deleteMany({
    where: {
      productId,
    },
  });

  for (let index = 0; index < productImages.length; index++) {
    const image = productImages[index];

    await prisma.productImage.create({
      data: {
        productId,
        variantId: null,
        url: image.url,
        alt: image.alt || `${title} lifestyle image`,
        order: index,
      },
    });
  }

  for (const variant of variants) {
    const createdVariant = await prisma.productVariant.create({
      data: {
        productId,
        name: variant.name,
        color: variant.color || null,
        colorHex: variant.colorHex || null,
        price: variant.price,
        stock: variant.stock || 0,
        sku: variant.sku || null,
      },
    });

    for (let index = 0; index < variant.images.length; index++) {
      const image = variant.images[index];

      await prisma.productImage.create({
        data: {
          productId,
          variantId: createdVariant.id,
          url: image.url,
          alt: image.alt || `${title} ${variant.name}`,
          order: index,
        },
      });
    }
  }

  revalidatePath("/admin/products");
  revalidatePath(`/products/${slug}`);
  revalidatePath("/shop");
  revalidatePath("/");

  redirect("/admin/products");
}

export async function deleteProduct(productId: string) {
  await prisma.productImage.deleteMany({
    where: {
      productId,
    },
  });

  await prisma.productVariant.deleteMany({
    where: {
      productId,
    },
  });

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");
}