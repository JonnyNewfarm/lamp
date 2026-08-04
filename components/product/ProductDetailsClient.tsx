"use client";

import Link from "next/link";

import ProductEditorialDetails from "./ProductEditorialDetails";
import ProductFullscreenGallery from "./ProductFullscreenGallery";
import ProductGallery from "./ProductGallery";
import ProductInformation from "./ProductInformation";
import type { ProductDetailsType } from "./product.types";
import { useProductDetails } from "./useProductDetails";

type ProductDetailsClientProps = {
  product: ProductDetailsType;
};

export default function ProductDetailsClient({
  product,
}: ProductDetailsClientProps) {
  const {
    colors,
    plugTypes,
    hasPlugTypes,

    selectedColor,
    selectedPlugType,
    selectedVariant,

    selectedImage,
    galleryImages,

    fullscreenOpen,

    price,
    inStock,

    setSelectedImageId,
    setFullscreenOpen,

    showPreviousImage,
    showNextImage,

    colorIsAvailable,
    plugIsAvailable,

    handleColorChange,
    handlePlugChange,
    handleAddToCart,
  } = useProductDetails(product);

  return (
    <main
      className="
        min-h-screen
        bg-[#eeeeec]
        px-6
        py-24
        text-[#1a1817]
        md:px-12
      "
    >
      <div className="mb-10 mt-5">
        <Link
          href="/shop"
          className="
            text-sm
            text-[#1a1817]/55
            hover:text-[#1a1817]
          "
        >
          Back to shop
        </Link>
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        <ProductGallery
          productTitle={product.title}
          images={galleryImages}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImageId}
          onOpenFullscreen={() => selectedImage && setFullscreenOpen(true)}
        />

        <ProductInformation
          product={product}
          colors={colors}
          plugTypes={plugTypes}
          hasPlugTypes={hasPlugTypes}
          selectedColor={selectedColor}
          selectedPlugType={selectedPlugType}
          selectedVariant={selectedVariant}
          price={price}
          inStock={inStock}
          colorIsAvailable={colorIsAvailable}
          plugIsAvailable={plugIsAvailable}
          onColorChange={handleColorChange}
          onPlugChange={handlePlugChange}
          onAddToCart={handleAddToCart}
        />
      </div>

      <ProductEditorialDetails />

      <ProductFullscreenGallery
        open={fullscreenOpen}
        productTitle={product.title}
        images={galleryImages}
        selectedImage={selectedImage}
        onClose={() => setFullscreenOpen(false)}
        onSelectImage={setSelectedImageId}
        onPrevious={showPreviousImage}
        onNext={showNextImage}
      />
    </main>
  );
}
