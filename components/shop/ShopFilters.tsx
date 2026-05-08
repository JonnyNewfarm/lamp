// components/shop/ShopFilters.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import type { Category } from "@/prisma/generated/prisma/client";

type ShopFiltersProps = {
  categories: Category[];
  colors: string[];
  currentCategory?: string;
  currentColor?: string;
  currentSort?: string;
  currentAvailability?: string;
};

const VISIBLE_COLOR_COUNT = 6;

export default function ShopFilters({
  categories,
  colors,
  currentCategory,
  currentColor,
  currentSort,
  currentAvailability,
}: ShopFiltersProps) {
  const [showAllColors, setShowAllColors] = useState(false);

  const visibleColors = showAllColors
    ? colors
    : colors.slice(0, VISIBLE_COLOR_COUNT);

  const hiddenColorCount = Math.max(colors.length - VISIBLE_COLOR_COUNT, 0);

  return (
    <aside className="space-y-12 text-[#161310]">
      <FilterGroup title="Categories">
        <FilterLink
          href={createHref({
            color: currentColor,
            sort: currentSort,
            availability: currentAvailability,
          })}
          active={!currentCategory}
        >
          All
        </FilterLink>

        {categories.map((category) => (
          <FilterLink
            key={category.id}
            href={createHref({
              category: category.slug,
              color: currentColor,
              sort: currentSort,
              availability: currentAvailability,
            })}
            active={currentCategory === category.slug}
          >
            {category.name}
          </FilterLink>
        ))}
      </FilterGroup>

      {colors.length > 0 && (
        <FilterGroup title="Color">
          <FilterLink
            href={createHref({
              category: currentCategory,
              sort: currentSort,
              availability: currentAvailability,
            })}
            active={!currentColor}
          >
            All colors
          </FilterLink>

          {visibleColors.map((color) => (
            <FilterLink
              key={color}
              href={createHref({
                category: currentCategory,
                color,
                sort: currentSort,
                availability: currentAvailability,
              })}
              active={currentColor?.toLowerCase() === color.toLowerCase()}
            >
              {formatColorName(color)}
            </FilterLink>
          ))}

          {hiddenColorCount > 0 && (
            <button
              type="button"
              onClick={() => setShowAllColors((current) => !current)}
              className="mt-4 text-sm text-[#161310]/45 underline underline-offset-4 transition hover:text-[#161310]"
            >
              {showAllColors
                ? "Show fewer colors"
                : `Show all colors (${colors.length})`}
            </button>
          )}
        </FilterGroup>
      )}

      <FilterGroup title="Availability">
        <FilterLink
          href={createHref({
            category: currentCategory,
            color: currentColor,
            sort: currentSort,
          })}
          active={!currentAvailability}
        >
          All
        </FilterLink>

        <FilterLink
          href={createHref({
            category: currentCategory,
            color: currentColor,
            sort: currentSort,
            availability: "in-stock",
          })}
          active={currentAvailability === "in-stock"}
        >
          In stock
        </FilterLink>
      </FilterGroup>

      <FilterGroup title="Sort">
        <FilterLink
          href={createHref({
            category: currentCategory,
            color: currentColor,
            availability: currentAvailability,
          })}
          active={!currentSort || currentSort === "newest"}
        >
          Newest
        </FilterLink>

        <FilterLink
          href={createHref({
            category: currentCategory,
            color: currentColor,
            availability: currentAvailability,
            sort: "price-asc",
          })}
          active={currentSort === "price-asc"}
        >
          Price low to high
        </FilterLink>

        <FilterLink
          href={createHref({
            category: currentCategory,
            color: currentColor,
            availability: currentAvailability,
            sort: "price-desc",
          })}
          active={currentSort === "price-desc"}
        >
          Price high to low
        </FilterLink>
      </FilterGroup>
    </aside>
  );
}

function createHref(params: {
  category?: string;
  color?: string;
  sort?: string;
  availability?: string;
}) {
  const searchParams = new URLSearchParams();

  if (params.category) searchParams.set("category", params.category);
  if (params.color) searchParams.set("color", params.color);
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.availability) {
    searchParams.set("availability", params.availability);
  }

  const query = searchParams.toString();

  return query ? `/shop?${query}` : "/shop";
}

function formatColorName(color: string) {
  return color
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-[#161310]/12 pt-5 first:border-t-0 first:pt-0">
      <h2 className="mb-5 text-sm font-medium text-[#161310]/65">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group flex items-center justify-between text-sm transition ${
        active
          ? "font-medium text-[#161310]"
          : "text-[#161310]/55 hover:text-[#161310]"
      }`}
    >
      <span>{children}</span>

      <span
        className={`h-px transition-all duration-500 ${
          active ? "w-7 bg-[#161310]" : "w-0 bg-[#161310]/60 group-hover:w-5"
        }`}
      />
    </Link>
  );
}
