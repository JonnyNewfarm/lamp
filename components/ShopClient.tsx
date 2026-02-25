"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import MagneticComp from "./MagneticComp";

type ColorKey = "green" | "red" | "white";

const COLORS: {
  key: ColorKey;
  label: string;
  image: string;
  swatch: string;
}[] = [
  { key: "green", label: "Green", image: "/green-lamp.jpg", swatch: "#2f6b57" },
  { key: "red", label: "Red", image: "/red-lamp.jpg", swatch: "#8b2f2f" },
  { key: "white", label: "White", image: "/white-lamp.jpg", swatch: "#e2e2e2" },
];

export default function ShopPage() {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState<ColorKey>("green");

  const active = COLORS.find((c) => c.key === color)!;

  const buy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color }), // 👈 send valgt farge
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
      <main className="min-h-screen bg-[#ecebeb] text-[#161310]">
        <section className="px-6 mt-10 pt-16 pb-16">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div className="text-xs tracking-wide text-black/60">
                Product / Good Light Lamp
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

              {/* Color selector */}
              <div className="mt-10">
                <div className="text-xs tracking-wide text-black/60">Color</div>

                <div className="mt-3 flex items-center gap-3">
                  {COLORS.map((c) => {
                    const selected = c.key === color;
                    return (
                      <button
                        key={c.key}
                        type="button"
                        onClick={() => setColor(c.key)}
                        className={`h-9 w-9 border transition ${
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

            <div className="lg:col-span-7">
              <div className="border border-black/25">
                <div className="aspect-[16/10] bg-[#161310] relative overflow-hidden">
                  <Image
                    src={active.image} // 👈 bytter med valgt farge
                    alt={`Good Light Lamp — ${active.label}`}
                    fill
                    priority
                    className="object-contain"
                  />
                </div>

                <div className="p-6 lg:p-8">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h2 className="text-2xl font-semibold">
                        Good Light Lamp
                      </h2>
                      <p className="mt-2 text-black/70 max-w-lg">
                        Designed to feel quiet. A tripod silhouette, warm shade,
                        and a finish that doesn’t beg for attention.
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
