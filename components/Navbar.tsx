"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full  hidden md:block fixed top-0 left-0 z-50">
      <div className=" font-extrabold text-[16px] text-[#161310] md:px-20 md:py-3 flex items-center z-50 w-full justify-between">
        <div className="w-full h-full">
          <div className="flex items-center justify-between">
            <div className="tracking-tighter">
              <h1 className="opacity-70 m-0 leading-none">Studio:</h1>
              <p className="m-0 leading-tight">Calero</p>
            </div>

            <div className="tracking-tighter">
              <h1 className="opacity-70 m-0 leading-none">Designed for:</h1>
              <p className="m-0 leading-tight">Focused work</p>
            </div>

            <div className="tracking-tighter">
              <h1 className="opacity-70 m-0 leading-none">Material:</h1>
              <p className="m-0 leading-tight">Wood, fabric, brass</p>
            </div>

            <div className="tracking-tighter">
              <h1 className="opacity-70 m-0 leading-none">Navigation:</h1>
              <div className="flex gap-x-1 m-0 leading-tight">
                <Link
                  className="hover:scale-103 transition-transform ease-in-out"
                  href="/"
                >
                  Home,
                </Link>
                <Link
                  className="hover:scale-103 transition-transform ease-in-out"
                  href="/shop"
                >
                  Shop,
                </Link>
                <Link
                  className="hover:scale-103 transition-transform ease-in-out"
                  href="/contact"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
