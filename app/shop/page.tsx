// app/shop/page.tsx
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/shop/ProductCard";
import ShopFilters from "@/components/shop/ShopFilters";
import MobileShopFilters from "@/components/shop/MobileShopFilters";
import Link from "next/link";
import ScrollSection from "@/components/SmoothScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop lamps — Modern lighting for calm interiors | Calm by Design",
  description:
    "Shop modern lamps and curated lighting for calm interiors. Explore table lamps, floor lamps, tripod lamps and warm mood lighting for focused work and everyday spaces.",
  keywords: [
    "shop lamps",
    "buy lamps online",
    "modern lamps",
    "designer lamps",
    "table lamps",
    "floor lamps",
    "tripod lamps",
    "mood lighting",
    "warm lighting",
    "interior lighting",
    "home lighting",
    "minimal lighting",
    "calm interiors",
  ],
  openGraph: {
    title: "Shop lamps — Modern lighting for calm interiors",
    description:
      "Explore modern lamps, table lamps, floor lamps and warm mood lighting curated for calm interiors and everyday spaces.",
    url: "https://calero.studio/shop",
    siteName: "Calm by Design",
    images: [
      {
        url: "/lamp.jpeg",
        width: 1200,
        height: 630,
        alt: "Modern lamps from Calm by Design",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop lamps — Modern lighting for calm interiors",
    description:
      "Shop modern lamps, table lamps, floor lamps and mood lighting for calm interiors.",
    images: ["/lamp.jpeg"],
  },
};

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

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages: Array<number | "..."> = [];

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  pages.push(1);

  if (currentPage > 4) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let page = start; page <= end; page++) {
    pages.push(page);
  }

  if (currentPage < totalPages - 3) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
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

      orderBy,

      skip,
      take: PRODUCTS_PER_PAGE,
    }),
  ]);

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const visiblePages = getVisiblePages(currentPage, totalPages);

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
        <section className="mb-12  pb-10">
          <h1 className="mt-4 max-w-5xl font-semibold text-[17vw] uppercase leading-[0.85] tracking-[-0.065em] md:text-[6vw]">
            Shop lighting
          </h1>

          <p className="mt-5 max-w-xl text-base leading-[1.8] text-[#161310]/85 md:text-lg">
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
                  <nav
                    aria-label="Shop pagination"
                    className="mt-20 border-t border-[#161310]/15 pt-10"
                  >
                    <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/40">
                          Page
                        </p>

                        <div className="mt-3 flex items-end gap-3">
                          <span className="text-[4.5rem] font-light leading-[0.8] tracking-[-0.08em] text-[#161310] md:text-[6rem]">
                            {String(currentPage).padStart(2, "0")}
                          </span>

                          <span className="pb-2 text-sm tracking-[0.24em] text-[#161310]/35">
                            / {String(totalPages).padStart(2, "0")}
                          </span>
                        </div>

                        <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#161310]/45">
                          Browsing {showingFrom}-{showingTo} of {totalProducts}{" "}
                          selected pieces.
                        </p>
                      </div>

                      <div className="flex flex-col gap-6 md:items-end">
                        <div className="h-px w-full overflow-hidden bg-[#161310]/15 md:w-[360px]">
                          <div
                            className="h-px bg-[#161310] transition-all duration-500"
                            style={{
                              width: `${(currentPage / totalPages) * 100}%`,
                            }}
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-6">
                          {currentPage > 1 ? (
                            <Link
                              href={createPageHref(params, currentPage - 1)}
                              className="group flex items-center gap-3 text-xl font-black text-[#161310]"
                            >
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 38 18"
                                fill="none"
                                className="h-[16px] w-[34px] rotate-180 overflow-visible"
                              >
                                <path
                                  d="M1 9H32"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="square"
                                />

                                <path
                                  d="M32 9L25 2"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="square"
                                  pathLength="1"
                                  className="
            [stroke-dasharray:1]
            [stroke-dashoffset:1]
            transition-[stroke-dashoffset]
            duration-300
            ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:[stroke-dashoffset:0]
          "
                                />

                                <path
                                  d="M32 9L25 16"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="square"
                                  pathLength="1"
                                  className="
            [stroke-dasharray:1]
            [stroke-dashoffset:1]
            transition-[stroke-dashoffset]
            duration-300
            ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:[stroke-dashoffset:0]
          "
                                />
                              </svg>

                              <span>Prev</span>
                            </Link>
                          ) : (
                            <span className="flex items-center gap-3 text-xl font-black text-[#161310]/20">
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 38 18"
                                fill="none"
                                className="h-[16px] w-[34px] rotate-180 overflow-visible"
                              >
                                <path
                                  d="M1 9H32"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="square"
                                />
                              </svg>

                              <span>Prev</span>
                            </span>
                          )}

                          <div className="flex items-center gap-4">
                            {visiblePages.map((page, index) => {
                              if (page === "...") {
                                return (
                                  <span
                                    key={`ellipsis-${index}`}
                                    className="text-base text-[#161310]/30"
                                  >
                                    …
                                  </span>
                                );
                              }

                              const isActive = page === currentPage;

                              return (
                                <Link
                                  key={page}
                                  href={createPageHref(params, page)}
                                  aria-current={isActive ? "page" : undefined}
                                  className={
                                    isActive
                                      ? "text-lg font-black text-[#161310]"
                                      : "text-lg text-[#161310]/35 transition-colors hover:text-[#161310]"
                                  }
                                >
                                  {String(page).padStart(2, "0")}
                                </Link>
                              );
                            })}
                          </div>

                          {currentPage < totalPages ? (
                            <Link
                              href={createPageHref(params, currentPage + 1)}
                              className="group flex items-center gap-3 text-xl font-black text-[#161310]"
                            >
                              <span>Next</span>

                              <svg
                                aria-hidden="true"
                                viewBox="0 0 38 18"
                                fill="none"
                                className="h-[16px] w-[34px] overflow-visible"
                              >
                                <path
                                  d="M1 9H32"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="square"
                                />

                                <path
                                  d="M32 9L25 2"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="square"
                                  pathLength="1"
                                  className="
            [stroke-dasharray:1]
            [stroke-dashoffset:1]
            transition-[stroke-dashoffset]
            duration-300
            ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:[stroke-dashoffset:0]
          "
                                />

                                <path
                                  d="M32 9L25 16"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="square"
                                  pathLength="1"
                                  className="
            [stroke-dasharray:1]
            [stroke-dashoffset:1]
            transition-[stroke-dashoffset]
            duration-300
            ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:[stroke-dashoffset:0]
          "
                                />
                              </svg>
                            </Link>
                          ) : (
                            <span className="flex items-center gap-3 text-xl font-black text-[#161310]/20">
                              <span>Next</span>

                              <svg
                                aria-hidden="true"
                                viewBox="0 0 38 18"
                                fill="none"
                                className="h-[16px] w-[34px] overflow-visible"
                              >
                                <path
                                  d="M1 9H32"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="square"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                      </div>
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
