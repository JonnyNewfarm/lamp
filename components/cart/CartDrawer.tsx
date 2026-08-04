"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/formatPrice";

const CART_EASE = [0.76, 0, 0.24, 1] as const;

const drawerVariants = {
  closed: {
    x: "100%",
  },
  open: {
    x: 0,
  },
};

const overlayVariants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
  },
};

const contentVariants = {
  closed: {
    opacity: 0,
    y: 18,
  },
  open: {
    opacity: 1,
    y: 0,
  },
};

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    totalQuantity,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeCart]);

  async function handleCheckout() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = (await response.json()) as {
        url?: string;
        error?: string;
      };

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Could not create checkout");
      }

      window.location.href = data.url;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not start checkout",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{
              duration: 0.45,
              ease: CART_EASE,
            }}
            className="
              fixed
              inset-0
              z-[9998]
              cursor-default
           bg-[#eeeeec]
             backdrop-blur-[2px]
            "
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{
              duration: 0.7,
              ease: CART_EASE,
            }}
            className="
              fixed
              inset-y-0
              right-0
              z-[9999]
              flex
              h-dvh
              w-full
              max-w-[600px]
              flex-col
              overflow-hidden
              bg-[#eeeeec]
        text-[#1a1817]
              shadow-[-24px_0_80px_rgba(22,19,16,0.12)]
            "
          >
            <header
              className="
                flex
                h-[90px]
                shrink-0
                items-center
                justify-between
                border-b
                border-[#1a1817]/15
                px-5
                sm:h-[104px]
                sm:px-8
              "
            >
              <div className="flex items-baseline gap-3">
                <h2
                  className="
                    text-[clamp(2rem,5vw,3.4rem)]
                    font-light
                    leading-none
                    tracking-[-0.055em]
                  "
                >
                  Cart
                </h2>

                <span className="text-xs text-[#1a1817]/45">
                  ({totalQuantity})
                </span>
              </div>

              <motion.button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                initial="idle"
                whileHover="hover"
                className="
                  group
                  relative
                  flex
                  h-11
                  w-11
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#1a1817]/20
                  transition-colors
                  duration-300
                  hover:border-[#1a1817]
                "
              >
                <span
                  className="
                    absolute
                    h-px
                    w-5
                    rotate-45
                    bg-current
                  "
                />

                <span
                  className="
                    absolute
                    h-px
                    w-5
                    -rotate-45
                    bg-current
                  "
                />
              </motion.button>
            </header>

            {items.length === 0 ? (
              <motion.div
                variants={contentVariants}
                initial="closed"
                animate="open"
                transition={{
                  delay: 0.18,
                  duration: 0.7,
                  ease: CART_EASE,
                }}
                className="
                  flex
                  min-h-0
                  flex-1
                  flex-col
                  justify-between
                  px-5
                  py-8
                  sm:px-8
                  sm:py-10
                "
              >
                <div className="pt-[12vh] sm:pt-[16vh]">
                  <h3
                    className="
                    font-merchant
                      max-w-[430px]
                      text-[clamp(3rem,11vw,5.6rem)]
                      font-light
                      leading-[0.9]
                      tracking-[-0.065em]
                    "
                  >
                    Your cart is empty.
                  </h3>

                  <p
                    className="
                      mt-6
                      max-w-[330px]
                      text-sm
                      leading-[1.7]
                      text-[#1a1817]
                    "
                  >
                    Explore the collection and add something made for slower,
                    warmer rooms.
                  </p>
                </div>

                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-between
                    border-t
                    border-[#1a1817]
                    py-5
                    text-sm
                    uppercase
                    tracking-[0.08em]
                  "
                >
                  <span>Explore lighting</span>

                  <span
                    className="
                      transition-transform
                      duration-500
                      ease-[cubic-bezier(0.76,0,0.24,1)]
                      group-hover:translate-x-2
                    "
                  >
                    →
                  </span>
                </Link>
              </motion.div>
            ) : (
              <>
                <motion.div
                  variants={contentVariants}
                  initial="closed"
                  animate="open"
                  transition={{
                    delay: 0.14,
                    duration: 0.7,
                    ease: CART_EASE,
                  }}
                  className="
                    min-h-0
                    flex-1
                    overflow-y-auto
                    overscroll-contain
                    px-5
                    py-6
                    sm:px-8
                    sm:py-8
                  "
                >
                  <div className="divide-y divide-[#1a1817]/15">
                    {items.map((item) => {
                      const variantLabel = getCartItemVariantLabel(item);
                      const reachedStockLimit = item.quantity >= item.stock;

                      return (
                        <article
                          key={item.variantId}
                          className="
                            grid
                            grid-cols-[92px_minmax(0,1fr)]
                            gap-4
                            py-6
                            first:pt-0
                            sm:grid-cols-[126px_minmax(0,1fr)]
                            sm:gap-6
                            sm:py-8
                          "
                        >
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={closeCart}
                            className="
                              group
                              relative
                              aspect-[4/5]
                              overflow-hidden
                              bg-[#deddd9]
                            "
                          >
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(max-width: 640px) 92px, 126px"
                                className="
                                  object-cover
                                  transition-transform
                                  duration-700
                                  ease-[cubic-bezier(0.76,0,0.24,1)]
                                  group-hover:scale-[1.035]
                                "
                              />
                            ) : (
                              <div
                                className="
                                  flex
                                  h-full
                                  items-center
                                  justify-center
                                  text-xs
                                  text-[#1a1817]/35
                                "
                              >
                                No image
                              </div>
                            )}
                          </Link>

                          <div className="flex min-w-0 flex-col">
                            <div>
                              <div
                                className="
                                  flex
                                  items-start
                                  justify-between
                                  gap-3
                                "
                              >
                                <Link
                                  href={`/products/${item.slug}`}
                                  onClick={closeCart}
                                  className="
                                    min-w-0
                                    text-[clamp(1.25rem,4vw,1.75rem)]
                                    font-light
                                    leading-[1.05]
                                    tracking-[-0.045em]
                                    transition-opacity
                                    hover:opacity-55
                                  "
                                >
                                  {item.title}
                                </Link>

                                <p
                                  className="
                                    shrink-0
                                    pt-1
                                    text-xs
                                    sm:text-sm
                                  "
                                >
                                  {formatPrice(item.price, item.currency)}
                                </p>
                              </div>

                              {variantLabel && (
                                <p
                                  className="
                                    mt-3
                                    text-xs
                                    capitalize
                                    text-[#1a1817]
                                  "
                                >
                                  {variantLabel}
                                </p>
                              )}

                              {item.stock > 0 && (
                                <p
                                  className="
                                    mt-1
                                    text-xs
                                    text-[#1a1817]/60
                                  "
                                >
                                  {item.stock} available
                                </p>
                              )}
                            </div>

                            <div
                              className="
                                mt-auto
                                flex
                                items-end
                                justify-between
                                gap-3
                                pt-5
                              "
                            >
                              <div
                                className="
                                  flex
                                  h-10
                                  items-center
                                  border
                                  border-[#1a1817]/20
                                "
                              >
                                <button
                                  type="button"
                                  aria-label={`Decrease quantity of ${item.title}`}
                                  onClick={() =>
                                    updateQuantity(
                                      item.variantId,
                                      item.quantity - 1,
                                    )
                                  }
                                  className="
                                    flex
                                    h-full
                                    w-9
                                    cursor-pointer
                                    items-center
                                    justify-center
                                    text-base
                                    transition-colors
                                    hover:bg-[#1a1817]
                                    hover:text-[#eeeeec]
                                  "
                                >
                                  −
                                </button>

                                <span
                                  className="
                                    flex
                                    h-full
                                    min-w-9
                                    items-center
                                    justify-center
                                    border-x
                                    border-[#1a1817]/20
                                    px-2
                                    text-xs
                                  "
                                >
                                  {item.quantity}
                                </span>

                                <button
                                  type="button"
                                  disabled={reachedStockLimit}
                                  aria-label={`Increase quantity of ${item.title}`}
                                  onClick={() =>
                                    updateQuantity(
                                      item.variantId,
                                      item.quantity + 1,
                                    )
                                  }
                                  className="
                                    flex
                                    h-full
                                    w-9
                                    cursor-pointer
                                    items-center
                                    justify-center
                                    text-base
                                    transition-colors
                                    hover:bg-[#1a1817]
                                    hover:text-[#eeeeec]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-25
                                    disabled:hover:bg-transparent
                                    disabled:hover:text-current
                                  "
                                >
                                  +
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeItem(item.variantId)}
                                className="
                                  cursor-pointer
                                  border-b
                                  border-transparent
                                  pb-0.5
                                  text-xs
                                  text-[#1a1817]/45
                                  transition
                                  hover:border-[#1a1817]
                                  hover:text-[#1a1817]
                                "
                              >
                                Remove
                              </button>
                            </div>

                            {reachedStockLimit && item.stock > 0 && (
                              <p
                                className="
                                  mt-3
                                  text-[11px]
                                  leading-relaxed
                                  text-[#1a1817]/35
                                "
                              >
                                Maximum available quantity reached.
                              </p>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </motion.div>

                <motion.footer
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.22,
                    duration: 0.7,
                    ease: CART_EASE,
                  }}
                  className="
                    shrink-0
                    border-t
                    border-[#1a1817]/15
                    bg-[#eeeeec]
                    px-5
                    pb-[max(20px,env(safe-area-inset-bottom))]
                    pt-5
                    sm:px-8
                    sm:pb-8
                    sm:pt-6
                  "
                >
                  <div
                    className="
                      mb-4
                      flex
                      items-end
                      justify-between
                      gap-5
                    "
                  >
                    <div>
                      <p
                        className="
                          mb-1
                          text-xs
                          uppercase
                          tracking-[0.12em]
                          text-[#1a1817]
                        "
                      >
                        Subtotal
                      </p>

                      <p className="text-xs text-[#1a1817]">
                        Shipping calculated at checkout
                      </p>
                    </div>

                    <p
                      className="
                        shrink-0
                        text-2xl
                        font-light
                        tracking-[-0.04em]
                      "
                    >
                      {formatPrice(subtotal, items[0]?.currency || "usd")}
                    </p>
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="
                        mb-4
                        text-sm
                        leading-relaxed
                        text-red-700
                      "
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={loading}
                    className="
    group
    relative
    min-h-16
    w-full
    cursor-pointer
    overflow-hidden
    border
    border-[#1a1817]
    bg-[#1a1817]
    px-6
    text-[#eeeeec]
    disabled:cursor-not-allowed
    disabled:opacity-35
  "
                  >
                    <span
                      className="
      absolute
      inset-0
      translate-y-full
      bg-[#eeeeec]
      transition-transform
      duration-500
      ease-[cubic-bezier(0.76,0,0.24,1)]
      group-hover:translate-y-0
    "
                    />

                    <span
                      className="
      relative
      z-10
      text-lg
      transition-colors
      duration-500
      group-hover:text-[#1a1817]
    "
                    >
                      {loading
                        ? "Starting checkout..."
                        : "Continue to checkout"}
                    </span>
                  </button>
                </motion.footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function getCartItemVariantLabel(item: {
  variantName?: string | null;
  color?: string | null;
}) {
  const variantName = item.variantName?.trim();
  const color = item.color?.trim();

  if (!variantName && !color) return "";

  if (
    variantName &&
    color &&
    variantName.toLowerCase() === color.toLowerCase()
  ) {
    return color;
  }

  if (variantName && color) {
    if (variantName.toLowerCase().includes(color.toLowerCase())) {
      return variantName;
    }

    return `${color} / ${variantName}`;
  }

  return color || variantName || "";
}
