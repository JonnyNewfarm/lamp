// lib/actions/category.actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify"
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  const name = String(formData.get("name") || "").trim();

  if (!name) {
    throw new Error("Category name is required");
  }

  await prisma.category.create({
    data: {
      name,
      slug: slugify(name),
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products/new");
  revalidatePath("/shop");
}

export async function deleteCategory(categoryId: string) {
  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products/new");
  revalidatePath("/shop");
}