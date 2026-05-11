import Link from "next/link";

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#ecebeb] px-6 py-28 text-[#161310] md:px-12">
      <PolicyLayout
        label="Shipping"
        title="Shipping Policy"
        intro="This page explains how shipping works when ordering from Calero Studio, including processing time, estimated delivery time, tracking and shipping support."
      >
        <PolicySection title="Processing time">
          <p>
            Orders are typically processed within 1–5 business days after
            payment confirmation.
          </p>
          <p>
            Orders are processed Monday–Saturday, excluding public holidays and
            other days when carriers or fulfillment partners are unavailable.
          </p>
        </PolicySection>

        <PolicySection title="Order cutoff time">
          <p>
            Our daily order cutoff time is 2:00 PM Pacific Standard Time. Orders
            placed after the cutoff time may begin processing on the next
            business day.
          </p>
        </PolicySection>

        <PolicySection title="Estimated transit time">
          <p>
            Estimated transit time is typically 5–12 business days after your
            order has been handed to the carrier.
          </p>
          <p>
            Transit time may vary depending on your delivery location, carrier
            performance, customs processing, weather, local delivery disruptions
            and other external factors outside our control.
          </p>
        </PolicySection>

        <PolicySection title="Total estimated delivery time">
          <p>
            The total estimated delivery time is typically 6–17 business days.
            This includes both order processing time and carrier transit time.
          </p>
          <p>
            Delivery estimates are not guaranteed and may vary during busy
            periods, holidays or unexpected carrier delays.
          </p>
        </PolicySection>

        <PolicySection title="Shipping cost">
          <p>
            We currently offer free shipping on all orders placed through our
            website.
          </p>
          <p>
            Any available shipping options and costs will be shown at checkout
            before you complete your order.
          </p>
        </PolicySection>

        <PolicySection title="Tracking">
          <p>
            Every order ships with tracking. When your order has shipped, you
            will receive tracking information by email.
          </p>
          <p>
            Tracking information may take some time to update after the carrier
            receives the package.
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

        <PolicySection title="Shipping address">
          <p>
            Customers are responsible for providing a complete and accurate
            shipping address at checkout.
          </p>
          <p>
            If you notice that your shipping information is incorrect, contact
            us as soon as possible. We will do our best to help, but we cannot
            guarantee changes after an order has been processed or shipped.
          </p>
        </PolicySection>

        <PolicySection title="Delayed or missing orders">
          <p>
            If your order has not arrived within the estimated delivery window,
            please contact us with your order number so we can help check the
            shipment status.
          </p>
          <p>
            Some delays may be caused by customs, carriers, weather, local
            delivery disruptions, public holidays or other circumstances outside
            our reasonable control.
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
      <div className="mt-4 max-w-2xl space-y-4 text-sm leading-[1.9] text-[#161310]/60">
        {children}
      </div>
    </section>
  );
}
