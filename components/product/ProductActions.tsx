"use client";

type ProductActionsProps = {
  inStock: boolean;
  onAddToCart: () => void;
};

export default function ProductActions({
  inStock,
  onAddToCart,
}: ProductActionsProps) {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        disabled={!inStock}
        onClick={onAddToCart}
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
          disabled:cursor-not-allowed
          disabled:opacity-35
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
          {inStock ? "Add to cart" : "Out of stock"}
        </span>
      </button>

      <button
        type="button"
        disabled={!inStock}
        onClick={onAddToCart}
        className="
          group
          relative
          min-h-16
          cursor-pointer
          overflow-hidden
          border
          border-[#1a1817]/25
          px-6
          text-[#1a1817]
          transition-colors
          duration-500
          hover:border-[#1a1817]
          disabled:cursor-not-allowed
          disabled:opacity-35
        "
      >
        <span
          className="
            absolute
            inset-x-0
            bottom-0
            h-full
            origin-bottom
            scale-y-0
            bg-[#1a1817]
            transition-transform
            duration-500
            ease-[cubic-bezier(0.76,0,0.24,1)]
            group-hover:scale-y-100
          "
        />

        <span
          className="
            relative
            z-10
            text-lg
            transition-colors
            duration-500
            group-hover:text-[#eeeeec]
          "
        >
          Buy now
        </span>
      </button>
    </div>
  );
}
