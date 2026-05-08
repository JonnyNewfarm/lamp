// components/NewProducts.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/shop/ProductCard";

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
        <div className="mb-14 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="mb-5 text-xs uppercase tracking-[0.34em] text-[#161310]/45">
              New products
            </p>

            <h2 className="max-w-xl text-5xl font-light leading-[0.95] tracking-[-0.06em] md:text-7xl">
              Recently added lights.
            </h2>
          </div>

          <div className="flex items-end md:col-span-4 md:col-start-9">
            <div>
              <p className="max-w-sm text-base leading-[1.7] text-[#161310]/60">
                Explore the latest additions to Calero Studio — minimal lighting
                selected for calm interiors and everyday atmosphere.
              </p>

              <Link
                href="/shop"
                className="group mt-8 inline-flex items-center gap-4 text-sm"
              >
                View all products
                <span className="h-px w-12 bg-[#161310] transition-all duration-500 group-hover:w-20" />
              </Link>
            </div>
          </div>
        </div>
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
