import { prisma } from "@/lib/prisma";
import NewProductsIntro from "@/components/NewProductsIntro";
import NewProductsScroll from "@/components/NewProductsScroll";

export default async function NewProducts() {
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
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
    take: 6,
  });

  if (products.length === 0) {
    return null;
  }

  return (
    <section
      id="new-products"
      className="overflow-hidden bg-[#ecebeb] py-20 text-[#161310] md:py-28"
    >
      <div className="px-6 md:px-12">
        <NewProductsIntro />
      </div>

      <NewProductsScroll products={products} />
    </section>
  );
}
