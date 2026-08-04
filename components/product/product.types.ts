import type {
  Category,
  Product,
  ProductImage,
  ProductVariant,
} from "@/prisma/generated/prisma/client";

export type ProductVariantWithImages = ProductVariant & {
  images: ProductImage[];
};

export type ProductDetailsType = Product & {
  category: Category;
  images: ProductImage[];
  variants: ProductVariantWithImages[];
};

export type GalleryImage = ProductImage & {
  imageType: "variant" | "lifestyle";
};

export type ProductDetailsState = {
  colors: string[];
  plugTypes: string[];
  hasPlugTypes: boolean;

  selectedColor?: string;
  selectedPlugType?: string;

  selectedVariant?: ProductVariantWithImages;
  selectedImage?: GalleryImage;

  galleryImages: GalleryImage[];

  price: number;
  inStock: boolean;
};