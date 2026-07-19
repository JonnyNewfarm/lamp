import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import ScrollSection from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Privacy | Calero Studio",
  description:
    "Privacy information for Calero Studio, including personal data, payments, cookies, analytics and customer rights.",
};

const privacySections = [
  {
    number: "01",
    title: "Information we collect",
    content: (
      <>
        <p>
          We may collect information you provide when using our website, placing
          an order or contacting us. This may include your name, email address,
          phone number, billing address, shipping address, order details and
          customer support messages.
        </p>

        <p>
          We may also collect basic technical information, such as your IP
          address, browser type, device information, pages visited and how you
          interact with the website.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "How we use information",
    content: (
      <>
        <p>
          We use information to process orders, confirm payments, arrange
          shipping, provide tracking information, respond to customer support
          requests, handle returns and refunds, prevent fraud and improve the
          shopping experience.
        </p>

        <p>
          We may also use information to maintain website security, analyze
          website performance and communicate important updates about your
          order.
        </p>
      </>
    ),
  },
  {
    number: "03",
    title: "Payments",
    content: (
      <>
        <p>
          Payments are processed through secure third-party payment providers.
          Calero Studio does not store full credit card or debit card details on
          this website.
        </p>

        <p>
          Payment providers may collect and process payment information in
          accordance with their own privacy and security policies.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Shipping and fulfillment",
    content: (
      <>
        <p>
          We may share necessary order and shipping information with trusted
          fulfillment, delivery and service partners so they can help process,
          pack and deliver your order.
        </p>

        <p>Only the information needed to complete the service is shared.</p>
      </>
    ),
  },
  {
    number: "05",
    title: "Analytics and marketing",
    content: (
      <>
        <p>
          We may use analytics or advertising tools to understand website
          performance, improve marketing and measure how visitors interact with
          the website. These tools may use cookies or similar technologies.
        </p>

        <p>
          You can control or disable cookies through your browser settings. Some
          parts of the website may not function properly if cookies are
          disabled.
        </p>
      </>
    ),
  },
  {
    number: "06",
    title: "Cookies",
    content: (
      <p>
        Cookies are small files stored on your device. We may use cookies to
        remember preferences, support checkout functionality, improve website
        performance and understand how the website is used.
      </p>
    ),
  },
  {
    number: "07",
    title: "Data retention",
    content: (
      <p>
        We keep personal information only for as long as necessary to provide
        our services, process orders, comply with legal obligations, resolve
        disputes and maintain business records.
      </p>
    ),
  },
  {
    number: "08",
    title: "Your rights",
    content: (
      <>
        <p>
          Depending on your location, you may have the right to request access
          to the personal information we hold about you, ask us to correct it,
          request deletion or object to certain types of processing.
        </p>

        <p>
          To make a privacy-related request, please contact us using the contact
          information below.
        </p>
      </>
    ),
  },
  {
    number: "09",
    title: "Security",
    content: (
      <p>
        We take reasonable steps to protect customer information from
        unauthorized access, loss, misuse or disclosure. However, no method of
        online transmission or storage is completely secure.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#ecebeb] text-[#161310]">
      <ScrollSection>
        <section className="px-4 pb-28 pt-36 md:px-9 md:pb-40">
          <header>
            <p className="text-[10px] font-bold uppercase tracking-[0.07em] opacity-45 md:text-xs">
              Calero Studio / Privacy
            </p>

            <h1 className="mt-16 text-[19vw] font-black uppercase leading-[0.76] tracking-[-0.038em] sm:text-[17vw] md:mt-24 md:text-[13vw] lg:text-[11.5vw]">
              Privacy
              <span className="block">Policy</span>
            </h1>

            <div className="mt-20 grid gap-8 md:mt-28 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.07em] opacity-45 md:text-xs">
                  Your information
                </p>

                <h2 className="mt-6 max-w-sm text-[32px] font-black uppercase leading-[0.95] tracking-[-0.025em] md:text-[42px]">
                  Clear, secure and transparent
                </h2>
              </div>

              <div className="md:col-span-7 md:col-start-6">
                <p className="max-w-2xl text-base leading-[1.65] text-[#161310]/60 md:text-lg">
                  This policy explains how Calero Studio may collect, use and
                  protect information when you visit our website, place an order
                  or contact us.
                </p>

                <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 md:mt-14">
                  <PrivacyHighlight
                    label="Payments"
                    value="Securely processed"
                  />

                  <PrivacyHighlight label="Card details" value="Not stored" />

                  <PrivacyHighlight
                    label="Your rights"
                    value="Access and control"
                  />
                </div>
              </div>
            </div>
          </header>

          <div className="mt-28 space-y-24 md:mt-44 md:space-y-36">
            {privacySections.map((section) => (
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
                Privacy support
              </p>

              <h2 className="mt-6 max-w-sm text-[32px] font-black uppercase leading-[0.95] tracking-[-0.025em] md:text-[42px]">
                Questions about your data?
              </h2>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <p className="max-w-xl text-base leading-[1.65] text-[#161310]/60 md:text-lg">
                Contact us to request access, correction or deletion of your
                personal information, or to ask how your data is handled.
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

function PrivacyHighlight({ label, value }: { label: string; value: string }) {
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
