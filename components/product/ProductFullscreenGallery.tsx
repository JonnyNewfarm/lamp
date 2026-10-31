"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, type TouchEvent } from "react";

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

const ease = [0.16, 1, 0.3, 1] as const;

const imageTransition = {
  duration: 0.72,
  ease,
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
  const touchStart = useRef<{
    x: number;
    y: number;
  } | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // BODY SCROLL LOCK + KEYBOARD
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus({
      preventScroll: true,
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrevious();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      previouslyFocused?.focus({
        preventScroll: true,
      });
    };
  }, [open, onClose, onNext, onPrevious]);

  // MOBILE SWIPE
  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStart.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = touchStart.current;

    if (!start) return;

    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;

    const deltaX = start.x - endX;
    const deltaY = start.y - endY;

    touchStart.current = null;

    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) {
      return;
    }

    if (deltaX > 0) {
      onNext();
    } else {
      onPrevious();
    }
  }

  return (
    <AnimatePresence initial={false}>
      {open && selectedImage && (
        <motion.div
          key="product-fullscreen"
          role="dialog"
          aria-modal="true"
          aria-label="Product image fullscreen view"
          initial={false}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.12,
              delay: 0.62,
            },
          }}
          onMouseDown={onClose}
          className="
            fixed
            inset-0
            z-[80]
            flex
            flex-col
            overflow-hidden
            text-[#eeeeec]
          "
        >
          {/* BACKDROP */}
          <motion.div
            aria-hidden="true"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.4,
              ease,
            }}
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[#1a1817]/95
              backdrop-blur-[8px]
            "
          />

          {/* CLOSE BUTTON */}
          <motion.button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            onMouseDown={(event) => event.stopPropagation()}
            aria-label="Close image viewer"
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease,
            }}
            className="
              absolute
              right-5
              top-6
              z-30
              cursor-pointer
              font-bueno
              text-sm
              font-semibold
              uppercase
              tracking-[0.04em]
              text-[#eeeeec]
              transition-opacity
              hover:opacity-50
              focus-visible:outline
              focus-visible:outline-offset-4
              md:right-10
              md:top-9
              md:text-base
            "
          >
            Close
          </motion.button>

          {/* MAIN IMAGE AREA */}
          <div
            className="
              relative
              flex
              min-h-0
              w-full
              flex-1
              items-center
              justify-center
              px-5
              pb-4
              pt-20
              md:px-10
              md:pb-6
              md:pt-16
            "
          >
            {/* SHARED ELEMENT */}
            <motion.div
              layoutId="product-gallery-shared-image"
              transition={{
                layout: imageTransition,
              }}
              onMouseDown={(event) => event.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="
                relative
                aspect-[4/5]
                w-[min(88vw,60dvh,700px)]
                shrink-0
                touch-pan-y
                overflow-hidden
                bg-[#f4f3f0]
                will-change-transform
              "
            >
              {/* IMAGE CROSSFADE */}
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={selectedImage.id}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.38,
                    ease,
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={selectedImage.url}
                    alt={selectedImage.alt || productTitle}
                    fill
                    priority
                    quality={90}
                    sizes="(min-width: 1024px) 700px, 88vw"
                    className="
                      object-cover
                      select-none
                    "
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* THUMBNAILS */}
          {images.length > 1 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 10,
                transition: {
                  duration: 0.2,
                },
              }}
              transition={{
                duration: 0.5,
                delay: 0.22,
                ease,
              }}
              onMouseDown={(event) => event.stopPropagation()}
              className="
                no-scrollbar
                relative
                z-20
                w-full
                shrink-0
                overflow-x-auto
                px-5
                pb-[max(20px,env(safe-area-inset-bottom))]
                pt-4
                md:px-10
                md:pb-8
              "
            >
              <div className="mx-auto flex w-max gap-2.5">
                {images.map((image, index) => {
                  const active = selectedImage.id === image.id;

                  return (
                    <button
                      key={`fullscreen-${image.imageType}-${image.id}`}
                      type="button"
                      onClick={() => onSelectImage(image.id)}
                      aria-label={`View image ${index + 1}`}
                      aria-pressed={active}
                      className={`
                        relative
                        h-16
                        w-14
                        shrink-0
                        cursor-pointer
                        overflow-hidden
                        bg-[#f4f3f0]
                        transition-[opacity,transform]
                        duration-500
                        ease-[cubic-bezier(0.16,1,0.3,1)]
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
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
