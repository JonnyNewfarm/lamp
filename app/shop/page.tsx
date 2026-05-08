// app/shop/page.tsx
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/shop/ProductCard";
import ShopFilters from "@/components/shop/ShopFilters";
import MobileShopFilters from "@/components/shop/MobileShopFilters";
import Link from "next/link";
import ScrollSection from "@/components/SmoothScroll";

type ShopSearchParams = {
  category?: string;
  color?: string;
  sort?: string;
  availability?: string;
  page?: string;
};

const PRODUCTS_PER_PAGE = 9;

function createPageHref(params: ShopSearchParams, page: number) {
  const searchParams = new URLSearchParams();

  if (params.category) searchParams.set("category", params.category);
  if (params.color) searchParams.set("color", params.color);
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.availability) {
    searchParams.set("availability", params.availability);
  }

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  const queryString = searchParams.toString();

  return queryString ? `/shop?${queryString}` : "/shop";
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<ShopSearchParams>;
}) {
  const params = await searchParams;

  const currentPage = Math.max(Number(params.page) || 1, 1);
  const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;

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

  const where = {
    status: "ACTIVE" as const,

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
                    mode: "insensitive" as const,
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
  };

  const orderBy =
    params.sort === "price-asc"
      ? {
          price: "asc" as const,
        }
      : params.sort === "price-desc"
        ? {
            price: "desc" as const,
          }
        : {
            createdAt: "desc" as const,
          };

  const [totalProducts, products] = await Promise.all([
    prisma.product.count({
      where,
    }),

    prisma.product.findMany({
      where,

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

      orderBy,

      skip,
      take: PRODUCTS_PER_PAGE,
    }),
  ]);

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const hasActiveFilters =
    Boolean(params.category) ||
    Boolean(params.color) ||
    Boolean(params.availability) ||
    Boolean(params.sort && params.sort !== "newest");

  const showingFrom = totalProducts === 0 ? 0 : skip + 1;

  const showingTo = Math.min(skip + products.length, totalProducts);

  return (
    <main className="min-h-screen bg-[#ecebeb] px-6 py-24 text-[#161310] md:px-12">
      <ScrollSection>
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
                {totalProducts === 0
                  ? "0 products"
                  : `Showing ${showingFrom}-${showingTo} of ${totalProducts} ${
                      totalProducts === 1 ? "product" : "products"
                    }`}
              </p>

              <div className="flex flex-wrap items-center gap-5">
                {params.category && (
                  <p className="text-[#161310]/50">
                    Category:{" "}
                    <span className="text-[#161310]">{params.category}</span>
                  </p>
                )}

                {params.color && (
                  <p className="text-[#161310]/50">
                    Color:{" "}
                    <span className="text-[#161310]">{params.color}</span>
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
              <>
                <div className="grid gap-x-5 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav className="mt-16 flex flex-col gap-4 border-t border-[#161310]/15 pt-8 md:flex-row md:items-center md:justify-between">
                    <p className="text-sm text-[#161310]/50">
                      Page {currentPage} of {totalPages}
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      {currentPage > 1 ? (
                        <Link
                          href={createPageHref(params, currentPage - 1)}
                          className="border border-[#161310]/20 px-4 py-3 text-sm transition hover:bg-[#161310] hover:text-[#ecebeb]"
                        >
                          Previous
                        </Link>
                      ) : (
                        <span className="border border-[#161310]/10 px-4 py-3 text-sm text-[#161310]/25">
                          Previous
                        </span>
                      )}

                      {Array.from({ length: totalPages }).map((_, index) => {
                        const page = index + 1;
                        const isActive = page === currentPage;

                        return (
                          <Link
                            key={page}
                            href={createPageHref(params, page)}
                            className={
                              isActive
                                ? "bg-[#161310] px-4 py-3 text-sm text-[#ecebeb]"
                                : "border border-[#161310]/20 px-4 py-3 text-sm transition hover:bg-[#161310] hover:text-[#ecebeb]"
                            }
                          >
                            {page}
                          </Link>
                        );
                      })}

                      {currentPage < totalPages ? (
                        <Link
                          href={createPageHref(params, currentPage + 1)}
                          className="border border-[#161310]/20 px-4 py-3 text-sm transition hover:bg-[#161310] hover:text-[#ecebeb]"
                        >
                          Next
                        </Link>
                      ) : (
                        <span className="border border-[#161310]/10 px-4 py-3 text-sm text-[#161310]/25">
                          Next
                        </span>
                      )}
                    </div>
                  </nav>
                )}
              </>
            )}
          </section>
        </div>
      </ScrollSection>
    </main>
  );
}
