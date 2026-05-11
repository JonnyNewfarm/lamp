import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#ecebeb] px-6 py-28 text-[#161310] md:px-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
          About
        </p>

        <h1 className="mt-5 text-6xl font-light leading-[0.9] tracking-[-0.08em] md:text-8xl">
          About Calero Studio
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-[1.8] text-[#161310]/60">
          Calero Studio is an online lighting store focused on minimal lamps and
          curated lighting pieces for calm interiors.
        </p>

        <div className="mt-14 space-y-10 border-t border-[#161310]/15 pt-10">
          <PolicySection title="Who we are">
            <p>
              Calero Studio sells lighting products through our online store.
              Our focus is on simple, warm and functional pieces that help
              create a calmer atmosphere at home.
            </p>
            <p>
              We aim to make the shopping experience clear and reliable, with
              transparent product information, secure checkout, tracked shipping
              and customer support by email.
            </p>
          </PolicySection>

          <PolicySection title="What we sell">
            <p>
              Our store offers curated lighting products such as pendant lamps,
              table lamps and interior lighting accessories.
            </p>
            <p>
              Each product page is designed to show important information such
              as product images, price, availability, color options,
              specifications and delivery details before you place an order.
            </p>
          </PolicySection>

          <PolicySection title="Fulfillment and delivery">
            <p>
              Calero Studio works with trusted fulfillment and shipping partners
              to help process, pack and deliver customer orders.
            </p>
            <p>
              We remain your point of contact for customer support, order
              questions, shipping updates, returns and refund requests.
            </p>
          </PolicySection>

          <PolicySection title="Our goal">
            <p>
              Our goal is to provide lighting products that feel simple,
              practical and easy to style in everyday interiors.
            </p>
            <p>
              We want customers to understand what they are buying, how orders
              are processed, how shipping works and how to contact us if they
              need help.
            </p>
          </PolicySection>

          <PolicySection title="Shipping and support">
            <p>
              Orders are typically processed within 1–5 business days. Estimated
              transit time is typically 7–15 business days after the order has
              been handed to the carrier.
            </p>
            <p>
              The total estimated delivery time is typically 8–20 business days.
              Every order ships with tracking, and when your order has shipped,
              you will receive tracking information by email.
            </p>
          </PolicySection>

          <PolicySection title="Transparency">
            <p>
              We believe customers should have access to clear information
              before placing an order. You can review our Shipping Policy,
              Returns Policy, Privacy Policy and Terms of Service on our
              website.
            </p>
            <p>
              If anything is unclear, please contact us before completing your
              purchase.
            </p>
          </PolicySection>

          <PolicySection title="Contact">
            <p>
              For questions about Calero Studio, our products or an order,
              please contact us through the{" "}
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
      <div className="mt-4 max-w-2xl space-y-4 text-sm leading-[1.9] text-[#161310]/60">
        {children}
      </div>
    </section>
  );
}
