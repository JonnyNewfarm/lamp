// components/Navbar.tsx
"use client";

import Link from "next/link";
import CartButton from "./cart/CartButton";
import WaveLinkText from "./WaveLinkText";

const Navbar = () => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 py-4 text-white mix-blend-difference   md:px-8 md:py-6">
      <nav className="flex items-start justify-between">
        <Link
          href="/"
          className="text-xl font-black uppercase leading-none tracking-[-0.05em] md:text-2xl"
        >
          <WaveLinkText text="Calero" />
        </Link>

        <div className="flex flex-col items-end text-right gap-y-1.5  text-base font-black uppercase leading-[0.95] tracking-[-0.04em] md:text-xl">
          <Link href="/" className="hover:opacity-60">
            <WaveLinkText text="Home" />
          </Link>

          <Link href="/shop" className="hover:opacity-60">
            <WaveLinkText text="Shop" />
          </Link>

          <Link href="/contact" className="hover:opacity-60">
            <WaveLinkText text="Contact" />
          </Link>

          <CartButton />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
