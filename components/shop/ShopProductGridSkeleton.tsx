const SKELETON_COUNT = 6;

function ProductCardSkeleton() {
  return (
    <article aria-hidden="true" className="animate-pulse">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f3f0]">
        <div
          className="
            absolute
            left-4
            top-4
            h-2.5
            w-16
            bg-[#161310]/10
          "
        />

        <div
          className="
            absolute
            inset-x-4
            bottom-4
            h-[46px]
            border
            border-[#161310]/10
            bg-[#ecebeb]/70
          "
        />
      </div>

      <div className="pt-5">
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0 flex-1">
            <div
              className="
                h-[22px]
                w-[72%]
                bg-[#161310]/10
                md:h-6
              "
            />

            <div
              className="
                mt-2
                h-3.5
                w-16
                bg-[#161310]/10
              "
            />
          </div>

          <div
            className="
              h-3.5
              w-14
              shrink-0
              bg-[#161310]/10
            "
          />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="h-3 w-3 bg-[#161310]/10" />
          <div className="h-3 w-3 bg-[#161310]/10" />
          <div className="h-3 w-3 bg-[#161310]/10" />
        </div>
      </div>
    </article>
  );
}

export default function ShopProductGridSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading products"
      className="
        grid
        gap-x-5
        gap-y-14
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      <span className="sr-only">Loading products</span>

      {Array.from({
        length: SKELETON_COUNT,
      }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
