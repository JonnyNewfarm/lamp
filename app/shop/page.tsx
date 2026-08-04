import type { Metadata } from "next";
import { Suspense } from "react";

import MobileShopFilters from "@/components/shop/MobileShopFilters";
import ShopHero from "@/components/shop/ShopClient";
import {
  getShopPageData,
  getShopProducts,
} from "@/components/shop/getShopData";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopPagination from "@/components/shop/ShopPagnation";
import ShopProductGrid from "@/components/shop/ShopProductGrid";
import ShopProductGridSkeleton from "@/components/shop/ShopProductGridSkeleton";
import ShopSidebar from "@/components/shop/ShopSidebar";
import type {
  ShopPageProps,
  ShopSearchParams,
} from "@/components/shop/shop.types";
import ScrollSection from "@/components/SmoothScroll";

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

async function Products({ params }: { params: ShopSearchParams }) {
  const products = await getShopProducts(params);

  return <ShopProductGrid products={products} />;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  const {
    categories,
    colors,
    currentPage,
    totalPages,
    totalProducts,
    visiblePages,
    showingFrom,
    showingTo,
  } = await getShopPageData(params);

  const productKey = [
    params.page ?? "1",
    params.category ?? "all",
    params.color ?? "all",
    params.sort ?? "default",
    params.availability ?? "all",
  ].join("-");

  return (
    <main
      className="
        min-h-screen
        bg-[#eeeeec]
        px-6
        pb-24
        pt-20
        text-[#1a1817]
        md:px-12
        md:pt-20
      "
    >
      <ScrollSection>
        <ShopHero />

        <div className="grid gap-12 md:grid-cols-[260px_1fr]">
          <ShopSidebar
            categories={categories}
            colors={colors}
            currentCategory={params.category}
            currentColor={params.color}
            currentSort={params.sort}
            currentAvailability={params.availability}
          />

          <section>
            <ShopHeader
              totalProducts={totalProducts}
              showingFrom={showingFrom}
              showingTo={showingTo}
            />

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

            <Suspense key={productKey} fallback={<ShopProductGridSkeleton />}>
              <Products params={params} />
            </Suspense>

            <ShopPagination
              params={params}
              currentPage={currentPage}
              totalPages={totalPages}
              totalProducts={totalProducts}
              showingFrom={showingFrom}
              showingTo={showingTo}
              visiblePages={visiblePages}
            />
          </section>
        </div>
      </ScrollSection>
    </main>
  );
}
