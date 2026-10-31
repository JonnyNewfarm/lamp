"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
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

const FILTER_EASE = [0.76, 0, 0.24, 1] as const;

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

  const hasActiveFilters = activeFilterCount > 0;

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      {/* FILTER TRIGGER */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="
          group
          inline-flex
          min-h-11
          cursor-pointer
          items-center
          gap-2.5
          py-2
          text-sm
          font-medium
          text-[#1a1817]
          transition-opacity
          duration-300
          hover:opacity-55
        "
      >
        <span className="whitespace-nowrap">Filter & sort</span>

        {/* FILTER ICON */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="
            shrink-0
            transition-transform
            duration-500
            ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:rotate-[-8deg]
          "
        >
          <path d="M4 7h16" />
          <path d="M4 17h16" />
          <circle cx="9" cy="7" r="2" fill="#eeeeec" />
          <circle cx="15" cy="17" r="2" fill="#eeeeec" />
        </svg>

        {hasActiveFilters && (
          <span
            className="
              flex
              h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-[#1a1817]
              px-1.5
              text-[10px]
              font-medium
              text-[#eeeeec]
            "
          >
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* FILTER PANEL */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.button
              type="button"
              aria-label="Close filters"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: FILTER_EASE,
              }}
              className="
                fixed
                inset-0
                z-[998]
                cursor-default
                bg-[#1a1817]/35
                backdrop-blur-[2px]
              "
            />

            {/* DRAWER */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filter and sort products"
              initial={{
                y: "100%",
              }}
              animate={{
                y: 0,
              }}
              exit={{
                y: "100%",
              }}
              transition={{
                duration: 0.7,
                ease: FILTER_EASE,
              }}
              className="
                fixed
                inset-x-0
                bottom-0
                z-[999]
                flex
                h-[94dvh]
                flex-col
                overflow-hidden
                bg-[#eeeeec]
                text-[#1a1817]
                shadow-[0_-24px_80px_rgba(22,19,16,0.15)]
              "
            >
              {/* HEADER */}
              <header
                className="
                  flex
                  h-[92px]
                  shrink-0
                  items-center
                  justify-between
                  border-b
                  border-[#1a1817]/15
                  px-5
                "
              >
                <div className="flex items-baseline gap-3">
                  <h2
                    className="
                      font-morganite
                      text-[2.5rem]
                      font-bold
                      leading-none
                    "
                  >
                    Filter
                  </h2>

                  {hasActiveFilters && (
                    <span className="text-xs text-[#1a1817]/40">
                      ({activeFilterCount})
                    </span>
                  )}
                </div>

                {/* CLOSE BUTTON */}

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close filters"
                  className="
    cursor-pointer
    font-bueno
    text-xs
    font-semibold
    uppercase
    tracking-[0.02em]
    text-[#1a1817]
    transition-opacity
    duration-300
    hover:opacity-40
  "
                >
                  Close
                </button>
              </header>

              {/* FILTER CONTENT */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.16,
                  duration: 0.65,
                  ease: FILTER_EASE,
                }}
                className="
                  min-h-0
                  flex-1
                  overflow-y-auto
                  overscroll-contain
                  px-5
                  py-7
                "
              >
                <ShopFilters
                  categories={categories}
                  colors={colors}
                  currentCategory={currentCategory}
                  currentColor={currentColor}
                  currentSort={currentSort}
                  currentAvailability={currentAvailability}
                />
              </motion.div>

              {/* FOOTER */}
              <motion.footer
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.22,
                  duration: 0.65,
                  ease: FILTER_EASE,
                }}
                className="
                  shrink-0
                  border-t
                  border-[#1a1817]/15
                  px-5
                  pb-[max(20px,env(safe-area-inset-bottom))]
                  pt-5
                  text-[#1a1817]
                "
              >
                <div className="grid grid-cols-[0.75fr_1.25fr] gap-3">
                  {/* CLEAR ALL */}
                  <Link
                    href="/shop"
                    onClick={() => setOpen(false)}
                    className={`
                      flex
                      min-h-16
                      items-center
                      justify-center
                      border
                      border-[#1a1817]/20
                      px-5
                      text-sm
                      transition-colors
                      duration-300
                      hover:border-[#1a1817]
                      ${
                        hasActiveFilters
                          ? "cursor-pointer opacity-100"
                          : "pointer-events-none opacity-35"
                      }
                    `}
                  >
                    Clear all
                  </Link>

                  {/* SHOW PRODUCTS */}
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="
                      group
                      relative
                      min-h-16
                      cursor-pointer
                      overflow-hidden
                      border
                      border-[#1a1817]
                      bg-[#1a1817]
                      px-6
                      text-[#eeeeec]
                    "
                  >
                    <span
                      className="
                        absolute
                        inset-0
                        translate-y-full
                        bg-[#eeeeec]
                        transition-transform
                        duration-500
                        ease-[cubic-bezier(0.76,0,0.24,1)]
                        group-hover:translate-y-0
                      "
                    />

                    <span
                      className="
                        relative
                        z-10
                        text-lg
                        transition-colors
                        duration-500
                        group-hover:text-[#1a1817]
                      "
                    >
                      Show products
                    </span>
                  </button>
                </div>
              </motion.footer>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
