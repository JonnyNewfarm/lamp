import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import ScrollSection from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Shipping | Calero Studio",
  description:
    "Shipping information for Calero Studio, including processing times, delivery estimates, tracking and shipping support.",
};

const shippingSections = [
  {
    number: "01",
    title: "Processing time",
    content: (
      <>
        <p>
          Orders are typically processed within 1–5 business days after payment
          confirmation.
        </p>

        <p>
          Orders are processed Monday–Friday, excluding public holidays and
          other days when carriers or fulfillment partners are unavailable.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "Order cutoff time",
    content: (
      <p>
        Our daily order cutoff time is 2:00 PM Pacific Standard Time. Orders
        placed after the cutoff time may begin processing on the next business
        day.
      </p>
    ),
  },
  {
    number: "03",
    title: "Estimated transit time",
    content: (
      <>
        <p>
          Estimated transit time is typically 7–15 business days after your
          order has been handed to the carrier.
        </p>

        <p>
          Transit time may vary depending on your delivery location, carrier
          performance, customs processing, weather, local delivery disruptions
          and other external factors outside our control.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Total delivery time",
    content: (
      <>
        <p>
          The total estimated delivery time is typically 8–20 business days.
          This includes both order processing time and carrier transit time.
        </p>

        <p>
          Delivery estimates are not guaranteed and may vary during busy
          periods, holidays or unexpected carrier delays.
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "Shipping cost",
    content: (
      <>
        <p>
          We currently offer free shipping on all orders placed through our
          website.
        </p>

        <p>
          Any available shipping options and costs will be shown at checkout
          before you complete your order.
        </p>
      </>
    ),
  },
  {
    number: "06",
    title: "Tracking",
    content: (
      <>
        <p>
          Every order ships with tracking. When your order has shipped, you will
          receive tracking information by email.
        </p>

        <p>
          Tracking information may take some time to update after the carrier
          receives the package.
        </p>
      </>
    ),
  },
  {
    number: "07",
    title: "Fulfillment",
    content: (
      <>
        <p>
          Orders are processed by Calero Studio and fulfilled through selected
          third-party fulfillment and shipping partners.
        </p>

        <p>
          Calero Studio remains responsible for customer support, order
          questions, shipping updates, returns, exchanges and refund requests.
        </p>
      </>
    ),
  },
  {
    number: "08",
    title: "Shipping address",
    content: (
      <>
        <p>
          Customers are responsible for providing a complete and accurate
          shipping address at checkout.
        </p>

        <p>
          If you notice that your shipping information is incorrect, contact us
          as soon as possible. We will do our best to help, but we cannot
          guarantee changes after an order has been processed or shipped.
        </p>
      </>
    ),
  },
  {
    number: "09",
    title: "Delayed orders",
    content: (
      <>
        <p>
          If your order has not arrived within the estimated delivery window,
          please contact us with your order number so we can check the shipment
          status.
        </p>

        <p>
          Delays may be caused by customs, carriers, weather, local delivery
          disruptions, public holidays or other circumstances outside our
          reasonable control.
        </p>
      </>
    ),
  },
];

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#ecebeb] text-[#161310]">
      <ScrollSection>
        <section className="px-4 pb-28 pt-36 md:px-9 md:pb-40">
          <header>
            <p className="text-[10px] font-bold uppercase tracking-[0.07em] opacity-45 md:text-xs">
              Calero Studio / Shipping
            </p>

            <h1 className="mt-16 text-[19vw] font-black uppercase leading-[0.76] tracking-[-0.038em] sm:text-[17vw] md:mt-24 md:text-[13vw] lg:text-[11.5vw]">
              Shipping
              <span className="block">Policy</span>
            </h1>

            <div className="mt-20 grid gap-8 md:mt-28 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.07em] opacity-45 md:text-xs">
                  Delivery information
                </p>

                <h2 className="mt-6 max-w-sm text-[32px] font-black uppercase leading-[0.95] tracking-[-0.025em] md:text-[42px]">
                  From our studio to your space
                </h2>
              </div>

              <div className="md:col-span-7 md:col-start-6">
                <p className="max-w-2xl text-base leading-[1.65] text-[#161310]/60 md:text-lg">
                  Everything you need to know about order processing, estimated
                  delivery times, tracking and shipping support when ordering
                  from Calero Studio.
                </p>

                <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 md:mt-14">
                  <ShippingHighlight
                    label="Processing"
                    value="1–5 business days"
                  />

                  <ShippingHighlight
                    label="Transit"
                    value="7–15 business days"
                  />

                  <ShippingHighlight label="Shipping" value="Free" />
                </div>
              </div>
            </div>
          </header>

          <div className="mt-28 space-y-24 md:mt-44 md:space-y-36">
            {shippingSections.map((section) => (
              <PolicySection
                key={section.number}
                number={section.number}
                title={section.title}
              >
                {section.content}
              </PolicySection>
            ))}
          </div>

          <section className="mt-32 grid gap-8 md:mt-48 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.07em] opacity-45 md:text-xs">
                Shipping support
              </p>

              <h2 className="mt-6 max-w-sm text-[32px] font-black uppercase leading-[0.95] tracking-[-0.025em] md:text-[42px]">
                Still waiting for your order?
              </h2>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <p className="max-w-xl text-base leading-[1.65] text-[#161310]/60 md:text-lg">
                Contact us with your order number and we will help you check the
                latest shipment status.
              </p>

              <Link
                href="/contact"
                className="group mt-10 inline-flex items-center gap-4 text-[9vw] font-black uppercase leading-[0.85] tracking-[-0.035em] transition-opacity hover:opacity-55 sm:text-[7vw] md:mt-14 md:text-[4vw] lg:text-[3.5vw]"
              >
                Contact us
                <svg
                  aria-hidden="true"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="h-6 w-6 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1 md:h-8 md:w-8"
                >
                  <path
                    d="M6 26L26 6"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />

                  <path
                    d="M13 6H26V19"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </Link>
            </div>
          </section>
        </section>
      </ScrollSection>
    </main>
  );
}

function ShippingHighlight({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.07em] opacity-40">
        {label}
      </p>

      <p className="mt-2 text-base font-medium">{value}</p>
    </div>
  );
}

function PolicySection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-8 md:grid-cols-12">
      <div className="flex items-start justify-between md:col-span-4 md:block">
        <h2 className="max-w-sm text-[32px] font-black uppercase leading-[0.95] tracking-[-0.025em] md:text-[42px]">
          {title}
        </h2>

        <span className="text-[10px] font-bold tracking-[0.04em] opacity-35 md:mt-6 md:block">
          {number}
        </span>
      </div>

      <div className="max-w-2xl space-y-5 text-base leading-[1.7] text-[#161310]/65 md:col-span-7 md:col-start-6 md:text-lg">
        {children}
      </div>
    </section>
  );
}
