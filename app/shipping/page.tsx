import Link from "next/link";

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#ecebeb] px-6 py-28 text-[#161310] md:px-12">
      <PolicyLayout
        label="Shipping"
        title="Shipping Policy"
        intro="This page explains how shipping works when ordering from Calero Studio."
      >
        <PolicySection title="Processing time">
          <p>
            Orders are processed as quickly as possible after payment has been
            received. Processing times may vary depending on product
            availability, supplier handling and order volume.
          </p>
        </PolicySection>

        <PolicySection title="Estimated delivery">
          <p>
            Delivery times may vary depending on destination, carrier and the
            specific product ordered. Estimated delivery information may be
            provided during checkout or after your order has been processed.
          </p>
        </PolicySection>

        <PolicySection title="Shipping address">
          <p>
            Customers are responsible for providing a complete and accurate
            shipping address. If an incorrect address is provided, delivery may
            be delayed or the order may not be deliverable.
          </p>
        </PolicySection>

        <PolicySection title="Tracking">
          <p>
            When tracking information is available, it may be sent to the email
            address used at checkout.
          </p>
        </PolicySection>

        <PolicySection title="Questions">
          <p>
            For questions about shipping, please contact us through the{" "}
            <Link href="/contact" className="underline underline-offset-4">
              contact page
            </Link>
            .
          </p>
        </PolicySection>
      </PolicyLayout>
    </main>
  );
}

function PolicyLayout({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
        {label}
      </p>

      <h1 className="mt-5 text-6xl font-light leading-[0.9] tracking-[-0.08em] md:text-8xl">
        {title}
      </h1>

      <p className="mt-8 max-w-2xl text-base leading-[1.8] text-[#161310]/60">
        {intro}
      </p>

      <div className="mt-14 space-y-10 border-t border-[#161310]/15 pt-10">
        {children}
      </div>
    </div>
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
