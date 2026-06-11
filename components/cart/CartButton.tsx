// components/cart/CartButton.tsx
"use client";

import { useCart } from "@/components/cart/CartProvider";
import WaveLinkText from "../WaveLinkText";

export default function CartButton() {
  const { openCart, totalQuantity } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="cursor-pointer text-right uppercase hover:opacity-60"
    >
      <WaveLinkText text={`Cart (${totalQuantity})`} />
    </button>
  );
}
