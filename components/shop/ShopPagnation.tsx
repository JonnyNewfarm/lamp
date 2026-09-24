import Link from "next/link";

import type { ShopSearchParams } from "./shop.types";
import { createPageHref } from "./shop.utils";

type ShopPaginationProps = {
  params: ShopSearchParams;
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  showingFrom: number;
  showingTo: number;
  visiblePages: Array<number | "...">;
};

type PaginationDirection = "previous" | "next";

type PaginationButtonProps = {
  direction: PaginationDirection;
  href?: string;
  disabled?: boolean;
};

function PaginationButton({
  direction,
  href,
  disabled = false,
}: PaginationButtonProps) {
  const label = direction === "previous" ? "Prev" : "Next";

  if (disabled || !href) {
    return (
      <span
        className="
          font-bueno
          text-[clamp(2.75rem,4.3vw,5rem)]
          font-bold
          uppercase
          leading-none
          text-[#1a1817]/15
        "
      >
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="
        font-bueno
        text-[clamp(2.75rem,4.3vw,5rem)]
        font-bold
        uppercase
        leading-none
        text-[#1a1817]
        transition-opacity
        duration-300
        hover:opacity-45
      "
    >
      {label}
    </Link>
  );
}

export default function ShopPagination({
  params,
  currentPage,
  totalPages,
  totalProducts,
  showingFrom,
  showingTo,
  visiblePages,
}: ShopPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const previousHref =
    currentPage > 1 ? createPageHref(params, currentPage - 1) : undefined;

  const nextHref =
    currentPage < totalPages
      ? createPageHref(params, currentPage + 1)
      : undefined;

  const progress = totalPages > 0 ? (currentPage / totalPages) * 100 : 0;

  return (
    <nav
      aria-label="Shop pagination"
      className="
        mt-20
        border-t
        border-[#1a1817]/15
        pt-10
      "
    >
      <div
        className="
          flex
          flex-col
          gap-10
          md:flex-row
          md:items-end
          md:justify-between
        "
      >
        <div>
          <p
            className="
              text-xs
              uppercase
              tracking-[0.34em]
              text-[#1a1817]/40
            "
          >
            Page
          </p>

          <div className="mt-3 flex items-end gap-3">
            <span
              className="
                font-bueno
                text-[4.5rem]
                font-semibold
                leading-[0.8]
                text-[#1a1817]
                md:text-[6rem]
              "
            >
              {String(currentPage).padStart(2, "0")}
            </span>

            <span
              className="
                pb-2
                font-bueno
                text-5xl
                font-semibold
                leading-[0.68]
                text-[#1a1817]
              "
            >
              / {String(totalPages).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div
          className="
            flex
            w-full
            flex-col
            md:w-[450px]
          "
        >
          <div
            className="
              flex
              items-center
              justify-start
              gap-5
              pb-1
            "
          >
            {visiblePages.map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="
                      font-bueno
                      text-xl
                      font-medium
                      text-[#1a1817]/30
                    "
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
                      ? `
                          font-bueno
                          text-2xl
                          font-semibold
                          text-[#1a1817]
                        `
                      : `
                          font-bueno
                          text-2xl
                          font-medium
                          text-[#1a1817]/35
                          transition-colors
                          duration-300
                          hover:text-[#1a1817]
                        `
                  }
                >
                  {String(page).padStart(2, "0")}
                </Link>
              );
            })}
          </div>

          <div
            className="
              h-px
              w-full
              overflow-hidden
              bg-[#1a1817]/15
            "
          >
            <div
              className="
                h-px
                bg-[#1a1817]
                transition-all
                duration-500
                ease-[cubic-bezier(0.16,1,0.3,1)]
              "
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div
            className="
              flex
              items-center
              justify-between
              pt-3
            "
          >
            <PaginationButton
              direction="previous"
              href={previousHref}
              disabled={currentPage <= 1}
            />

            <PaginationButton
              direction="next"
              href={nextHref}
              disabled={currentPage >= totalPages}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
