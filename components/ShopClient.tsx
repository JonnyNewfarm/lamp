"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import MagneticComp from "./MagneticComp";

type ColorKey = "green" | "red" | "white";

const COLORS: {
  key: ColorKey;
  label: string;
  images: [string, string];
  swatch: string;
}[] = [
  {
    key: "green",
    label: "Green",
    images: ["/green-lamp.jpg", "/green-lamp2.jpg"],
    swatch: "#71978d",
  },
  {
    key: "red",
    label: "Red",
    images: ["/red-lamp.jpg", "/red-lamp2.jpg"],
    swatch: "#a0574b",
  },
  {
    key: "white",
    label: "White",
    images: ["/white-lamp.jpg", "/white-lamp2.jpg"],
    swatch: "#e2e2e2",
  },
];

export default function ShopPage() {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState<ColorKey>("green");
  const [view, setView] = useState<0 | 1>(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const active = useMemo(() => COLORS.find((c) => c.key === color)!, [color]);
  const activeImage = active.images[view];

  const buy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color }),
      });
      if (!res.ok) throw new Error("Checkout failed");

      const { url } = await res.json();
      if (!url) throw new Error("No checkout url returned");

      window.location.assign(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SmoothScroll>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 p-5 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            <Image
              src={activeImage}
              alt={`Good Light Lamp — ${active.label}`}
              fill
              priority
              quality={100}
              className="object-contain"
            />
          </div>
        </div>
      )}

      <main className="min-h-screen bg-[#ecebeb] text-[#161310]">
        <section className="px-6 mt-10 pt-16 pb-16">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div className="text-xs tracking-wide text-black/60">
                Product / Desk Lamp
              </div>

              <h1 className="mt-6 text-5xl leading-[0.95] font-semibold text-[#161310]">
                Good light
                <br />
                doesn’t shout.
              </h1>

              <p className="mt-6 text-base leading-relaxed text-black/70 max-w-md">
                Calm, focused light for desk work. Built to disappear into the
                room and let you concentrate.
              </p>

              <div className="mt-10">
                <div className="text-xs tracking-wide text-black/60">Color</div>

                <div className="mt-3 flex items-center gap-3">
                  {COLORS.map((c) => {
                    const selected = c.key === color;
                    return (
                      <button
                        key={c.key}
                        type="button"
                        onClick={() => {
                          setColor(c.key);
                          setView(0);
                        }}
                        className={`h-9 w-9 border cursor-pointer transition ${
                          selected ? "border-black" : "border-black/30"
                        }`}
                        aria-label={c.label}
                        title={c.label}
                        style={{ backgroundColor: c.swatch }}
                      />
                    );
                  })}

                  <div className="ml-3 text-sm text-black/70">
                    {active.label}
                  </div>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <MagneticComp>
                  <button
                    onClick={buy}
                    disabled={loading}
                    className="border cursor-pointer whitespace-nowrap text-nowrap border-black/50 px-6 py-3 text-sm text-black/90 hover:bg-[#161310] hover:text-white transition disabled:opacity-50"
                  >
                    {loading ? "Redirecting…" : "Buy — €79"}
                  </button>
                </MagneticComp>

                <Link
                  href="/"
                  className="text-sm text-black/70 hover:text-black underline underline-offset-4"
                >
                  Back to story
                </Link>
              </div>

              <div className="mt-12 border-t border-black/20 pt-8">
                <div className="grid grid-cols-2 gap-x-10 gap-y-6 text-sm">
                  <div>
                    <div className="text-xs tracking-wide text-black/60">
                      Designed for
                    </div>
                    <div className="mt-1 text-black/90">Focused work</div>
                  </div>

                  <div>
                    <div className="text-xs tracking-wide text-black/60">
                      Material
                    </div>
                    <div className="mt-1 text-black/90">Wood, metal</div>
                  </div>

                  <div>
                    <div className="text-xs tracking-wide text-black/60">
                      Light
                    </div>
                    <div className="mt-1 text-black/90">Warm, directed</div>
                  </div>

                  <div>
                    <div className="text-xs tracking-wide text-black/60">
                      Price
                    </div>
                    <div className="mt-1 text-black/90">€79</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 border-l border-black/25 p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_84px] gap-1 items-start">
                <div className="aspect-[16/10] overflow-hidden flex items-start">
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="h-full w-fit cursor-zoom-in"
                    aria-label="Open image fullscreen"
                    title="Open image"
                  >
                    <Image
                      src={activeImage}
                      alt={`Good Light Lamp — ${active.label}`}
                      width={1600}
                      height={1000}
                      priority
                      quality={100}
                      className="h-full w-auto max-w-full object-contain object-left"
                    />
                  </button>
                </div>

                {/* Thumbnails desk */}
                <div className="hidden lg:flex flex-col gap-3">
                  {[0, 1].map((i) => {
                    const selected = view === i;
                    const src = active.images[i as 0 | 1];
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setView(i as 0 | 1)}
                        className={`relative w-[75px] aspect-[4/5] border transition cursor-pointer ${
                          selected ? "border-black" : "border-black/30"
                        }`}
                        aria-label={i === 0 ? "Main image" : "Alternate image"}
                        title={i === 0 ? "Main image" : "Alternate image"}
                      >
                        <Image
                          src={src}
                          alt={`${active.label} thumbnail ${i + 1}`}
                          fill
                          className="object-cover w-full"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Thumbnails mobile */}
              <div className="mt-4 flex gap-3 lg:hidden">
                {[0, 1].map((i) => {
                  const selected = view === i;
                  const src = active.images[i as 0 | 1];
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setView(i as 0 | 1)}
                      className={`relative w-[75px] aspect-[4/5] border transition ${
                        selected ? "border-black" : "border-black/30"
                      }`}
                      aria-label={i === 0 ? "Main image" : "Alternate image"}
                      title={i === 0 ? "Main image" : "Alternate image"}
                    >
                      <Image
                        src={src}
                        alt={`${active.label} thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>

              <div className="mt-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      Nordic Light — Wood Edition
                    </h2>

                    <p className="mt-2 text-black/70 max-w-lg">
                      Designed to feel quiet. A clean wooden base, adjustable
                      arm, and a warm shade that keeps the focus where it
                      belongs.
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-xs tracking-wide text-black/60">
                      Price
                    </div>
                    <div className="mt-1 text-lg text-black/90">€79</div>
                  </div>
                </div>

                <div className="mt-8 border-t border-black/15 pt-6 flex items-center justify-between">
                  <div className="text-xs tracking-wide text-black/60">
                    Ships in 2–5 days · EU shipping
                  </div>

                  <MagneticComp>
                    <button
                      onClick={buy}
                      disabled={loading}
                      className="border cursor-pointer whitespace-nowrap border-black/50 px-6 py-3 text-sm text-black/90 hover:bg-[#161310] hover:text-white transition disabled:opacity-50"
                    >
                      {loading ? "Redirecting…" : "Buy — €79"}
                    </button>
                  </MagneticComp>
                </div>
              </div>

              <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="text-xs tracking-[0.45em] text-black/50 [writing-mode:vertical-rl]">
                  CALM BY DESIGN
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}
