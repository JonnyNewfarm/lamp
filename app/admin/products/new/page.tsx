// app/admin/products/new/page.tsx
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-[#ecebeb] px-6 py-24 text-[#161310] md:px-12">
      {categories.length === 0 ? (
        <div className="mx-auto max-w-3xl border border-[#161310]/15 p-8">
          <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
            Missing categories
          </p>

          <h1 className="mt-4 text-5xl font-light tracking-[-0.07em]">
            Create a category first.
          </h1>

          <p className="mt-6 max-w-lg leading-[1.7] text-[#161310]/60">
            Products need a category before they can be created.
          </p>

          <Link
            href="/admin/categories"
            className="mt-8 inline-block bg-[#161310] px-6 py-4 text-sm text-[#ecebeb]"
          >
            Go to categories
          </Link>
        </div>
      ) : (
        <ProductForm categories={categories} />
      )}
    </main>
  );
}
