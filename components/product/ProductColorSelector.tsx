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
  if (colors.length === 0) {
    return null;
  }

  return (
    <div
      className="
        mt-10
        border-t
        border-[#1a1817]/15
        pt-8
      "
    >
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-[#1a1817]/90">Color</p>

        {selectedColor && <p className="text-sm">{selectedColor}</p>}
      </div>

      <div className="flex flex-wrap gap-3">
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
              onClick={() => onChange(color)}
              disabled={!available}
              className={`
                flex
                cursor-pointer
                items-center
                gap-3
                border
                px-4
                py-3
                text-sm
                transition
                disabled:cursor-not-allowed
                disabled:opacity-35
                ${
                  active
                    ? "border-[#1a1817]"
                    : "border-[#1a1817]/15 hover:border-[#1a1817]/40"
                }
              `}
            >
              <span
                className="
                  h-4
                  w-4
                  border
                  border-[#1a1817]/20
                "
                style={{
                  backgroundColor: colorHex,
                }}
              />

              <span>{color}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
