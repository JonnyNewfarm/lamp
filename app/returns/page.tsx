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
          page explains the general return process.
        </p>

        <div className="mt-14 space-y-10 border-t border-[#161310]/15 pt-10">
          <PolicySection title="Return requests">
            <p>
              If you would like to request a return, please contact us as soon
              as possible after receiving your order. Include your order
              details, email address and reason for the return.
            </p>
          </PolicySection>

          <PolicySection title="Condition of items">
            <p>
              Returned items should be unused, in their original condition and
              with original packaging where possible.
            </p>
          </PolicySection>

          <PolicySection title="Damaged or incorrect items">
            <p>
              If your item arrives damaged or incorrect, please contact us with
              photos and your order information so we can review the issue.
            </p>
          </PolicySection>

          <PolicySection title="Refunds">
            <p>
              Approved refunds are usually processed back to the original
              payment method. Processing times may vary depending on your
              payment provider.
            </p>
          </PolicySection>

          <PolicySection title="Contact">
            <p>
              Start a return request through the{" "}
              <Link href="/contact" className="underline underline-offset-4">
                contact page
              </Link>
              .
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
