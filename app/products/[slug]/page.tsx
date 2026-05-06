// app/products/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetailsClient from "@/components/shop/ProductDetailsClient";
import RelatedProducts from "@/components/shop/RelatedProducts";
import ScrollSection from "@/components/SmoothScroll";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
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
  });

  if (!product || product.status !== "ACTIVE") {
    notFound();
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      id: {
        not: product.id,
      },
      categoryId: product.categoryId,
    },
    include: {
      category: true,
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
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });

  return (
    <>
      <ScrollSection>
        <ProductDetailsClient product={product} />
        <RelatedProducts products={relatedProducts} />
      </ScrollSection>
    </>
  );
}
