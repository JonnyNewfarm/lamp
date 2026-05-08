import Link from "next/link";

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-[#ecebeb] px-6 py-28 text-[#161310] md:px-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
          Returns
        </p>

        <h1 className="mt-5 text-6xl font-light leading-[0.9] tracking-[-0.08em] md:text-8xl">
          Returns Policy
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-[1.8] text-[#161310]/60">
          We want you to feel confident when ordering from Calero Studio. This
          return policy applies to orders shipped to the United States.
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
          </PolicySection>

          <PolicySection title="Exchanges">
            <p>
              We accept exchanges. If you would like to exchange an item, please
              contact us with your order details so we can help arrange the
              exchange.
            </p>
          </PolicySection>

          <PolicySection title="Return method">
            <p>
              Returns are accepted by mail. A return label is included in the
              package and is provided free of charge.
            </p>
          </PolicySection>

          <PolicySection title="Return fees">
            <p>We do not charge any restocking fees for returned items.</p>
          </PolicySection>

          <PolicySection title="Damaged or incorrect items">
            <p>
              If your item arrives damaged, defective or incorrect, please
              contact us with photos and your order information so we can review
              the issue and help resolve it.
            </p>
          </PolicySection>

          <PolicySection title="Refunds">
            <p>
              Once your return has been received and approved, your refund will
              be processed to your original payment method within 7 days.
              Processing times may vary depending on your payment provider.
            </p>
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
      <div className="mt-4 max-w-2xl text-sm leading-[1.9] text-[#161310]/60">
        {children}
      </div>
    </section>
  );
}
