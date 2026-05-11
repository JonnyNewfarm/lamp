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
          <PolicySection title="General">
            <p>
              Calero Studio sells products through our online store. By browsing
              this website or placing an order, you agree to these terms.
            </p>
            <p>
              If you do not agree with these terms, you should not use the
              website or place an order.
            </p>
          </PolicySection>

          <PolicySection title="Products">
            <p>
              Product availability, pricing, descriptions, images and options
              may change without notice.
            </p>
            <p>
              We aim to present product information clearly and accurately, but
              small variations in color, size, packaging or appearance may occur
              depending on screen settings, product updates or supplier
              availability.
            </p>
          </PolicySection>

          <PolicySection title="Orders">
            <p>
              By placing an order, you agree to provide accurate contact,
              shipping and payment information.
            </p>
            <p>
              All orders are subject to availability, payment approval and order
              confirmation. Orders may be refused or canceled if there is an
              issue with payment, product availability, pricing errors,
              suspected fraud, misuse or other unusual circumstances.
            </p>
          </PolicySection>

          <PolicySection title="Pricing and currency">
            <p>
              Prices are displayed in the currency shown at checkout. Prices may
              change without notice.
            </p>
            <p>
              Shipping, taxes, duties or other charges may be calculated during
              checkout where applicable.
            </p>
          </PolicySection>

          <PolicySection title="Payment">
            <p>
              Payments are processed through secure third-party payment
              providers. We do not store full credit card or debit card details
              on this website.
            </p>
            <p>
              Your order may not be processed until payment has been approved.
            </p>
          </PolicySection>

          <PolicySection title="Shipping and delivery">
            <p>
              Orders are typically processed within 1–5 business days. Estimated
              transit time is typically 7–15 business days after the order has
              been handed to the carrier.
            </p>
            <p>
              The total estimated delivery time is typically 8–20 business days.
              Delivery times may vary depending on the delivery location,
              carrier performance, customs processing, weather, local delivery
              disruptions, public holidays and other external factors.
            </p>
            <p>
              Full shipping information is available on our{" "}
              <Link href="/shipping" className="underline underline-offset-4">
                shipping page
              </Link>
              .
            </p>
          </PolicySection>

          <PolicySection title="Returns and refunds">
            <p>
              Return requests are accepted within 30 days from the date you
              receive your order. Returned items must be new, unused, in their
              original condition and, where possible, returned with the original
              packaging.
            </p>
            <p>
              Full return and refund information is available on our{" "}
              <Link href="/returns" className="underline underline-offset-4">
                returns page
              </Link>
              .
            </p>
          </PolicySection>

          <PolicySection title="Fulfillment partners">
            <p>
              Calero Studio works with trusted fulfillment and shipping partners
              to help process, pack and deliver customer orders.
            </p>
            <p>
              We remain your point of contact for customer support, order
              questions, shipping updates, returns and refund requests.
            </p>
          </PolicySection>

          <PolicySection title="Customer responsibility">
            <p>
              Customers are responsible for providing complete and accurate
              order, contact and shipping information.
            </p>
            <p>
              If incorrect information is provided, delivery may be delayed or
              the order may not be deliverable.
            </p>
          </PolicySection>

          <PolicySection title="Website use">
            <p>
              You agree not to misuse the website, attempt unauthorized access,
              interfere with website functionality, submit false information or
              use the website for fraudulent or unlawful purposes.
            </p>
          </PolicySection>

          <PolicySection title="Limitation of responsibility">
            <p>
              We are not responsible for delays or issues caused by carriers,
              customs, weather, local delivery disruptions, incorrect shipping
              information, payment provider issues or circumstances outside our
              reasonable control.
            </p>
          </PolicySection>

          <PolicySection title="Changes to these terms">
            <p>
              We may update these terms from time to time. Any updated version
              will be posted on this page.
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
      <div className="mt-4 max-w-2xl space-y-4 text-sm leading-[1.9] text-[#161310]/60">
        {children}
      </div>
    </section>
  );
}
