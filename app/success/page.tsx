import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#ecebeb] text-[#161310] flex items-center">
      <div className="mx-auto w-full max-w-2xl px-6 py-20">
        <div className=" p-12">
          <h1 className="text-5xl font-semibold tracking-tight">
            Thank You for Your Order
          </h1>

          <p className="mt-6 text-lg text-[#3a3734] leading-relaxed">
            Your lamp is now being prepared for shipment.
          </p>

          <p className="mt-4 text-[#3a3734]">
            You’ll receive a confirmation email shortly with your order details
            and tracking information.
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
