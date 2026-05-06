// app/checkout/success/page.tsx
import Link from "next/link";
import ClearCartOnSuccess from "@/components/cart/ClearCartOnSuccess";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-[#ecebeb] px-6 py-24 text-[#161310] md:px-12">
      <ClearCartOnSuccess />

      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
          Payment received
        </p>

        <h1 className="mt-6 text-6xl font-light leading-[0.9] tracking-[-0.08em] md:text-8xl">
          Thank you for your order.
        </h1>

        <p className="mx-auto mt-8 max-w-xl leading-[1.8] text-[#161310]/60">
          Your payment was successful. You will receive an email confirmation
          shortly.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/shop"
            className="bg-[#161310] px-8 py-5 text-sm text-[#ecebeb]"
          >
            Continue shopping
          </Link>

          <Link
            href="/"
            className="border border-[#161310]/20 px-8 py-5 text-sm"
          >
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
