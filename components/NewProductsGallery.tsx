"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Scene from "./Scene";

type ProductItem = {
  id: string;
  number: string;
  title: string;
  slug: string;
  category: string;
  image: string;
};

type NewProductsGalleryProps = {
  products: ProductItem[];
};

export default function NewProductsGallery({
  products,
}: NewProductsGalleryProps) {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [selectedMobile, setSelectedMobile] = useState<number | null>(null);
  const [isSectionInView, setIsSectionInView] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const mousePosRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number | null>(null);

  const visibleProducts = products.slice(0, 6);

  const cleanTitle = (title: string) => {
    return title.split(/[–-]/)[0].trim();
  };

  const updateDesktopActiveFromMouse = useCallback(() => {
    if (window.innerWidth < 768) return;

    const element = document.elementFromPoint(
      mousePosRef.current.x,
      mousePosRef.current.y,
    );

    const item = element?.closest("[data-product-index]") as HTMLElement | null;

    if (!item) {
      setActiveMenu(null);
      return;
    }

    const index = Number(item.dataset.productIndex);

    if (Number.isNaN(index)) {
      setActiveMenu(null);
      return;
    }

    setActiveMenu(index);
  }, []);

  useEffect(() => {
    const updateMobileSelected = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionRect = section.getBoundingClientRect();
      const middle = window.innerHeight / 2;

      const inView = sectionRect.top <= middle && sectionRect.bottom >= middle;

      setIsSectionInView(inView);

      if (!inView) {
        setSelectedMobile(null);
        return;
      }

      let closestIndex = 0;
      let closestDistance = Infinity;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        const rect = item.getBoundingClientRect();
        const itemMiddle = rect.top + rect.height / 2;
        const distance = Math.abs(middle - itemMiddle);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setSelectedMobile(closestIndex);
    };

    const handleScroll = () => {
      updateMobileSelected();

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        updateDesktopActiveFromMouse();
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePosRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      updateDesktopActiveFromMouse();
    };

    const handleWheel = (event: WheelEvent) => {
      mousePosRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        updateMobileSelected();
        updateDesktopActiveFromMouse();
      });
    };

    updateMobileSelected();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [updateDesktopActiveFromMouse]);

  const selectedProduct =
    selectedMobile !== null ? visibleProducts[selectedMobile] : null;

  return (
    <section ref={sectionRef} className="relative w-full">
      <div className="hidden md:block">
        <Scene products={visibleProducts} activeMenu={activeMenu} />
      </div>

      {isSectionInView && selectedProduct && (
        <div className="pointer-events-none fixed right-4 top-1/2 z-[30] h-[145px] w-[115px] -translate-y-1/2 overflow-hidden sm:hidden">
          <Image
            src={selectedProduct.image}
            alt={cleanTitle(selectedProduct.title)}
            fill
            sizes="115px"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="relative z-[20] w-full">
        <div className=" px-4 py-7 md:px-4 md:py-8">
          <p className="sm:text-lg uppercase tracking-[0.22em] ">
            Recently added products
          </p>
        </div>

        <ul onMouseLeave={() => setActiveMenu(null)}>
          {visibleProducts.map((product, index) => {
            const title = cleanTitle(product.title);
            const isSelected = selectedMobile === index;

            return (
              <li
                key={product.id}
                data-product-index={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onMouseOver={() => setActiveMenu(index)}
                onPointerEnter={() => setActiveMenu(index)}
                className="border-t border-[#c9c9c9] last:border-b"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="block px-4 py-8 md:px-0 md:py-5"
                >
                  <div className="flex min-h-[105px] items-center pr-[130px] md:h-[88px] md:px-4 md:pr-0">
                    <h2
                      className={[
                        "text-[34px] leading-[0.95] tracking-[-0.06em] text-[#050505] transition-all duration-300 sm:text-[40px] md:text-[40px]",
                        isSelected
                          ? "font-semibold opacity-100 md:font-normal"
                          : "font-normal opacity-45 md:opacity-100",
                        !isSectionInView || selectedMobile === null
                          ? "font-normal opacity-100"
                          : "",
                      ].join(" ")}
                    >
                      {title}
                    </h2>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
