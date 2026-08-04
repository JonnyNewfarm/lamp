import type { ShopSearchParams } from "./shop.types";

export const PRODUCTS_PER_PAGE = 9;

export function createPageHref(
  params: ShopSearchParams,
  page: number,
): string {
  const searchParams = new URLSearchParams();

  if (params.category) {
    searchParams.set("category", params.category);
  }

  if (params.color) {
    searchParams.set("color", params.color);
  }

  if (params.sort) {
    searchParams.set("sort", params.sort);
  }

  if (params.availability) {
    searchParams.set("availability", params.availability);
  }

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  const queryString = searchParams.toString();

  return queryString ? `/shop?${queryString}` : "/shop";
}

export function getVisiblePages(
  currentPage: number,
  totalPages: number,
): Array<number | "..."> {
  const pages: Array<number | "..."> = [];

  if (totalPages <= 7) {
    return Array.from(
      {
        length: totalPages,
      },
      (_, index) => index + 1,
    );
  }

  pages.push(1);

  if (currentPage > 4) {
    pages.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (currentPage < totalPages - 3) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}