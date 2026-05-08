// components/cart/CartProvider.tsx
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  productId: string;
  variantId: string;
  title: string;
  slug: string;
  variantName: string;
  color?: string | null;
  plugType?: string | null;
  image?: string | null;
  price: number;
  currency: string;
  quantity: number;
  stock: number;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalQuantity: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "calero-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const stored = window.localStorage.getItem(CART_STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[];

        setItems(
          parsed.map((item) => ({
            ...item,
            stock: typeof item.stock === "number" ? item.stock : 1,
            quantity: Math.min(
              item.quantity,
              typeof item.stock === "number" ? item.stock : item.quantity,
            ),
          })),
        );
      } catch {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, mounted]);

  function openCart() {
    setIsOpen(true);
  }

  function closeCart() {
    setIsOpen(false);
  }

  function addItem(item: CartItem) {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) => cartItem.variantId === item.variantId,
      );

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.variantId === item.variantId
            ? {
                ...cartItem,
                stock: item.stock,
                quantity: Math.min(
                  cartItem.quantity + item.quantity,
                  item.stock,
                ),
              }
            : cartItem,
        );
      }

      return [
        ...currentItems,
        {
          ...item,
          quantity: Math.min(item.quantity, item.stock),
        },
      ];
    });

    openCart();
  }

  function removeItem(variantId: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.variantId !== variantId),
    );
  }

  function updateQuantity(variantId: string, quantity: number) {
    setItems((currentItems) =>
      currentItems.flatMap((item) => {
        if (item.variantId !== variantId) return item;

        if (quantity <= 0) return [];

        return {
          ...item,
          quantity: Math.min(quantity, item.stock),
        };
      }),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalQuantity = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const value: CartContextValue = {
    items,
    isOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalQuantity,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
