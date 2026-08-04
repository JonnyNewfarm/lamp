import type { ComponentProps } from "react";

import ShopFilters from "./ShopFilters";

type ShopFiltersProps = ComponentProps<typeof ShopFilters>;

type ShopSidebarProps = Pick<
  ShopFiltersProps,
  | "categories"
  | "colors"
  | "currentCategory"
  | "currentColor"
  | "currentSort"
  | "currentAvailability"
>;

export default function ShopSidebar({
  categories,
  colors,
  currentCategory,
  currentColor,
  currentSort,
  currentAvailability,
}: ShopSidebarProps) {
  return (
    <aside className="hidden md:block">
      <div className="sticky top-24">
        <ShopFilters
          categories={categories}
          colors={colors}
          currentCategory={currentCategory}
          currentColor={currentColor}
          currentSort={currentSort}
          currentAvailability={currentAvailability}
        />
      </div>
    </aside>
  );
}
