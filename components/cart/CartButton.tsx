"use client";

import { useCart } from "@/components/cart/CartProvider";
import NavigationButton from "./NavigationButton";

export default function CartButton() {
  const { openCart, totalQuantity } = useCart();

  return (
    <NavigationButton onClick={openCart}>
      Cart ({totalQuantity})
    </NavigationButton>
  );
}
