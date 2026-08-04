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
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="
          group
          flex
          min-h-14
          w-full
          cursor-pointer
          items-center
          justify-between
          border
          px-4
          border-[#1a1817]/15
          py-4
          text-sm
          transition-colors
          duration-300
          hover:border-[#1a1817]/35
        "
      >
        <span className="flex items-center gap-3">
          <span>Filter & sort</span>

          {hasActiveFilters && (
            <span
              className="
                flex
                h-5
                min-w-5
                items-center
                justify-center
                rounded-full
        bg-[#1a1817]                px-1.5
                text-[10px]
text-[#eeeeec]
        "
            >
              {activeFilterCount}
            </span>
          )}
        </span>

        <span className="relative block h-4 w-5">
          <span
            className="
              absolute
              left-0
              top-1/2
              h-px
              w-full
              -translate-y-1/2
              bg-current
              transition-transform
              duration-500
              ease-[cubic-bezier(0.76,0,0.24,1)]
              group-hover:scale-x-75
            "
          />

          <span
            className="
              absolute
              left-1/2
              top-0
              h-full
              w-px
              -translate-x-1/2
              bg-current
              transition-transform
              duration-500
              ease-[cubic-bezier(0.76,0,0.24,1)]
              group-hover:scale-y-75
            "
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
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
        bg-[#1a1817]/35                backdrop-blur-[2px]
              "
            />

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
                      font-merchant
                      text-[2.4rem]
                      font-light
                      leading-none
                      tracking-[-0.045em]
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

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close filters"
                  className="
                    group
                    relative
                    flex
                    h-11
                    w-11
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#1a1817]/20
                    transition-colors
                    duration-300
                    hover:border-[#1a1817]
                  "
                >
                  <span
                    className="
                      absolute
                      h-px
                      w-5
                      rotate-45
                      bg-current
                      transition-transform
                      duration-500
                      ease-[cubic-bezier(0.76,0,0.24,1)]
                      group-hover:rotate-[135deg]
                    "
                  />

                  <span
                    className="
                      absolute
                      h-px
                      w-5
                      -rotate-45
                      bg-current
                      transition-transform
                      duration-500
                      ease-[cubic-bezier(0.76,0,0.24,1)]
                      group-hover:rotate-45
                    "
                  />
                </button>
              </header>

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
                  border-[#eeeeec]/15
        text-[#1a1817]
                  px-5
                  pb-[max(20px,env(safe-area-inset-bottom))]
                  pt-5
                "
              >
                <div className="grid grid-cols-[0.75fr_1.25fr] gap-3">
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
