"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import CartButton from "../cart/CartButton";
import NavigationLink from "../NavigationLink";
import CaleroLogo from "./CaleroLogo";

const NAVIGATION_EASE = [0.76, 0, 0.24, 1] as const;
const MENU_EASE = [0.16, 1, 0.3, 1] as const;

const mobileLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/shop",
    label: "Shop",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const [isNavigationVisible, setIsNavigationVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const previousScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (currentScrollY) => {
    if (isMenuOpen) {
      return;
    }

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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        initial={{
          opacity: 0,
          y: -16,
        }}
        animate={{
          opacity: 1,
          y: isNavigationVisible || isMenuOpen ? 0 : "-120%",
        }}
        transition={{
          opacity: {
            duration: 0.8,
            delay: 0.1,
            ease: MENU_EASE,
          },
          y: {
            duration: 0.5,
            ease: NAVIGATION_EASE,
          },
        }}
        className="
          fixed
          left-0
          top-0
          z-[70]
          w-full
          px-4
          py-4
          text-[#1a1817]
          dark:text-[#eeeeec]
          md:px-8
          md:py-6
        "
      >
        <nav className="flex items-start justify-between">
          <Link
            href="/"
            aria-label="Calero home"
            className={`
              relative
              z-10
              flex
              flex-col
              items-center
              transition-colors
              duration-300
              ${
                isMenuOpen
                  ? "text-[#eeeeec]"
                  : "text-[#1a1817] dark:text-[#eeeeec]"
              }
            `}
          >
            <CaleroLogo className="h-12  w-12 md:h-14 md:w-14" />
          </Link>

          {/* Desktop navigation */}
          <motion.div
            initial={{
              opacity: 0,
              y: -14,
            }}
            animate={{
              opacity: isNavigationVisible ? 1 : 0,
              y: isNavigationVisible ? 0 : -20,
            }}
            transition={{
              opacity: {
                duration: 0.65,
                delay: 0.2,
                ease: MENU_EASE,
              },
              y: {
                duration: 0.55,
                delay: 0.15,
                ease: MENU_EASE,
              },
            }}
            className="
              hidden
              items-center
              gap-x-6
              text-right
              text-2xl
              font-semibold
              uppercase
              leading-[0.95]
              tracking-[-0.045em]
              md:flex
            "
          >
            <NavigationLink href="/">Home</NavigationLink>

            <NavigationLink href="/shop">Shop</NavigationLink>

            <NavigationLink href="/contact">Contact</NavigationLink>

            <CartButton />
          </motion.div>

          {/* Mobile controls */}
          <div
            className={`
              relative
              z-10
              flex
              items-center
              gap-5
              text-base
              font-semibold
              uppercase
              leading-none
              tracking-[-0.01em]
              transition-colors
              duration-300
              md:hidden
              ${
                isMenuOpen
                  ? "text-[#eeeeec]"
                  : "text-[#1a1817] dark:text-[#eeeeec]"
              }
            `}
          >
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen((current) => !current);
              }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="
                flex
                cursor-pointer
                items-center
                gap-2
              "
            >
              <span aria-hidden="true" className="relative block h-4 w-4">
                <motion.span
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: 7.5,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: NAVIGATION_EASE,
                  }}
                  className="
      absolute
      left-0
      top-0
      block
      h-[1px]
      w-4
      origin-center
      bg-current
      will-change-transform
    "
                />

                <motion.span
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: 7.5,
                    opacity: isMenuOpen ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: NAVIGATION_EASE,
                  }}
                  className="
      absolute
      left-0
      top-0
      block
      h-[1px]
      w-4
      origin-center
      bg-current
      will-change-transform
    "
                />
              </span>

              <span className="uppercase">Menu</span>
            </button>

            <CartButton />
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              clipPath: "inset(0 0 100% 0)",
            }}
            animate={{
              clipPath: "inset(0 0 0% 0)",
            }}
            exit={{
              clipPath: "inset(0 0 100% 0)",
            }}
            transition={{
              duration: 0.8,
              ease: NAVIGATION_EASE,
            }}
            className="
              fixed
              inset-0
              z-[60]
              bg-[#1a1817]
              text-[#eeeeec]
              md:hidden
            "
          >
            <div className="relative h-full w-full px-4">
              {/* Vertically centered mobile links */}
              <nav
                className="
                  absolute
                  left-4
                  right-4
                  top-1/2
                  -translate-y-1/2
                "
              >
                <h1 className="uppercase mb-4">Navigation</h1>
                {mobileLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{
                      opacity: 0,
                      y: 50,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 20,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: 0.18 + index * 0.07,
                      ease: MENU_EASE,
                    }}
                    className="
                      border-white/20
                      py-5
                    "
                  >
                    <Link
                      href={link.href}
                      onClick={() => {
                        setIsMenuOpen(false);
                      }}
                      className="
                        flex
                        items-center
                        justify-between
                        text-[11vw]
                        font-medium
                        uppercase
                        
                        leading-[0.9]
                        tracking-[-0.045em]
                      "
                    >
                      <span>{link.label}</span>

                      <span
                        className="
                          text-sm
                          font-semibold
                          tracking-normal
                          text-white/50
                        "
                      >
                        0{index + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom information */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.42,
                  ease: MENU_EASE,
                }}
                className="
                  absolute
                  bottom-6
                  right-4
                  flex
                  items-end
                  justify-between
                  pt-5
                  font-medium
                  tracking-[0.08em]
                  text-white/90
                "
              >
                <span className="font-merchant text-4xl">Calero</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
