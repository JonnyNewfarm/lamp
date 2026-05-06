// app/admin/products/[id]/edit/page.tsx
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        images: {
          where: {
            variantId: null,
          },
          orderBy: {
            order: "asc",
          },
        },
        variants: {
          include: {
            images: {
              orderBy: {
                order: "asc",
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    }),

    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#ecebeb] px-6 py-24 text-[#161310] md:px-12">
      <ProductForm categories={categories} product={product} />
    </main>
  );
}
