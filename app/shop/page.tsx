"use client";

import { useState } from "react";

export default function ShopPage() {
  const [loading, setLoading] = useState(false);

  const buy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      if (!res.ok) throw new Error("Checkout failed");

      const { url } = await res.json();
      if (!url) throw new Error("No checkout url returned");

      window.location.assign(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#ecebeb] text-[#161310]">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl font-semibold">Shop</h1>

        <div className="mt-10 border border-black p-6 max-w-xl">
          <h2 className="text-2xl font-medium">Good Light Lamp</h2>
          <p className="mt-3 text-[#3a3734]">
            Calm, focused light for desk work.
          </p>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-lg">€79</span>
            <button
              onClick={buy}
              disabled={loading}
              className="border border-black px-6 py-3 text-sm hover:bg-black hover:text-white transition disabled:opacity-50"
            >
              {loading ? "Redirecting…" : "Buy — €79"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
