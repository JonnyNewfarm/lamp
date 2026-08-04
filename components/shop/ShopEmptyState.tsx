import Link from "next/link";

export default function ShopEmptyState() {
  return (
    <div
      className="
        flex
        min-h-[420px]
        items-center
        justify-center
        border
        border-[#1a1817]/15
        p-8
        text-center
      "
    >
      <div>
        <p
          className="
            font-merchant
            text-4xl
            font-normal
            tracking-[-0.04em]
          "
        >
          No products found.
        </p>

        <p className="mt-4 text-sm text-[#1a1817]/50">
          Try another category, color or availability filter.
        </p>

        <Link
          href="/shop"
          className="
            mt-8
            inline-block
            bg-[#1a1817]
            px-6
            py-4
            text-sm
            text-[#eeeeec]
          "
        >
          Clear filters
        </Link>
      </div>
    </div>
  );
}
