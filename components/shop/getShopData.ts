import "server-only";

import { prisma } from "@/lib/prisma";

import type { ShopSearchParams } from "./shop.types";
import {
  getVisiblePages,
  PRODUCTS_PER_PAGE,
} from "./shop.utils";

function getWhere(params: ShopSearchParams) {
  return {
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
}

function getOrderBy(params: ShopSearchParams) {
  if (params.sort === "price-asc") {
    return {
      price: "asc" as const,
    };
  }

  if (params.sort === "price-desc") {
    return {
      price: "desc" as const,
    };
  }

  return {
    createdAt: "desc" as const,
  };
}

export async function getShopPageData(
  params: ShopSearchParams,
) {
  const currentPage = Math.max(
    Number(params.page) || 1,
    1,
  );

  const skip =
    (currentPage - 1) * PRODUCTS_PER_PAGE;

  const where = getWhere(params);

  const [categories, colorRows, totalProducts] =
    await Promise.all([
      prisma.category.findMany({
        orderBy: {
          name: "asc",
        },
      }),

      prisma.productVariant.findMany({
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
      }),

      prisma.product.count({
        where,
      }),
    ]);

  const colors = colorRows
    .map((row) => row.color)
    .filter((color): color is string => Boolean(color));

  const totalPages = Math.ceil(
    totalProducts / PRODUCTS_PER_PAGE,
  );

  const visiblePages = getVisiblePages(
    currentPage,
    totalPages,
  );

  const showingFrom =
    totalProducts === 0 ? 0 : skip + 1;

  const showingTo = Math.min(
    skip + PRODUCTS_PER_PAGE,
    totalProducts,
  );

  return {
    categories,
    colors,
    currentPage,
    totalPages,
    totalProducts,
    visiblePages,
    showingFrom,
    showingTo,
  };
}

export async function getShopProducts(
  params: ShopSearchParams,
) {
  const currentPage = Math.max(
    Number(params.page) || 1,
    1,
  );

  const skip =
    (currentPage - 1) * PRODUCTS_PER_PAGE;

  const where = getWhere(params);
  const orderBy = getOrderBy(params);

  return prisma.product.findMany({
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
  });
}