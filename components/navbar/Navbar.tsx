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
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
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
          {/* LOGO */}
          <Link
            href="/"
            aria-label="Calero home"
            className="
              relative
              z-10
              text-xl
              flex
              shrink-0
              items-center
              font-semibold
              justify-center
            "
          >
            Calero Studio{" "}
          </Link>
          <p
            className="
    hidden
    whitespace-nowrap
    text-[16px]
    font-medium
    leading-none
    lg:block
  "
          >
            Calm by Design.
          </p>

          {/* DESKTOP NAVIGATION */}
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
              font-bueno
              text-xl
              font-semibold
              uppercase
              leading-[0.95]
              tracking-[-0.03em]
              md:flex
            "
          >
            <NavigationLink href="/">Home</NavigationLink>

            <NavigationLink href="/shop">Shop</NavigationLink>

            <NavigationLink href="/contact">Contact</NavigationLink>

            <CartButton />
          </motion.div>

          {/* MOBILE CONTROLS */}
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
              ${isMenuOpen ? "text-[#eeeeec]" : "text-[#1a1817]"}
            `}
          >
            {/* ANIMATED MENU / CLOSE */}
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen((current) => !current);
              }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="
                relative
                flex
                h-8
                min-w-[3.5rem]
                cursor-pointer
                items-center
                justify-start
                [perspective:600px]
              "
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMenuOpen ? "close" : "menu"}
                  initial={{
                    rotateX: -90,
                    y: 8,
                    opacity: 0,
                  }}
                  animate={{
                    rotateX: 0,
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotateX: 90,
                    y: -8,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.24,
                    ease: MENU_EASE,
                  }}
                  className="
                    block
                    origin-center
                    font-bueno
                    text-base
                    font-semibold
                    uppercase
                    leading-none
                    [backface-visibility:hidden]
                  "
                >
                  {isMenuOpen ? "Close" : "Menu"}
                </motion.span>
              </AnimatePresence>
            </button>

            <CartButton />
          </div>
        </nav>
      </motion.header>

      {/* MOBILE FULLSCREEN MENU */}
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
              {/* NAVIGATION LINKS */}
              <nav
                aria-label="Mobile navigation"
                className="
                  absolute
                  left-4
                  right-4
                  top-1/2
                  -translate-y-1/2
                "
              >
                <h2 className="mb-4 ">Navigation:</h2>

                {mobileLinks.map((link, index) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname === link.href ||
                        pathname.startsWith(`${link.href}/`) ||
                        (link.href === "/shop" &&
                          pathname.startsWith("/products/"));

                  return (
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
                      className="py-5"
                    >
                      <Link
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setIsMenuOpen(false)}
                        className={`
          flex
          items-center
          justify-between
          font-bueno
          text-[11vw]
          font-medium
          uppercase
          leading-[0.9]
          tracking-[0.01em]
          text-[#eeeeec]
          transition-opacity
          duration-500
          ease-[cubic-bezier(0.16,1,0.3,1)]
          hover:opacity-100
          ${isActive ? "opacity-100" : "opacity-35"}
        `}
                      >
                        <span>{link.label}</span>

                        <span
                          className="
            text-sm
            font-semibold
            tracking-normal
          "
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
