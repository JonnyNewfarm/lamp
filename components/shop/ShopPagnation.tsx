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

type PaginationArrowProps = {
  direction: PaginationDirection;
  animated?: boolean;
};

function PaginationArrow({ direction, animated = true }: PaginationArrowProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 38 18"
      fill="none"
      className={`
        h-[16px]
        w-[34px]
        overflow-visible
        ${direction === "previous" ? "rotate-180" : ""}
      `}
    >
      <path
        d="M1 9H32"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />

      {animated && (
        <>
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
        </>
      )}
    </svg>
  );
}

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

  const content =
    direction === "previous" ? (
      <>
        <PaginationArrow direction="previous" animated={!disabled} />

        <span>{label}</span>
      </>
    ) : (
      <>
        <span>{label}</span>

        <PaginationArrow direction="next" animated={!disabled} />
      </>
    );

  if (disabled || !href) {
    return (
      <span
        className="
          flex
          items-center
          gap-3
          text-xl
          font-normal
          text-[#1a1817]/20
        "
      >
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="
        group
        flex
        items-center
        gap-3
        text-xl
        font-normal
        text-[#1a1817]
      "
    >
      {content}
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
                font-morganite
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
                text-5xl
                leading-[0.68]
                font-semibold
                font-morganite
                text-[#1a1817]
              "
            >
              / {String(totalPages).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <div
            className="
              h-px
              w-full
              overflow-hidden
              bg-[#1a1817]/15
              md:w-[360px]
            "
          >
            <div
              className="
                h-px
                bg-[#1a1817]
                transition-all
                duration-500
              "
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <PaginationButton
              direction="previous"
              href={previousHref}
              disabled={currentPage <= 1}
            />

            <div className="flex items-center gap-4">
              {visiblePages.map((page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="text-base text-[#1a1817]/30"
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
                            scale-110
                            text-lg
                            font-semibold
                            text-[#1a1817]
                          `
                        : `
                            text-lg
                            text-[#1a1817]/35
                            transition-colors
                            hover:text-[#1a1817]
                          `
                    }
                  >
                    {String(page).padStart(2, "0")}
                  </Link>
                );
              })}
            </div>

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
