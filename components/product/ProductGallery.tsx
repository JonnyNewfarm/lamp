"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import type { GalleryImage } from "./product.types";

type ProductGalleryProps = {
  productTitle: string;
  images: GalleryImage[];
  selectedImage?: GalleryImage;
  onSelectImage: (imageId: string) => void;
  onOpenFullscreen: () => void;
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProductGallery({
  productTitle,
  images,
  selectedImage,
  onSelectImage,
  onOpenFullscreen,
}: ProductGalleryProps) {
  return (
    <section className="min-w-0 lg:col-span-7">
      <motion.div
        initial={{
          opacity: 0,
          x: -36,
          clipPath: "inset(0 8% 0 0)",
        }}
        animate={{
          opacity: 1,
          x: 0,
          clipPath: "inset(0 0% 0 0)",
        }}
        transition={{
          duration: 1.05,
          ease,
        }}
      >
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
              <motion.div
                key={selectedImage.id}
                initial={{
                  opacity: 0,
                  scale: 1.035,
                  filter: "blur(5px)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.9,
                  ease,
                }}
                className="absolute inset-0"
              >
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.alt || productTitle}
                  fill
                  priority
                  quality={75}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </motion.div>

              <motion.span
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.55,
                  ease,
                }}
                className="
                  absolute
                  bottom-4
                  right-4
                  z-20
                  px-4
                  py-2
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-[#1a1817]/60
                  sm:text-sm
                "
              >
                View fullscreen
              </motion.span>
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
      </motion.div>

      {images.length > 1 && (
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease,
          }}
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
                <motion.button
                  key={`${image.imageType}-${image.id}`}
                  type="button"
                  onClick={() => onSelectImage(image.id)}
                  aria-label={`View image ${index + 1}`}
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: 0.45 + index * 0.05,
                    ease,
                  }}
                  className={`
                    relative
                    h-24
                    w-20
                    shrink-0
                    cursor-pointer
                    overflow-hidden
                    bg-[#f4f3f0]
                    transition-opacity
                    duration-300
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
                    <motion.span
                      layoutId="active-product-image"
                      transition={{
                        duration: 0.45,
                        ease,
                      }}
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
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </section>
  );
}
