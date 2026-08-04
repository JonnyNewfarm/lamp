"use client";

import Image from "next/image";
import { useEffect, useState, type TouchEvent } from "react";

import type { GalleryImage } from "./product.types";

type ProductFullscreenGalleryProps = {
  open: boolean;
  productTitle: string;
  images: GalleryImage[];
  selectedImage?: GalleryImage;
  onClose: () => void;
  onSelectImage: (imageId: string) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function ProductFullscreenGallery({
  open,
  productTitle,
  images,
  selectedImage,
  onClose,
  onSelectImage,
  onPrevious,
  onNext,
}: ProductFullscreenGalleryProps) {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, onNext, onPrevious]);

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    setTouchStartX(event.touches[0].clientX);
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX === null) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;

    const distance = touchStartX - touchEndX;
    const minimumSwipeDistance = 50;

    if (distance > minimumSwipeDistance) {
      onNext();
    }

    if (distance < -minimumSwipeDistance) {
      onPrevious();
    }

    setTouchStartX(null);
  }

  if (!open || !selectedImage) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-[#1a1817]/70
        p-0
        text-[#eeeeec]
        backdrop-blur-[3px]
        md:p-10
        lg:p-14
      "
      role="dialog"
      aria-modal="true"
      aria-label="Product image fullscreen view"
      onMouseDown={onClose}
    >
      <div
        className="
          relative
          flex
          h-full
          w-full
          flex-col
          overflow-hidden
          bg-[#1a1817]
          md:h-[84vh]
          md:w-[70vw]
          md:max-w-[1100px]
        "
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="
            group
            absolute
            right-5
            top-5
            z-30
            flex
            cursor-pointer
            items-center
            gap-4
            font-normal
            uppercase
            tracking-[0.18em]
            text-white
            md:right-7
            md:top-7
          "
        >
          <span className="relative block h-4 w-8">
            <span
              className="
                absolute
                left-0
                top-1/2
                h-px
                w-8
                -translate-y-1/2
                bg-current
                transition-all
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:left-2
                group-hover:w-4
                group-hover:rotate-45
              "
            />

            <span
              className="
                absolute
                left-2
                top-1/2
                h-px
                w-4
                -translate-y-1/2
                -rotate-45
                scale-x-0
                bg-current
                opacity-0
                transition-all
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:scale-x-100
                group-hover:opacity-100
              "
            />
          </span>

          <span
            className="
              text-xl
              transition-transform
              duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:translate-x-1
            "
          >
            Close
          </span>
        </button>

        <div
          className="
            relative
            min-h-0
            flex-1
            touch-pan-y
          "
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt || productTitle}
            fill
            quality={90}
            sizes="(min-width: 768px) 82vw, 100vw"
            className="object-contain p-6 md:p-12"
            priority
          />
        </div>

        {images.length > 1 && (
          <div
            className="
              no-scrollbar
              shrink-0
              overflow-x-auto
              px-5
              pb-5
              md:px-8
              md:pb-8
            "
          >
            <div className="mx-auto flex w-max gap-3">
              {images.map((image, index) => {
                const active = selectedImage.id === image.id;

                return (
                  <button
                    key={`fullscreen-${image.imageType}-${image.id}`}
                    type="button"
                    onClick={() => onSelectImage(image.id)}
                    aria-label={`View image ${index + 1}`}
                    className={`
                      relative
                      h-16
                      w-14
                      shrink-0
                      cursor-pointer
                      overflow-hidden
                      bg-[#f4f3f0]
                      transition-all
                      duration-300
                      md:h-20
                      md:w-16
                      ${
                        active
                          ? "scale-100 opacity-100"
                          : "scale-[0.94] opacity-35 hover:scale-100 hover:opacity-75"
                      }
                    `}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || productTitle}
                      fill
                      quality={60}
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
