"use client";

import Link from "next/link";
import CartButton from "./cart/CartButton";

const Navbar = () => {
  return (
    <div className="hidden fixed left-0 top-0 z-50 w-full md:block">
      <div className="w-full px-20 py-3 text-[16px] font-extrabold text-[#161310]">
        <div className="flex items-center justify-between">
          <div className="tracking-tighter">
            <h1 className="m-0 leading-none opacity-70">Studio:</h1>
            <p className="m-0 leading-tight">Calero</p>
          </div>

          <div className="tracking-tighter">
            <h1 className="opacity-70 m-0 leading-none">Selected by:</h1>
            <p className="m-0 leading-tight">Mood & function</p>
          </div>

          <div className="tracking-tighter">
            <h1 className="m-0 leading-none opacity-70">Curated for:</h1>
            <p className="m-0 leading-tight">Calm interiors</p>
          </div>

          <div className="tracking-tighter">
            <h1 className="m-0 leading-none opacity-70">Navigation:</h1>

            <div className="m-0 flex gap-x-1 leading-tight">
              <Link
                className="transition-transform ease-in-out hover:scale-103"
                href="/"
              >
                Home,
              </Link>

              <Link
                className="transition-transform ease-in-out hover:scale-103"
                href="/shop"
              >
                Shop,
              </Link>

              <CartButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
