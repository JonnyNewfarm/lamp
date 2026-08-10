import { formatPrice } from "@/lib/formatPrice";

import ProductActions from "./ProductActions";
import ProductAvailability from "./ProductAvailability";
import ProductBenefits from "./ProductBenefits";
import ProductColorSelector from "./ProductColorSelector";
import ProductDescription from "./ProductDescription";
import ProductPlugSelector from "./ProductPlugSelector";
import ProductSpecs from "./ProductSpecs";
import type {
  ProductDetailsType,
  ProductVariantWithImages,
} from "./product.types";

type ProductInformationProps = {
  product: ProductDetailsType;

  colors: string[];
  plugTypes: string[];
  hasPlugTypes: boolean;

  selectedColor?: string;
  selectedPlugType?: string;
  selectedVariant?: ProductVariantWithImages;

  price: number;
  inStock: boolean;

  colorIsAvailable: (color: string) => boolean;
  plugIsAvailable: (plugType: string) => boolean;

  onColorChange: (color: string) => void;
  onPlugChange: (plugType: string) => void;
  onAddToCart: () => void;
};

export default function ProductInformation({
  product,

  colors,
  plugTypes,
  hasPlugTypes,

  selectedColor,
  selectedPlugType,
  selectedVariant,

  price,
  inStock,

  colorIsAvailable,
  plugIsAvailable,

  onColorChange,
  onPlugChange,
  onAddToCart,
}: ProductInformationProps) {
  const description = product.description?.trim() || "";

  return (
    <section className="lg:col-span-5">
      <div className="lg:sticky lg:top-24">
        <p
          className="
            text-xs
            uppercase
            tracking-[0.34em]
            text-[#1a1817]/45
          "
        >
          {product.category.name}
        </p>

        <h1
          className="
            mt-5
            max-w-2xl
font-morganite   
font-semibold         text-[12vw]
            leading-[0.95]
            md:text-[7vw]
            lg:text-[7.2vw]
          "
        >
          {product.title}
        </h1>

        <div className="mt-8 flex items-baseline gap-4">
          <p
            className="
              text-4xl
              font-light
              tracking-[-0.05em]
              md:text-5xl
            "
          >
            {formatPrice(price, product.currency)}
          </p>

          {product.compareAtPrice && (
            <p
              className="
                text-xl
                text-[#1a1817]/35
                line-through
                md:text-2xl
              "
            >
              {formatPrice(product.compareAtPrice, product.currency)}
            </p>
          )}
        </div>

        <ProductDescription description={description} />

        <ProductSpecs specs={product.specs} />

        <ProductColorSelector
          colors={colors}
          variants={product.variants}
          selectedColor={selectedColor}
          isAvailable={colorIsAvailable}
          onChange={onColorChange}
        />

        {hasPlugTypes && (
          <ProductPlugSelector
            plugTypes={plugTypes}
            selectedPlugType={selectedPlugType}
            isAvailable={plugIsAvailable}
            onChange={onPlugChange}
          />
        )}

        <ProductAvailability
          selectedVariant={selectedVariant}
          inStock={inStock}
        />

        <ProductActions inStock={inStock} onAddToCart={onAddToCart} />

        <ProductBenefits />
      </div>
    </section>
  );
}
