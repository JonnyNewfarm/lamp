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
          {/* OVERLAY */}
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
              bg-[#0f0e0d]/42
              backdrop-blur-[10px]
            "
          />

          {/* DRAWER */}
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
              border-l
              border-white/8
              bg-[#0e0d0c]
              text-[#ece8e1]
              shadow-[-24px_0_80px_rgba(0,0,0,0.28)]
            "
          >
            {/* HEADER */}
            <header
              className="
                flex
                h-[90px]
                shrink-0
                items-center
                justify-between
                px-5
                sm:h-[104px]
                sm:px-8
              "
            >
              <div className="flex items-baseline gap-3">
                <h2
                  className="
                    font-bueno
                    text-[clamp(2rem,4vw,2.4rem)]
                    font-light
                    leading-none
                  "
                >
                  Cart
                </h2>

                <span className="text-sm text-[#ece8e1]/35">
                  ({totalQuantity})
                </span>
              </div>

              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="
                  cursor-pointer
                  font-bueno
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.03em]
                  text-[#ece8e1]
                  transition-opacity
                  duration-300
                  hover:opacity-45
                "
              >
                Close
              </button>
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
                <div className="pt-[11vh] sm:pt-[15vh]">
                  <h3
                    className="
                      max-w-[420px]
                      font-bueno
                      text-[clamp(2rem,10vw,4.4rem)]
                      font-medium
                      leading-[0.88]
                      tracking-[-0.01em]
                      text-[#ece8e1]
                    "
                  >
                    Your cart is empty.
                  </h3>

                  <p
                    className="
                      mt-5
                      max-w-[340px]
                      text-sm
                      leading-[1.75]
                      text-[#ece8e1]/58
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
    w-fit
    items-center
    gap-2
    border-t-0
    py-5
    text-sm
    font-medium
    uppercase
    tracking-[0.08em]
    text-[#ece8e1]
    transition-opacity
    duration-300
    hover:opacity-60
  "
                >
                  <span>Explore lighting</span>

                  <span
                    className="
      inline-block
      -mt-3
      text-lg
      leading-none
      transition-transform
      duration-500
      ease-[cubic-bezier(0.16,1,0.3,1)]
      group-hover:translate-x-1
      group-hover:-translate-y-1
    "
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </Link>
              </motion.div>
            ) : (
              <>
                {/* ITEMS */}
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
                  <div className="divide-y divide-white/8">
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
                              bg-[#23201d]
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
                                  text-[#ece8e1]/30
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
                                    text-[#ece8e1]
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
                                    text-[#ece8e1]
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
                                    text-[#ece8e1]/58
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
                                    text-[#ece8e1]/38
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
                                  border-white/14
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
                                    text-[#ece8e1]
                                    transition-colors
                                    hover:bg-[#ece8e1]
                                    hover:text-[#171513]
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
                                    border-white/14
                                    px-2
                                    text-xs
                                    text-[#ece8e1]
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
                                    text-[#ece8e1]
                                    transition-colors
                                    hover:bg-[#ece8e1]
                                    hover:text-[#171513]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-25
                                    disabled:hover:bg-transparent
                                    disabled:hover:text-[#ece8e1]
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
                                  text-[#ece8e1]/42
                                  transition
                                  hover:border-[#ece8e1]
                                  hover:text-[#ece8e1]
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
                                  text-[#ece8e1]/30
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

                {/* FOOTER */}
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
                    border-white/8
                    bg-[#171513]
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
                          text-[#ece8e1]/52
                        "
                      >
                        Subtotal
                      </p>

                      <p className="text-xs text-[#ece8e1]/40">
                        Shipping calculated at checkout
                      </p>
                    </div>

                    <p
                      className="
                        shrink-0
                        text-2xl
                        font-light
                        tracking-[-0.04em]
                        text-[#ece8e1]
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
                        text-red-300
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
                      border-[#ece8e1]
                      bg-[#ece8e1]
                      px-6
                      text-[#171513]
                      disabled:cursor-not-allowed
                      disabled:opacity-35
                    "
                  >
                    <span
                      className="
                        absolute
                        inset-0
                        translate-y-full
                        bg-[#2a2623]
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
                        font-semibold
                        group-hover:text-[#ece8e1]
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
