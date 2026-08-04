"use client";

import { useMemo, useState } from "react";

import { parseSpecs } from "./product.utils";

type ProductSpecsProps = {
  specs?: string | null;
};

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  const [open, setOpen] = useState(false);

  const items = useMemo(() => {
    return parseSpecs(specs);
  }, [specs]);

  if (items.length === 0) {
    return null;
  }

  const shouldCollapse = items.length > 3;

  return (
    <div
      className="
        mt-10
        border-t
        border-[#1a1817]/15
        pt-8
      "
    >
      <p className="mb-5 text-sm text-[#1a1817]/90">Product specs</p>

      <div
        className={`
          relative
          overflow-hidden
          transition-[max-height]
          duration-500
          ease-in-out
          ${shouldCollapse && !open ? "max-h-[92px]" : "max-h-[1200px]"}
        `}
      >
        <div
          className="
            divide-y
            divide-[#1a1817]/10
            border-y
            border-[#1a1817]/10
          "
        >
          {items.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="
                grid
                grid-cols-[1fr_1.3fr]
                gap-6
                py-3
                text-sm
              "
            >
              <p className="text-[#1a1817]">{item.label}</p>

              <p className="break-words font-semibold">{item.value || "—"}</p>
            </div>
          ))}
        </div>

        {shouldCollapse && !open && (
          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-0
              h-10
              w-full
              bg-gradient-to-t
              from-[#eeeeec]
              to-transparent
            "
          />
        )}
      </div>

      {shouldCollapse && (
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          className="
            mt-4
            inline-flex
            cursor-pointer
            items-center
            gap-3
            text-sm
            text-[#1a1817]
            transition
            hover:opacity-60
          "
        >
          <span className="font-semibold">
            {open ? "Hide specs" : "View full specs"}
          </span>

          <span className="h-px w-8 bg-[#1a1817]/40" />
        </button>
      )}
    </div>
  );
}
