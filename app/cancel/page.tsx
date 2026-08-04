import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="flex min-h-screen items-center bg-[#eeeeec] text-[#1a1817]">
      <div className="mx-auto w-full max-w-2xl px-6 py-20">
        <div className="p-12">
          <h1 className="text-5xl font-semibold tracking-tight">
            Order Cancelled
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-[#1a1817]/75">
            Your payment was not completed and no charges were made.
          </p>

          <p className="mt-4 text-[#1a1817]/75">
            If this was unintentional, you can return to the shop and complete
            your purchase at any time.
          </p>

          <div className="mt-12 flex gap-4">
            <Link
              href="/"
              className="flex items-center border border-[#1a1817] px-4 py-2 text-center text-sm font-medium transition-colors hover:bg-[#1a1817] hover:text-[#eeeeec]"
            >
              Back Home
            </Link>

            <Link
              href="/shop"
              className="border border-[#1a1817] px-8 py-3 text-center text-sm font-medium transition-colors hover:bg-[#1a1817] hover:text-[#eeeeec]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
