// components/Navbar.tsx
"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

import CartButton from "./cart/CartButton";
import NavigationLink from "./NavigationLink";

const Navbar = () => {
  const { scrollY } = useScroll();

  const [isNavigationVisible, setIsNavigationVisible] = useState(true);
  const previousScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (currentScrollY) => {
    const previous = previousScrollY.current;
    const difference = currentScrollY - previous;

    if (currentScrollY < 40) {
      setIsNavigationVisible(true);
      previousScrollY.current = currentScrollY;
      return;
    }

    if (Math.abs(difference) < 4) {
      return;
    }

    setIsNavigationVisible(difference < 0);
    previousScrollY.current = currentScrollY;
  });

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 py-4 text-white mix-blend-difference md:px-8 md:py-6">
      <nav className="flex items-start justify-between">
        <Link
          href="/"
          className="text-xl font-black uppercase leading-none tracking-[-0.05em] md:text-2xl"
        >
          Calero
        </Link>

        <motion.div
          initial={false}
          animate={{
            y: isNavigationVisible ? 0 : "-120%",
            opacity: isNavigationVisible ? 1 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="flex flex-col items-end gap-y-1.5 text-right text-base font-black uppercase leading-[0.95] tracking-[-0.04em] md:text-xl"
        >
          <NavigationLink href="/">Home</NavigationLink>

          <NavigationLink href="/shop">Shop</NavigationLink>

          <NavigationLink href="/contact">Contact</NavigationLink>

          <CartButton />
        </motion.div>
      </nav>
    </header>
  );
};

export default Navbar;
