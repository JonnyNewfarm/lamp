// components/shop/ShopFilters.tsx
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

export default function ShopFilters({
  categories,
  colors,
  currentCategory,
  currentColor,
  currentSort,
  currentAvailability,
}: ShopFiltersProps) {
  return (
    <aside className="space-y-10">
      <FilterGroup title="Categories">
        <FilterLink href="/shop" active={!currentCategory}>
          All
        </FilterLink>

        {categories.map((category) => (
          <FilterLink
            key={category.id}
            href={`/shop?category=${category.slug}`}
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

          {colors.map((color) => (
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
              {color}
            </FilterLink>
          ))}
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
  if (params.availability)
    searchParams.set("availability", params.availability);

  const query = searchParams.toString();

  return query ? `/shop?${query}` : "/shop";
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-4 text-sm text-[#161310]/45">{title}</h2>
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
      className={`block text-sm transition ${
        active ? "text-[#161310]" : "text-[#161310]/45 hover:text-[#161310]"
      }`}
    >
      {children}
    </Link>
  );
}
