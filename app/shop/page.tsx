// app/shop/page.tsx
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/shop/ProductCard";
import ShopFilters from "@/components/shop/ShopFilters";
import MobileShopFilters from "@/components/shop/MobileShopFilters";
import Link from "next/link";

type ShopSearchParams = {
  category?: string;
  color?: string;
  sort?: string;
  availability?: string;
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<ShopSearchParams>;
}) {
  const params = await searchParams;

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const colorRows = await prisma.productVariant.findMany({
    where: {
      color: {
        not: null,
      },
      product: {
        status: "ACTIVE",
      },
    },
    select: {
      color: true,
    },
    distinct: ["color"],
    orderBy: {
      color: "asc",
    },
  });

  const colors = colorRows
    .map((row) => row.color)
    .filter((color): color is string => Boolean(color));

  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",

      category: params.category
        ? {
            slug: params.category,
          }
        : undefined,

      variants:
        params.color || params.availability === "in-stock"
          ? {
              some: {
                color: params.color
                  ? {
                      equals: params.color,
                      mode: "insensitive",
                    }
                  : undefined,

                stock:
                  params.availability === "in-stock"
                    ? {
                        gt: 0,
                      }
                    : undefined,
              },
            }
          : undefined,
    },

    include: {
      category: true,

      images: {
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

    orderBy:
      params.sort === "price-asc"
        ? {
            price: "asc",
          }
        : params.sort === "price-desc"
          ? {
              price: "desc",
            }
          : {
              createdAt: "desc",
            },
  });

  const hasActiveFilters =
    Boolean(params.category) ||
    Boolean(params.color) ||
    Boolean(params.availability) ||
    Boolean(params.sort && params.sort !== "newest");

  return (
    <main className="min-h-screen bg-[#ecebeb] px-6 py-24 text-[#161310] md:px-12">
      <section className="mb-12 border-b border-[#161310]/15 pb-10">
        <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
          Calero Studio
        </p>

        <h1 className="mt-4 max-w-5xl text-[17vw] font-light leading-[0.85] tracking-[-0.085em] md:text-[8vw]">
          Shop lighting
        </h1>

        <p className="mt-8 max-w-xl text-base leading-[1.8] text-[#161310]/60 md:text-lg">
          Minimal lighting curated for calm interiors, focused work and warm
          everyday spaces.
        </p>
      </section>

      <div className="mb-8 md:hidden">
        <MobileShopFilters
          categories={categories}
          colors={colors}
          currentCategory={params.category}
          currentColor={params.color}
          currentSort={params.sort}
          currentAvailability={params.availability}
        />
      </div>

      <div className="grid gap-12 md:grid-cols-[260px_1fr]">
        <div className="hidden md:block">
          <div className="sticky top-24">
            <ShopFilters
              categories={categories}
              colors={colors}
              currentCategory={params.category}
              currentColor={params.color}
              currentSort={params.sort}
              currentAvailability={params.availability}
            />
          </div>
        </div>

        <section>
          <div className="mb-8 flex flex-col gap-4 border-b border-[#161310]/15 pb-5 text-sm md:flex-row md:items-center md:justify-between">
            <p className="text-[#161310]/50">
              {products.length} {products.length === 1 ? "product" : "products"}
            </p>

            <div className="flex items-center gap-5">
              {params.category && (
                <p className="text-[#161310]/50">
                  Category:{" "}
                  <span className="text-[#161310]">{params.category}</span>
                </p>
              )}

              {params.color && (
                <p className="text-[#161310]/50">
                  Color: <span className="text-[#161310]">{params.color}</span>
                </p>
              )}

              {hasActiveFilters && (
                <Link href="/shop" className="text-[#161310] underline">
                  Clear filters
                </Link>
              )}
            </div>
          </div>

          {products.length === 0 ? (
            <div className="flex min-h-[420px] items-center justify-center border border-[#161310]/15 p-8 text-center">
              <div>
                <p className="text-3xl font-light tracking-[-0.05em]">
                  No products found.
                </p>

                <p className="mt-4 text-sm text-[#161310]/50">
                  Try another category, color or availability filter.
                </p>

                <Link
                  href="/shop"
                  className="mt-8 inline-block bg-[#161310] px-6 py-4 text-sm text-[#ecebeb]"
                >
                  Clear filters
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-x-5 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
