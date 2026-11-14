"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import CartButton from "../cart/CartButton";
import NavigationLink from "../NavigationLink";
import { useHeroIntro } from "../HeroIntroContext";

const NAVIGATION_EASE = [0.76, 0, 0.24, 1] as const;
const EASE = [0.16, 1, 0.3, 1] as const;

const NAV_FADE_DURATION = 1.1;
const ITEM_DURATION = 0.95;
const ITEM_STAGGER = 0.09;
const ITEM_RISE = 14;

const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

type HeroState = {
  pathname: string;
  active: boolean;
};

function FadeItem({
  index,
  visible,
  children,
  className = "",
}: {
  index: number;
  visible: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: ITEM_RISE,
      }}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : ITEM_RISE,
      }}
      transition={{
        duration: ITEM_DURATION,
        delay: visible ? index * ITEM_STAGGER : 0,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { stage } = useHeroIntro();
  const { scrollY } = useScroll();

  const [isNavigationVisible, setIsNavigationVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [heroState, setHeroState] = useState<HeroState>({
    pathname,
    active: pathname === "/",
  });

  const previousScrollY = useRef(0);

  const introReady =
    pathname !== "/" || stage === "navigation" || stage === "complete";

  const showNavbar = isNavigationVisible || isMenuOpen;

  // HERO DETECTION
  useLayoutEffect(() => {
    if (pathname !== "/") {
      setHeroState({
        pathname,
        active: false,
      });
      return;
    }

    let observedHero: HTMLElement | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const getTriggerY = () => (window.innerWidth >= 768 ? 38 : 32);

    const updateHeroState = () => {
      const triggerY = getTriggerY();
      const hero = document.getElementById("calero-hero");

      let active: boolean;

      if (hero) {
        active = hero.getBoundingClientRect().bottom > triggerY;
      } else {
        const fallbackHeight = Math.max(window.innerHeight, 560);

        active = window.scrollY + triggerY < fallbackHeight;
      }

      setHeroState((previous) => {
        if (previous.pathname === pathname && previous.active === active) {
          return previous;
        }

        return { pathname, active };
      });
    };

    const setupIntersectionObserver = () => {
      intersectionObserver?.disconnect();

      if (!observedHero) return;

      const triggerY = Math.min(getTriggerY(), window.innerHeight - 2);

      const bottomMargin = Math.max(0, window.innerHeight - triggerY - 1);

      intersectionObserver = new IntersectionObserver(updateHeroState, {
        root: null,
        rootMargin: `-${triggerY}px 0px -${bottomMargin}px 0px`,
        threshold: 0,
      });

      intersectionObserver.observe(observedHero);
    };

    const observeHero = () => {
      const hero = document.getElementById("calero-hero");

      if (!hero || observedHero === hero) return;

      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();

      observedHero = hero;

      resizeObserver = new ResizeObserver(updateHeroState);

      resizeObserver.observe(hero);

      setupIntersectionObserver();
      updateHeroState();

      mutationObserver?.disconnect();
    };

    const handleScroll = () => {
      observeHero();
      updateHeroState();
    };

    const handleResize = () => {
      observeHero();
      setupIntersectionObserver();
      updateHeroState();
    };

    updateHeroState();
    observeHero();

    if (!observedHero) {
      mutationObserver = new MutationObserver(() => {
        observeHero();
        updateHeroState();
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleResize);
    window.addEventListener("pageshow", handleScroll);

    const frame = requestAnimationFrame(() => {
      observeHero();
      updateHeroState();
    });

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pageshow", handleScroll);

      intersectionObserver?.disconnect();
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [pathname]);

  const isOverHero =
    heroState.pathname === pathname ? heroState.active : pathname === "/";

  // NAVBAR VISIBILITY
  useMotionValueEvent(scrollY, "change", (currentScrollY) => {
    if (isMenuOpen) return;

    const previous = previousScrollY.current;
    const difference = currentScrollY - previous;

    if (currentScrollY < 40) {
      setIsNavigationVisible(true);
      previousScrollY.current = currentScrollY;
      return;
    }

    if (Math.abs(difference) < 4) return;

    setIsNavigationVisible(difference < 0);
    previousScrollY.current = currentScrollY;
  });

  // ROUTE CHANGES
  useEffect(() => {
    setIsMenuOpen(false);
    setIsNavigationVisible(true);
    previousScrollY.current = window.scrollY;
  }, [pathname]);

  // MOBILE SCROLL LOCK
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  // COLORS
  const useLightText = isOverHero || isMenuOpen;

  const navbarTextColor = useLightText
    ? "text-[#eeeeec] dark:text-[#eeeeec]"
    : "text-[#1a1817] dark:text-[#eeeeec]";

  return (
    <>
      <motion.header
        initial={{
          opacity: 0,
          y: -12,
        }}
        animate={{
          opacity: introReady ? 1 : 0,
          y: showNavbar ? 0 : "-120%",
        }}
        transition={{
          opacity: {
            duration: NAV_FADE_DURATION,
            delay: introReady ? 0.05 : 0,
            ease: EASE,
          },
          y: {
            duration: 0.55,
            ease: NAVIGATION_EASE,
          },
        }}
        style={{
          pointerEvents: introReady ? "auto" : "none",
        }}
        className={`
          fixed
          left-0
          top-0
          z-[70]
          w-full
          px-4
          py-4
          transition-colors
          duration-300
          md:px-8
          md:py-6
          ${navbarTextColor}
        `}
      >
        <nav
          className="
            flex
            w-full
            items-start
            justify-between
            md:gap-x-4
          "
        >
          {/* 01 — BRAND */}
          <FadeItem
            index={0}
            visible={introReady}
            className="
              relative
              z-10
              min-w-0
              md:shrink-0
            "
          >
            <Link
              href="/"
              aria-label="Calero home"
              className="
                inline-flex
                items-center
                whitespace-nowrap
                text-xl
                font-medium
                leading-[1.2]
                md:text-[20px]
              "
            >
              Calero Studio
            </Link>
          </FadeItem>

          {/* 02 — TAGLINE */}
          <FadeItem
            index={1}
            visible={introReady}
            className="
              hidden
              shrink-0
              whitespace-nowrap
              text-[20px]
              font-medium
              leading-[1.2]
              md:block
            "
          >
            Calm by Design.
          </FadeItem>

          {/* 03 — SECOND TAGLINE */}
          <FadeItem
            index={2}
            visible={introReady}
            className="
              hidden
              shrink-0
              whitespace-nowrap
              text-[20px]
              font-medium
              leading-[1.2]
              md:block
            "
          >
            <div className="flex flex-col items-start gap-y-0.5">
              <span>Light for living</span>
              <span>Made for quieter spaces</span>
            </div>
          </FadeItem>

          {/* 04 — VERTICAL NAVIGATION */}
          <div
            className="
              hidden
              shrink-0
              flex-col
              items-start
              gap-y-0.5
              whitespace-nowrap
              text-[20px]
              font-medium
              leading-[1.2]
              tracking-[-0.02em]
              md:flex
              [&_a]:!text-[20px]
              [&_span]:!text-[20px]
            "
          >
            <FadeItem index={3} visible={introReady}>
              <NavigationLink href="/">Home</NavigationLink>
            </FadeItem>

            <FadeItem index={4} visible={introReady}>
              <NavigationLink href="/shop">Shop</NavigationLink>
            </FadeItem>

            <FadeItem index={5} visible={introReady}>
              <NavigationLink href="/contact">Contact</NavigationLink>
            </FadeItem>
          </div>

          {/* 05 — CART */}
          <FadeItem
            index={6}
            visible={introReady}
            className="
              hidden
              shrink-0
              whitespace-nowrap
              text-[20px]
              font-medium
              leading-[1.2]
              tracking-[-0.02em]
              md:block
              [&_a]:!text-[20px]
              [&_button]:!text-[20px]
              [&_span]:!text-[20px]
            "
          >
            <CartButton />
          </FadeItem>

          {/* MOBILE CONTROLS */}
          <FadeItem
            index={1}
            visible={introReady}
            className="
              relative
              z-10
              flex
              items-center
              gap-5
              text-base
              font-medium
              uppercase
              leading-none
              tracking-[-0.01em]
              md:hidden
            "
          >
            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
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
                    ease: EASE,
                  }}
                  className="
                    block
                    origin-center
                    text-base
                    font-medium
                    leading-none
                    [backface-visibility:hidden]
                  "
                >
                  {isMenuOpen ? "Close" : "Menu"}
                </motion.span>
              </AnimatePresence>
            </button>

            <CartButton />
          </FadeItem>
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
                <h2 className="mb-4">Navigation:</h2>

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
                        ease: EASE,
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
}
