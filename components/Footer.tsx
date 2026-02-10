import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#ecebeb]  text-[#161310] px-6 sm:px-12 py-8 min-h-60 flex flex-col justify-end">
      <div className="flex text-2xl flex-col gap-2 mb-6">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
      </div>

      <h1 className="text-4xl sm:text-6xl uppercase">Lamphouse</h1>
    </footer>
  );
};

export default Footer;
