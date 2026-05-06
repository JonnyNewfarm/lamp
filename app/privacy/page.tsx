import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#ecebeb] px-6 py-28 text-[#161310] md:px-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
          Privacy
        </p>

        <h1 className="mt-5 text-6xl font-light leading-[0.9] tracking-[-0.08em] md:text-8xl">
          Privacy Policy
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-[1.8] text-[#161310]/60">
          This policy explains how Calero Studio may collect and use information
          when you visit the website or place an order.
        </p>

        <div className="mt-14 space-y-10 border-t border-[#161310]/15 pt-10">
          <PolicySection title="Information we collect">
            <p>
              We may collect information you provide during checkout, such as
              your name, email address, shipping address and payment-related
              order information.
            </p>
          </PolicySection>

          <PolicySection title="How we use information">
            <p>
              Information may be used to process orders, provide customer
              support, handle shipping, prevent fraud and improve the shopping
              experience.
            </p>
          </PolicySection>

          <PolicySection title="Payments">
            <p>
              Payments are processed through secure third-party payment
              providers. Calero Studio does not store full card details on this
              website.
            </p>
          </PolicySection>

          <PolicySection title="Analytics and marketing">
            <p>
              We may use analytics or advertising tools to understand website
              performance and improve marketing. These tools may use cookies or
              similar technologies.
            </p>
          </PolicySection>

          <PolicySection title="Contact">
            <p>
              For privacy questions, please contact us through the{" "}
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
