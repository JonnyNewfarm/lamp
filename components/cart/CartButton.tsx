// components/cart/CartButton.tsx
"use client";

import { useCart } from "@/components/cart/CartProvider";

export default function CartButton() {
  const { openCart, totalQuantity } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="font-extrabold text-[16px] text-[#161310] cursor-pointer"
    >
      Cart ({totalQuantity})
    </button>
  );
}
