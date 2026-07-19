import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import ScrollSection from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Terms of Service | Calero Studio",
  description:
    "Terms of Service for Calero Studio, including orders, payments, shipping, returns and website use.",
};

const termsSections = [
  {
    number: "01",
    title: "General",
    content: (
      <>
        <p>
          Calero Studio sells products through our online store. By browsing
          this website or placing an order, you agree to these terms.
        </p>

        <p>
          If you do not agree with these terms, you should not use the website
          or place an order.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "Products",
    content: (
      <>
        <p>
          Product availability, pricing, descriptions, images and options may
          change without notice.
        </p>

        <p>
          We aim to present product information clearly and accurately, but
          small variations in color, size, packaging or appearance may occur
          depending on screen settings, product updates or supplier
          availability.
        </p>
      </>
    ),
  },
  {
    number: "03",
    title: "Orders",
    content: (
      <>
        <p>
          By placing an order, you agree to provide accurate contact, shipping
          and payment information.
        </p>

        <p>
          All orders are subject to availability, payment approval and order
          confirmation. Orders may be refused or canceled if there is an issue
          with payment, product availability, pricing errors, suspected fraud,
          misuse or other unusual circumstances.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Pricing and currency",
    content: (
      <>
        <p>
          Prices are displayed in the currency shown at checkout. Prices may
          change without notice.
        </p>

        <p>
          Shipping, taxes, duties or other charges may be calculated during
          checkout where applicable.
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "Payment",
    content: (
      <>
        <p>
          Payments are processed through secure third-party payment providers.
          We do not store full credit card or debit card details on this
          website.
        </p>

        <p>Your order may not be processed until payment has been approved.</p>
      </>
    ),
  },
  {
    number: "06",
    title: "Shipping and delivery",
    content: (
      <>
        <p>
          Orders are typically processed within 1–5 business days. Estimated
          transit time is typically 7–15 business days after the order has been
          handed to the carrier.
        </p>

        <p>
          The total estimated delivery time is typically 8–20 business days.
          Delivery times may vary depending on the delivery location, carrier
          performance, customs processing, weather, local delivery disruptions,
          public holidays and other external factors.
        </p>

        <p>
          Full shipping information is available on our{" "}
          <PolicyLink href="/shipping">shipping page</PolicyLink>.
        </p>
      </>
    ),
  },
  {
    number: "07",
    title: "Returns and refunds",
    content: (
      <>
        <p>
          Return requests are accepted within 30 days from the date you receive
          your order. Returned items must be new, unused, in their original
          condition and, where possible, returned with the original packaging.
        </p>

        <p>
          Full return and refund information is available on our{" "}
          <PolicyLink href="/returns">returns page</PolicyLink>.
        </p>
      </>
    ),
  },
  {
    number: "08",
    title: "Fulfillment partners",
    content: (
      <>
        <p>
          Calero Studio works with trusted fulfillment and shipping partners to
          help process, pack and deliver customer orders.
        </p>

        <p>
          We remain your point of contact for customer support, order questions,
          shipping updates, returns and refund requests.
        </p>
      </>
    ),
  },
  {
    number: "09",
    title: "Customer responsibility",
    content: (
      <>
        <p>
          Customers are responsible for providing complete and accurate order,
          contact and shipping information.
        </p>

        <p>
          If incorrect information is provided, delivery may be delayed or the
          order may not be deliverable.
        </p>
      </>
    ),
  },
  {
    number: "10",
    title: "Website use",
    content: (
      <p>
        You agree not to misuse the website, attempt unauthorized access,
        interfere with website functionality, submit false information or use
        the website for fraudulent or unlawful purposes.
      </p>
    ),
  },
  {
    number: "11",
    title: "Limitation of responsibility",
    content: (
      <p>
        We are not responsible for delays or issues caused by carriers, customs,
        weather, local delivery disruptions, incorrect shipping information,
        payment provider issues or circumstances outside our reasonable control.
      </p>
    ),
  },
  {
    number: "12",
    title: "Changes to these terms",
    content: (
      <p>
        We may update these terms from time to time. Any updated version will be
        posted on this page.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#ecebeb] text-[#161310]">
      <ScrollSection>
        <section className="px-4 pb-28 pt-36 md:px-9 md:pb-40">
          <header>
            <p className="text-[10px] font-bold uppercase tracking-[0.07em] opacity-45 md:text-xs">
              Calero Studio / Terms
            </p>

            <h1 className="mt-16 text-[19vw] font-black uppercase leading-[0.76] tracking-[-0.038em] sm:text-[17vw] md:mt-24 md:text-[13vw] lg:text-[11.5vw]">
              Terms of
              <span className="block">Service</span>
            </h1>

            <div className="mt-20 grid gap-8 md:mt-28 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.07em] opacity-45 md:text-xs">
                  Store conditions
                </p>

                <h2 className="mt-6 max-w-sm text-[32px] font-black uppercase leading-[0.95] tracking-[-0.025em] md:text-[42px]">
                  The terms behind every order
                </h2>
              </div>

              <div className="md:col-span-7 md:col-start-6">
                <p className="max-w-2xl text-base leading-[1.65] text-[#161310]/60 md:text-lg">
                  These terms describe the general conditions for using Calero
                  Studio and placing orders through our website.
                </p>

                <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 md:mt-14">
                  <TermsHighlight label="Orders" value="Subject to approval" />

                  <TermsHighlight label="Payments" value="Securely processed" />

                  <TermsHighlight label="Returns" value="Within 30 days" />
                </div>
              </div>
            </div>
          </header>

          <div className="mt-28 space-y-24 md:mt-44 md:space-y-36">
            {termsSections.map((section) => (
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
                Terms support
              </p>

              <h2 className="mt-6 max-w-sm text-[32px] font-black uppercase leading-[0.95] tracking-[-0.025em] md:text-[42px]">
                Something unclear?
              </h2>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <p className="max-w-xl text-base leading-[1.65] text-[#161310]/60 md:text-lg">
                Contact us if you have questions about these terms, an order or
                any of our store policies.
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

function TermsHighlight({ label, value }: { label: string; value: string }) {
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

function PolicyLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 font-medium text-[#161310] transition-opacity hover:opacity-50"
    >
      {children}

      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
