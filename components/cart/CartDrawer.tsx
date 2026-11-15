"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/formatPrice";

const ease = [0.16, 1, 0.3, 1] as const;

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
    y: 16,
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
              duration: 0.5,
              ease,
            }}
            className="
              fixed
              inset-0
              z-[9998]
              cursor-default
              bg-black/55
              backdrop-blur-[8px]
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
              duration: 0.75,
              ease,
            }}
            className="
              fixed
              inset-y-0
              right-0
              z-[9999]
              flex
              h-dvh
              w-full
              max-w-[560px]
              flex-col
              overflow-hidden
              bg-[#0c0b0a]
              font-sans
              text-[#eeeeec]
            "
          >
            {/* HEADER */}
            <header
              className="
                flex
                shrink-0
                items-start
                justify-between
                px-5
                pb-8
                pt-7
                sm:px-9
                sm:pb-12
                sm:pt-9
              "
            >
              <h2
                className="
                  text-[28px]
                  font-medium
                  leading-none
                  tracking-[-0.01em]
                  sm:text-[22px]
                "
              >
                Cart
                <span className="ml-2 text-[#eeeeec]/45">
                  ({totalQuantity})
                </span>
              </h2>

              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="
                  cursor-pointer
                  text-[14px]
                  font-medium
                  leading-none
                  text-[#eeeeec]
                  transition-opacity
                  duration-300
                  hover:opacity-50
                  focus-visible:outline
                  focus-visible:outline-offset-4
                "
              >
                Close
              </button>
            </header>

            {items.length === 0 ? (
              /* EMPTY CART */
              <motion.div
                variants={contentVariants}
                initial="closed"
                animate="open"
                transition={{
                  delay: 0.15,
                  duration: 0.8,
                  ease,
                }}
                className="
                  flex
                  min-h-0
                  flex-1
                  flex-col
                  justify-between
                  px-5
                  pb-[max(28px,env(safe-area-inset-bottom))]
                  pt-16
                  sm:px-9
                  sm:pb-9
                  sm:pt-24
                "
              >
                <div>
                  <h3
                    className="
                      text-[clamp(32px,4vw,48px)]
                      font-medium
                      leading-[1.05]
                      tracking-[-0.01em]
                    "
                  >
                    Your cart is empty.
                  </h3>

                  <p
                    className="
                      mt-5
                      max-w-[340px]
                      text-[15px]
                      font-normal
                      leading-[1.6]
                      text-[#eeeeec]/55
                    "
                  >
                    Explore the collection and discover lighting made for
                    quieter, more considered spaces.
                  </p>
                </div>

                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="
                    group
                    inline-flex
                    w-fit
                    items-center
                    gap-3
                    text-[17px]
                    font-medium
                    tracking-[-0.025em]
                    transition-opacity
                    duration-300
                    hover:opacity-60
                  "
                >
                  Explore collection
                  <span
                    aria-hidden="true"
                    className="
                      inline-block
                      transition-transform
                      duration-500
                      ease-[cubic-bezier(0.16,1,0.3,1)]
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                    "
                  >
                    ↗
                  </span>
                </Link>
              </motion.div>
            ) : (
              <>
                {/* CART ITEMS */}
                <motion.div
                  variants={contentVariants}
                  initial="closed"
                  animate="open"
                  transition={{
                    delay: 0.12,
                    duration: 0.75,
                    ease,
                  }}
                  className="
                    min-h-0
                    flex-1
                    overflow-y-auto
                    overscroll-contain
                    px-5
                    pb-10
                    sm:px-9
                  "
                >
                  <div className="flex flex-col gap-9">
                    {items.map((item) => {
                      const variantLabel = getCartItemVariantLabel(item);

                      const reachedStockLimit = item.quantity >= item.stock;

                      return (
                        <article
                          key={item.variantId}
                          className="
                            grid
                            grid-cols-[105px_minmax(0,1fr)]
                            items-start
                            gap-4
                            sm:grid-cols-[138px_minmax(0,1fr)]
                            sm:gap-6
                          "
                        >
                          {/* PRODUCT IMAGE */}
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={closeCart}
                            className="
                              group
                              relative
                              block
                              aspect-[4/5]
                              w-full
                              overflow-hidden
                              bg-[#292724]
                            "
                          >
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(max-width: 640px) 105px, 138px"
                                className="
                                  object-cover
                                  transition-transform
                                  duration-[900ms]
                                  ease-[cubic-bezier(0.16,1,0.3,1)]
                                  group-hover:scale-[1.045]
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
                                  text-[#eeeeec]/35
                                "
                              >
                                No image
                              </div>
                            )}
                          </Link>

                          {/* PRODUCT INFORMATION */}
                          <div
                            className="
                              flex
                              min-h-[131px]
                              min-w-0
                              flex-col
                              sm:min-h-[172px]
                            "
                          >
                            <div>
                              <Link
                                href={`/products/${item.slug}`}
                                onClick={closeCart}
                                className="
                                  block
                                  max-w-[310px]
                                  text-[17px]
                                  font-medium
                                  leading-[1.15]
                                  tracking-[-0.035em]
                                  transition-opacity
                                  duration-300
                                  hover:opacity-55
                                  sm:text-[20px]
                                "
                              >
                                {item.title}
                              </Link>

                              {variantLabel && (
                                <p
                                  className="
                                    mt-2
                                    text-[12px]
                                    capitalize
                                    text-[#eeeeec]/50
                                    sm:text-[13px]
                                  "
                                >
                                  {variantLabel}
                                </p>
                              )}

                              <p
                                className="
                                  mt-3
                                  text-[14px]
                                  font-medium
                                  tracking-[-0.02em]
                                  sm:text-[15px]
                                "
                              >
                                {formatPrice(item.price, item.currency)}
                              </p>
                            </div>

                            {/* QUANTITY / REMOVE */}
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
                                    h-10
                                    w-10
                                    cursor-pointer
                                    items-center
                                    justify-center
                                    text-[18px]
                                    font-normal
                                    transition-colors
                                    duration-300
                                    hover:bg-[#1c1b18]
                                  "
                                >
                                  −
                                </button>

                                <span
                                  className="
                                    flex
                                    h-10
                                    min-w-8
                                    items-center
                                    justify-center
                                    text-[13px]
                                    font-medium
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
                                    h-10
                                    w-10
                                    cursor-pointer
                                    items-center
                                    justify-center
                                    text-[18px]
                                    font-normal
                                    transition-colors
                                    duration-300
                                    hover:bg-[#1c1b18]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-25
                                    disabled:hover:bg-transparent
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
                                  pb-3
                                  text-[12px]
                                  font-normal
                                  text-[#eeeeec]/45
                                  transition-colors
                                  duration-300
                                  hover:text-[#eeeeec]
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
                                  leading-[1.4]
                                  text-[#eeeeec]/40
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
                  variants={contentVariants}
                  initial="closed"
                  animate="open"
                  transition={{
                    delay: 0.18,
                    duration: 0.75,
                    ease,
                  }}
                  className="
                    shrink-0
bg-[#0c0b0a]                    px-5
                    pb-[max(24px,env(safe-area-inset-bottom))]
                    pt-6
                    sm:px-9
                    sm:pb-9
                    sm:pt-8
                  "
                >
                  {/* SUBTOTAL */}
                  <div
                    className="
                      flex
                      items-baseline
                      justify-between
                      gap-4
                    "
                  >
                    <span
                      className="
                        text-[18px]
                        font-medium
                        tracking-[-0.03em]
                      "
                    >
                      Subtotal
                    </span>

                    <span
                      className="
                        text-[24px]
                        font-medium
                        tracking-[-0.04em]
                      "
                    >
                      {formatPrice(subtotal, items[0]?.currency || "usd")}
                    </span>
                  </div>

                  <p
                    className="
                      mt-1
                      text-[12px]
                      text-[#eeeeec]/45
                    "
                  >
                    Shipping calculated at checkout
                  </p>

                  {error && (
                    <p
                      role="alert"
                      className="
                        mt-5
                        text-[13px]
                        leading-[1.5]
                        text-red-300
                      "
                    >
                      {error}
                    </p>
                  )}

                  {/* CHECKOUT */}
                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={loading}
                    className="
                      group
                      mt-7
                      flex
                      min-h-[60px]
                      w-full
                      cursor-pointer
                      items-center
                      justify-between
                      gap-4
                      bg-[#eeeeec]
                      px-5
                      text-[#1a1817]
                      transition-colors
                      duration-300
                      hover:bg-[#d8d7d4]
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                      sm:px-6
                    "
                  >
                    <span
                      className="
                        text-[17px]
                        font-medium
                        tracking-[-0.025em]
                      "
                    >
                      {loading
                        ? "Starting checkout..."
                        : "Continue to checkout"}
                    </span>

                    <span
                      aria-hidden="true"
                      className="
                        text-[21px]
                        transition-transform
                        duration-500
                        ease-[cubic-bezier(0.16,1,0.3,1)]
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                      "
                    >
                      ↗
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
