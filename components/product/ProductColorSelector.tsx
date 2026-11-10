"use client";

import type { ProductVariantWithImages } from "./product.types";

type ProductColorSelectorProps = {
  colors: string[];
  variants: ProductVariantWithImages[];
  selectedColor?: string;
  isAvailable: (color: string) => boolean;
  onChange: (color: string) => void;
};

export default function ProductColorSelector({
  colors,
  variants,
  selectedColor,
  isAvailable,
  onChange,
}: ProductColorSelectorProps) {
  if (colors.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-[#1a1817]/90">Color</p>

        {selectedColor && (
          <p className="text-sm text-[#1a1817]/60">{selectedColor}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-5">
        {colors.map((color) => {
          const active = selectedColor === color;
          const available = isAvailable(color);

          const colorHex =
            variants.find(
              (variant) => variant.color === color && variant.colorHex,
            )?.colorHex || "#d8d1c7";

          return (
            <button
              key={color}
              type="button"
              title={color}
              aria-label={`${color}${!available ? " - Unavailable" : ""}`}
              aria-pressed={active}
              onClick={() => onChange(color)}
              disabled={!available}
              className={`
                relative
                h-8
                w-8
                shrink-0
                rounded-full
                border
                border-[#1a1817]/15
                transition-all
                duration-300
                ease-out
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#1a1817]
                ${
                  active
                    ? "outline outline-1 outline-offset-4 outline-[#1a1817]"
                    : "hover:scale-110"
                }
                ${
                  available ? "cursor-pointer" : "cursor-not-allowed opacity-30"
                }
              `}
              style={{
                backgroundColor: colorHex,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
