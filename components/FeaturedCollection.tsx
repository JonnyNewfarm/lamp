// components/NewProducts.tsx
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/shop/ProductCard";
import NewProductsIntro from "@/components/NewProductsIntro";

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

      <div className="no-scrollbar overflow-x-auto px-6 md:px-12">
        <div className="flex w-max gap-5 pb-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[78vw] shrink-0 sm:w-[420px] md:w-[360px] xl:w-[390px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
