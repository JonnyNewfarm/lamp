import Link from "next/link";

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-[#ecebeb] px-6 py-28 text-[#161310] md:px-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
          Returns
        </p>

        <h1 className="mt-5 text-6xl font-black leading-[0.9] tracking-[-0.045em] md:text-8xl">
          Returns Policy
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-[1.8] text-[#161310]/60">
          We want you to feel confident when ordering from Calero Studio. This
          return policy explains our return window, eligible products, return
          costs, exchanges and refunds.
        </p>

        <div className="mt-14 space-y-10 border-t border-[#161310]/15 pt-10">
          <PolicySection title="Return window">
            <p>
              We accept return requests within 30 days from the date you receive
              your order.
            </p>
          </PolicySection>

          <PolicySection title="Eligible products">
            <p>
              We accept returns for both defective and non-defective products.
              Returned items must be new, unused, in their original condition
              and, where possible, returned with the original packaging.
            </p>
            <p>
              Items may not be accepted for return if they have been used,
              damaged by misuse, altered or returned in poor condition.
            </p>
          </PolicySection>

          <PolicySection title="Return method">
            <p>
              Returns are accepted by mail. To start a return, contact us with
              your order number, email address and reason for the return.
            </p>
            <p>
              Once your return request has been reviewed and approved, we will
              provide return instructions.
            </p>
          </PolicySection>

          <PolicySection title="Return cost">
            <p>Return shipping is free for approved returns.</p>
            <p>We do not charge any restocking fees for returned items.</p>
          </PolicySection>

          <PolicySection title="Exchanges">
            <p>
              We accept exchanges. If you would like to exchange an item, please
              contact us with your order details so we can help arrange the
              exchange.
            </p>
          </PolicySection>

          <PolicySection title="Damaged, defective or incorrect items">
            <p>
              If your item arrives damaged, defective or incorrect, please
              contact us as soon as possible with your order information and
              photos of the issue so we can review it and help resolve the
              problem.
            </p>
          </PolicySection>

          <PolicySection title="Refunds">
            <p>
              Once your return has been received and approved, your refund will
              be processed to your original payment method within 7 business
              days.
            </p>
            <p>Processing times may vary depending on your payment provider.</p>
          </PolicySection>

          <PolicySection title="How to start a return">
            <p>
              To start a return or exchange request, please contact us through
              the{" "}
              <Link href="/contact" className="underline underline-offset-4">
                contact page
              </Link>{" "}
              with your order number, email address and reason for the return.
            </p>
          </PolicySection>
        </div>
      </div>
    </main>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-2xl font-light tracking-[-0.04em]">{title}</h2>
      <div className="mt-4 max-w-2xl space-y-4 text-sm leading-[1.9] text-[#161310]/60">
        {children}
      </div>
    </section>
  );
}
