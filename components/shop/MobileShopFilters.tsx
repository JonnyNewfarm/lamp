// components/shop/MobileShopFilters.tsx
"use client";

import { useEffect, useState } from "react";
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

  const activeFilterCount = [
    currentCategory,
    currentColor,
    currentAvailability,
    currentSort && currentSort !== "newest" ? currentSort : undefined,
  ].filter(Boolean).length;

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between border border-[#161310]/15 px-5 py-4 text-sm"
      >
        <span>Filter & sort</span>
        <span>{activeFilterCount > 0 ? activeFilterCount : "+"}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] h-dvh bg-[#ecebeb] text-[#161310]">
          <div className="flex h-dvh flex-col">
            <div className="sticky top-0 z-10 flex h-20 shrink-0 items-center justify-between border-b border-[#161310]/15 bg-[#ecebeb] px-6">
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

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-8 pb-28">
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
        </div>
      )}
    </div>
  );
}
