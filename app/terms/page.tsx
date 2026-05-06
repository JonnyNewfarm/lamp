import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#ecebeb] px-6 py-28 text-[#161310] md:px-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
          Terms
        </p>

        <h1 className="mt-5 text-6xl font-light leading-[0.9] tracking-[-0.08em] md:text-8xl">
          Terms of Service
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-[1.8] text-[#161310]/60">
          These terms describe the general conditions for using Calero Studio
          and placing orders through the website.
        </p>

        <div className="mt-14 space-y-10 border-t border-[#161310]/15 pt-10">
          <PolicySection title="Products">
            <p>
              Product availability, pricing, descriptions and images may change.
              We aim to present product information clearly, but small
              variations may occur.
            </p>
          </PolicySection>

          <PolicySection title="Orders">
            <p>
              By placing an order, you agree to provide accurate contact,
              shipping and payment information. Orders may be refused or
              canceled if there is an issue with payment, availability or
              suspected misuse.
            </p>
          </PolicySection>

          <PolicySection title="Pricing">
            <p>
              Prices are displayed in the currency shown at checkout. Shipping,
              taxes or other charges may be calculated during checkout where
              applicable.
            </p>
          </PolicySection>

          <PolicySection title="Shipping and returns">
            <p>
              Shipping and return information is available on our{" "}
              <Link href="/shipping" className="underline underline-offset-4">
                shipping
              </Link>{" "}
              and{" "}
              <Link href="/returns" className="underline underline-offset-4">
                returns
              </Link>{" "}
              pages.
            </p>
          </PolicySection>

          <PolicySection title="Contact">
            <p>
              For questions about these terms, please contact us through the{" "}
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
