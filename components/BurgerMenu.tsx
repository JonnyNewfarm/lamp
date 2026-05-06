// components/BurgerMenu.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        className="relative z-[70] flex cursor-pointer items-center justify-center md:hidden"
      >
        <span
          className={`flex items-center gap-2 text-sm font-normal transition-colors ${
            isOpen ? "text-[#ecebeb]" : "text-[#161310]"
          }`}
        >
          <span
            className={`inline-block h-1.5 w-1.5 transition-colors ${
              isOpen ? "bg-[#ecebeb]" : "bg-[#161310]"
            }`}
          />
          {isOpen ? "Close" : "Menu"}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation overlay"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[55] bg-[#161310]/20 backdrop-blur-[2px] md:hidden"
            />

            <motion.div
              ref={menuRef}
              key="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="fixed right-0 top-0 z-[60] flex h-dvh w-[86vw] max-w-[420px] flex-col bg-[#161310] px-7 py-7 text-[#ecebeb] md:hidden"
            >
              <div className="flex items-start justify-between border-b border-[#ecebeb]/15 pb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#ecebeb]/45">
                    Navigation
                  </p>

                  <h2 className="mt-3 text-4xl font-light tracking-[-0.07em]">
                    Calero
                  </h2>
                </div>
              </div>

              <nav className="flex flex-1 flex-col justify-center">
                <div className="space-y-5">
                  {links.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.12 + index * 0.07,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center justify-between border-b border-[#ecebeb]/12 py-4 text-5xl font-light leading-none tracking-[-0.07em]"
                      >
                        <span>{link.label}</span>
                        <span className="h-px w-8 bg-[#ecebeb]/45 transition-all duration-500 group-hover:w-14" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              <div className="border-t border-[#ecebeb]/15 pt-6">
                <p className="text-sm leading-[1.7] text-[#ecebeb]/55">
                  Minimal lighting curated for calm interiors, focused work and
                  warm everyday spaces.
                </p>

                <div className="mt-6 flex items-center justify-between text-sm text-[#ecebeb]/45">
                  <span>Calero Studio</span>
                  <span>Lighting store</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default BurgerMenu;
