"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useCart } from "@/components/cart/CartProvider";

import type {
  GalleryImage,
  ProductDetailsType,
} from "./product.types";
import { uniqueValues } from "./product.utils";

export function useProductDetails(
  product: ProductDetailsType,
) {
  const { addItem } = useCart();

  const firstVariant = product.variants[0];

  const hasPlugTypes = product.variants.some(
    (variant) => Boolean(variant.plugType),
  );

  const colors = useMemo(() => {
    return uniqueValues(
      product.variants.map((variant) => variant.color),
    );
  }, [product.variants]);

  const plugTypes = useMemo(() => {
    return uniqueValues(
      product.variants.map((variant) => variant.plugType),
    );
  }, [product.variants]);

  const [selectedColor, setSelectedColor] = useState<
    string | undefined
  >(firstVariant?.color || undefined);

  const [selectedPlugType, setSelectedPlugType] = useState<
    string | undefined
  >(firstVariant?.plugType || undefined);

  const [selectedImageId, setSelectedImageId] = useState<
    string | undefined
  >();

  const [fullscreenOpen, setFullscreenOpen] =
    useState(false);

  const selectedVariant = useMemo(() => {
    if (!product.variants.length) {
      return undefined;
    }

    if (hasPlugTypes) {
      return (
        product.variants.find((variant) => {
          const colorMatches = selectedColor
            ? variant.color === selectedColor
            : true;

          const plugMatches = selectedPlugType
            ? variant.plugType === selectedPlugType
            : !variant.plugType;

          return colorMatches && plugMatches;
        }) || product.variants[0]
      );
    }

    return (
      product.variants.find((variant) => {
        if (colors.length > 0) {
          return variant.color === selectedColor;
        }

        return variant.id === firstVariant?.id;
      }) || product.variants[0]
    );
  }, [
    product.variants,
    hasPlugTypes,
    selectedColor,
    selectedPlugType,
    colors.length,
    firstVariant?.id,
  ]);

  const galleryImages = useMemo<GalleryImage[]>(() => {
    const variantImages =
      selectedVariant?.images.map((image) => ({
        ...image,
        imageType: "variant" as const,
      })) || [];

    const lifestyleImages = product.images.map((image) => ({
      ...image,
      imageType: "lifestyle" as const,
    }));

    return [...variantImages, ...lifestyleImages];
  }, [selectedVariant, product.images]);

  useEffect(() => {
    if (galleryImages.length === 0) {
      return;
    }

    setSelectedImageId((currentId) => {
      const currentStillExists = galleryImages.some(
        (image) => image.id === currentId,
      );

      if (currentId && currentStillExists) {
        return currentId;
      }

      return galleryImages[0].id;
    });
  }, [galleryImages]);

  const selectedImage =
    galleryImages.find(
      (image) => image.id === selectedImageId,
    ) || galleryImages[0];

  const showPreviousImage = useCallback(() => {
    if (galleryImages.length <= 1 || !selectedImage) {
      return;
    }

    const currentIndex = galleryImages.findIndex(
      (image) => image.id === selectedImage.id,
    );

    const previousIndex =
      (currentIndex - 1 + galleryImages.length) %
      galleryImages.length;

    const previousImage = galleryImages[previousIndex];

    if (previousImage) {
      setSelectedImageId(previousImage.id);
    }
  }, [galleryImages, selectedImage]);

  const showNextImage = useCallback(() => {
    if (galleryImages.length <= 1 || !selectedImage) {
      return;
    }

    const currentIndex = galleryImages.findIndex(
      (image) => image.id === selectedImage.id,
    );

    const nextIndex =
      (currentIndex + 1) % galleryImages.length;

    const nextImage = galleryImages[nextIndex];

    if (nextImage) {
      setSelectedImageId(nextImage.id);
    }
  }, [galleryImages, selectedImage]);

  const colorIsAvailable = useCallback(
    (color: string) => {
      return product.variants.some((variant) => {
        const colorMatches = variant.color === color;

        const plugMatches = hasPlugTypes
          ? selectedPlugType
            ? variant.plugType === selectedPlugType
            : true
          : true;

        return (
          colorMatches &&
          plugMatches &&
          variant.stock > 0
        );
      });
    },
    [
      product.variants,
      hasPlugTypes,
      selectedPlugType,
    ],
  );

  const plugIsAvailable = useCallback(
    (plugType: string) => {
      return product.variants.some((variant) => {
        const plugMatches =
          variant.plugType === plugType;

        const colorMatches = selectedColor
          ? variant.color === selectedColor
          : true;

        return (
          plugMatches &&
          colorMatches &&
          variant.stock > 0
        );
      });
    },
    [product.variants, selectedColor],
  );

  function handleColorChange(color: string) {
    setSelectedColor(color);

    if (hasPlugTypes) {
      const matchingVariant =
        product.variants.find(
          (variant) =>
            variant.color === color &&
            variant.plugType === selectedPlugType,
        ) ||
        product.variants.find(
          (variant) =>
            variant.color === color &&
            variant.stock > 0,
        ) ||
        product.variants.find(
          (variant) => variant.color === color,
        );

      setSelectedPlugType(
        matchingVariant?.plugType || undefined,
      );

      setSelectedImageId(
        matchingVariant?.images[0]?.id ||
          product.images[0]?.id,
      );

      return;
    }

    const matchingVariant =
      product.variants.find(
        (variant) =>
          variant.color === color &&
          variant.stock > 0,
      ) ||
      product.variants.find(
        (variant) => variant.color === color,
      );

    setSelectedImageId(
      matchingVariant?.images[0]?.id ||
        product.images[0]?.id,
    );
  }

  function handlePlugChange(plugType: string) {
    setSelectedPlugType(plugType);

    const matchingVariant =
      product.variants.find(
        (variant) =>
          variant.plugType === plugType &&
          (!selectedColor ||
            variant.color === selectedColor) &&
          variant.stock > 0,
      ) ||
      product.variants.find(
        (variant) =>
          variant.plugType === plugType &&
          (!selectedColor ||
            variant.color === selectedColor),
      );

    if (matchingVariant?.color) {
      setSelectedColor(matchingVariant.color);
    }

    setSelectedImageId(
      matchingVariant?.images[0]?.id ||
        product.images[0]?.id,
    );
  }

  const price =
    selectedVariant?.price || product.price;

  const inStock = selectedVariant
    ? selectedVariant.stock > 0
    : false;

  function handleAddToCart() {
    if (!selectedVariant || !inStock) {
      return;
    }

    const cartImage =
      selectedVariant.images[0]?.url ||
      selectedImage?.url ||
      null;

    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      title: product.title,
      slug: product.slug,
      variantName: selectedVariant.name,
      color: selectedVariant.color,
      image: cartImage,
      price,
      currency: product.currency,
      quantity: 1,
      stock: selectedVariant.stock,
    });
  }

  return {
    colors,
    plugTypes,
    hasPlugTypes,

    selectedColor,
    selectedPlugType,
    selectedVariant,

    selectedImage,
    selectedImageId,
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
  };
}