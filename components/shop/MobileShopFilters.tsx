// components/shop/MobileShopFilters.tsx
"use client";

import { useState } from "react";
import ShopFilters from "@/components/shop/ShopFilters";
import type { Category } from "@/prisma/generated/prisma/client";

type MobileShopFiltersProps = {
  categories: Category[];
  colors: string[];
  currentCategory?: string;
  currentColor?: string;
  currentSort?: string;
  currentAvailability?: string;
};

export default function MobileShopFilters({
  categories,
  colors,
  currentCategory,
  currentColor,
  currentSort,
  currentAvailability,
}: MobileShopFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between border border-[#161310]/15 px-5 py-4 text-sm"
      >
        <span>Filter & sort</span>
        <span>+</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-[#ecebeb] text-[#161310]">
          <div className="flex h-20 items-center justify-between border-b border-[#161310]/15 px-6">
            <p className="text-sm uppercase tracking-[0.24em] text-[#161310]/50">
              Filter
            </p>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm"
            >
              Close
            </button>
          </div>

          <div className="h-[calc(100vh-80px)] overflow-y-auto px-6 py-8">
            <ShopFilters
              categories={categories}
              colors={colors}
              currentCategory={currentCategory}
              currentColor={currentColor}
              currentSort={currentSort}
              currentAvailability={currentAvailability}
            />
          </div>
        </div>
      )}
    </div>
  );
}
