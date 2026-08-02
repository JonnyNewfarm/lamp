"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

import CartButton from "./cart/CartButton";
import NavigationLink from "./NavigationLink";
import CaleroLogo from "./navbar/CaleroLogo";

const NAVIGATION_EASE = [0.76, 0, 0.24, 1] as const;

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
    <header
      className="
        fixed
        left-0
        top-0
        z-50
        w-full
        px-4
        py-4
        text-white
        mix-blend-difference
        md:px-8
        md:py-6
      "
    >
      <nav className="flex items-start justify-between">
        <Link
          href="/"
          aria-label="Calero home"
          className="
            flex
            flex-col
            items-center
          "
        >
          <CaleroLogo className="h-12 w-12 md:h-14 md:w-14" />
        </Link>

        <motion.div
          initial={false}
          animate={{
            y: isNavigationVisible ? 0 : "-120%",
            opacity: isNavigationVisible ? 1 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: NAVIGATION_EASE,
          }}
          className="
            flex
            flex-col
            items-end
            gap-y-1.5
            text-right
            text-base
            font-semibold
            uppercase
            leading-[0.95]
            tracking-[-0.01em]
            md:text-xl
          "
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
