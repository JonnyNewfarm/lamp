import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-[#ecebeb] text-[#161310] flex items-center">
      <div className="mx-auto w-full max-w-2xl px-6 py-20">
        <div className="p-12">
          <h1 className="text-5xl font-semibold tracking-tight">
            Order Cancelled
          </h1>

          <p className="mt-6 text-lg text-[#3a3734] leading-relaxed">
            Your payment was not completed and no charges were made.
          </p>

          <p className="mt-4 text-[#3a3734]">
            If this was unintentional, you can return to the shop and complete
            your purchase at any time.
          </p>

          <div className="mt-12 flex gap-4">
            <Link
              href="/"
              className="border flex items-center text-center border-[#161310] px-4 py-2 text-sm font-medium hover:bg-[#161310] hover:text-white transition-colors"
            >
              Back Home
            </Link>

            <Link
              href="/shop"
              className="border text-center border-[#161310] px-8 py-3 text-sm font-medium hover:bg-[#161310] hover:text-white transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
