import type { ProductVariantWithImages } from "./product.types";

type ProductAvailabilityProps = {
  selectedVariant?: ProductVariantWithImages;
  inStock: boolean;
};

export default function ProductAvailability({
  selectedVariant,
  inStock,
}: ProductAvailabilityProps) {
  return (
    <div
      className="
        mt-8
        border-t
        border-[#1a1817]/15
        pt-8
      "
    >
      <div className="flex items-center justify-between text-sm">
        <p className="text-[#1a1817]/45">Availability</p>

        {selectedVariant ? (
          <p>
            {inStock ? `${selectedVariant.stock} in stock` : "Out of stock"}
          </p>
        ) : (
          <p>Unavailable</p>
        )}
      </div>

      {selectedVariant?.sku && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <p className="text-[#1a1817]/45">SKU</p>

          <p>{selectedVariant.sku}</p>
        </div>
      )}
    </div>
  );
}
