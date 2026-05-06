// components/cart/ClearCartOnSuccess.tsx
"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/components/cart/CartProvider";

export default function ClearCartOnSuccess() {
  const { clearCart } = useCart();
  const hasCleared = useRef(false);

  useEffect(() => {
    if (hasCleared.current) return;

    hasCleared.current = true;
    clearCart();
  }, []);

  return null;
}
