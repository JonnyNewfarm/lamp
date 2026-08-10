type ShopHeaderProps = {
  totalProducts: number;
  showingFrom: number;
  showingTo: number;
};

export default function ShopHeader({
  totalProducts,
  showingFrom,
  showingTo,
}: ShopHeaderProps) {
  const productLabel = totalProducts === 1 ? "product" : "products";

  return (
    <div className="mb-8">
      <div
        className="
          flex
          flex-col
          gap-3
          pb-5
          md:flex-row
          md:items-end
          md:justify-between
        "
      >
        <h1
          className="
            -mb-[0.16em]
            whitespace-nowrap
            font-morganite
            text-[clamp(6rem,7vw,8rem)]
            font-bold
          "
        >
          Explore lighting
        </h1>

        <p
          className="
            shrink-0
            pb-1
            font-montserrat
            text-sm
            text-[#1a1817]/50
            md:text-right
          "
        >
          {totalProducts === 0
            ? "0 products"
            : `Showing ${showingFrom}-${showingTo} of ${totalProducts} ${productLabel}`}
        </p>
      </div>

      <div className="h-px w-full bg-[#1a1817]/15" />
    </div>
  );
}
