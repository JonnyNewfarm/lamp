"use client";

import Image from "next/image";

import type { GalleryImage } from "./product.types";

type ProductGalleryProps = {
  productTitle: string;
  images: GalleryImage[];
  selectedImage?: GalleryImage;
  onSelectImage: (imageId: string) => void;
  onOpenFullscreen: () => void;
};

export default function ProductGallery({
  productTitle,
  images,
  selectedImage,
  onSelectImage,
  onOpenFullscreen,
}: ProductGalleryProps) {
  return (
    <section className="min-w-0 lg:col-span-7">
      <button
        type="button"
        onClick={onOpenFullscreen}
        disabled={!selectedImage}
        aria-label="Open product image fullscreen"
        className="
          relative
          aspect-[4/5]
          w-full
          cursor-pointer
          overflow-hidden
          bg-[#f4f3f0]
          text-left
          disabled:cursor-default
        "
      >
        {selectedImage ? (
          <>
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt || productTitle}
              fill
              priority
              quality={75}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />

            <span
              className="
                absolute
                bottom-4
                right-4
                px-4
                py-2
                text-xs
                sm:text-sm
                uppercase
                tracking-[0.18em]
                text-[#1a1817]/60
              "
            >
              View fullscreen
            </span>
          </>
        ) : (
          <div
            className="
              flex
              h-full
              items-center
              justify-center
              px-8
              text-center
              text-sm
              leading-[1.7]
              text-[#1a1817]/40
            "
          >
            Add product images to this variant in admin.
          </div>
        )}
      </button>

      {images.length > 1 && (
        <div
          className="
            no-scrollbar
            mt-5
            w-full
            min-w-0
            overflow-x-auto
          "
        >
          <div className="flex w-max gap-3 pb-3">
            {images.map((image, index) => {
              const active = selectedImage?.id === image.id;

              return (
                <button
                  key={`${image.imageType}-${image.id}`}
                  type="button"
                  onClick={() => onSelectImage(image.id)}
                  aria-label={`View image ${index + 1}`}
                  className={`
                    relative
                    h-24
                    w-20
                    shrink-0
                    cursor-pointer
                    overflow-hidden
                    bg-[#f4f3f0]
                    transition
                    md:h-28
                    md:w-24
                    ${active ? "opacity-100" : "opacity-45 hover:opacity-100"}
                  `}
                >
                  <Image
                    src={image.url}
                    alt={image.alt || productTitle}
                    fill
                    quality={60}
                    sizes="120px"
                    className="object-cover"
                  />

                  <span
                    className="
                      absolute
                      bottom-0
                      left-0
                      right-0
                      bg-[#eeeeec]/85
                      px-1.5
                      py-1
                      text-center
                      text-[10px]
                      uppercase
                      tracking-[0.14em]
                      text-[#1a1817]/55
                    "
                  >
                    {image.imageType === "lifestyle"
                      ? "Room"
                      : String(index + 1).padStart(2, "0")}
                  </span>

                  {active && (
                    <span
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-px
                        w-full
                        bg-[#1a1817]
                      "
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
