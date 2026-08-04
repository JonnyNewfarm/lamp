// components/NavbarMobile.tsx
"use client";

import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import CartButton from "../cart/CartButton";

const NavbarMobile = () => {
  return (
    <div className="noise-bg fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-[#1a1817]/15 bg-[#eeeeec]/40 px-4 py-5 text-[#1a1817] backdrop-blur-md md:hidden">
      <Link
        href="/"
        className="text-xl font-medium uppercase tracking-[-0.04em]"
      >
        Calero
      </Link>

      <div className="flex items-center gap-8 text-lg font-medium">
        <BurgerMenu />
        <CartButton />
      </div>
    </div>
  );
};

export default NavbarMobile;
