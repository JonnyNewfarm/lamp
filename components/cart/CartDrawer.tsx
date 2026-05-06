// components/cart/CartDrawer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/formatPrice";

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
    <>
      {isOpen && (
        <button
          type="button"
          onClick={closeCart}
          className="fixed inset-0 z-40 bg-[#161310]/20"
          aria-label="Close cart"
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-[480px] bg-[#ecebeb] text-[#161310] transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-[#161310]/15 px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#161310]/45">
              Cart
            </p>
            <p className="mt-1 text-sm text-[#161310]/55">
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
            </p>
          </div>

          <button type="button" onClick={closeCart} className="text-sm">
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center px-6 text-center">
            <h2 className="text-5xl font-light tracking-[-0.07em]">
              Your cart is empty.
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-[1.8] text-[#161310]/55">
              Add a lamp from the shop to continue.
            </p>

            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-8 bg-[#161310] px-7 py-4 text-sm text-[#ecebeb]"
            >
              Shop lighting
            </Link>
          </div>
        ) : (
          <div className="flex h-[calc(100vh-80px)] flex-col">
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <article
                    key={item.variantId}
                    className="grid grid-cols-[96px_1fr] gap-5 border-b border-[#161310]/15 pb-6"
                  >
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={closeCart}
                      className="relative aspect-square bg-[#f4f3f0]"
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="96px"
                          className="object-contain p-3"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-[#161310]/35">
                          No image
                        </div>
                      )}
                    </Link>

                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={closeCart}
                            className="text-lg font-light tracking-[-0.04em]"
                          >
                            {item.title}
                          </Link>

                          <p className="mt-1 text-sm text-[#161310]/45">
                            {item.variantName}
                          </p>

                          {item.color && (
                            <p className="mt-1 text-sm text-[#161310]/45">
                              {item.color}
                            </p>
                          )}
                        </div>

                        <p className="text-sm">
                          {formatPrice(item.price, item.currency)}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center border border-[#161310]/15">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity - 1)
                            }
                            className="h-10 w-10"
                          >
                            -
                          </button>

                          <span className="w-10 text-center text-sm">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.variantId, item.quantity + 1)
                            }
                            className="h-10 w-10"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.variantId)}
                          className="text-sm text-[#161310]/45 hover:text-[#161310]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="border-t border-[#161310]/15 p-6">
              <div className="mb-5 flex items-center justify-between text-sm">
                <p className="text-[#161310]/50">Subtotal</p>
                <p>{formatPrice(subtotal, items[0]?.currency || "usd")}</p>
              </div>

              <p className="mb-5 text-xs leading-[1.7] text-[#161310]/45">
                Shipping and taxes are calculated at checkout.
              </p>

              {error && <p className="mb-4 text-sm text-red-700">{error}</p>}

              <button
                type="button"
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-[#161310] px-8 py-5 text-sm text-[#ecebeb] transition hover:bg-[#2a261f] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Starting checkout..." : "Checkout"}
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
