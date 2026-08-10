import type { Metadata } from "next";
import Link from "next/link";

import ScrollSection from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Contact | Calero Studio",
  description:
    "Contact Calero Studio for questions about orders, shipping, returns, refunds, products or customer support.",
  keywords: [
    "Calero Studio",
    "contact Calero Studio",
    "customer support",
    "lamp support",
    "shipping information",
    "returns",
    "refunds",
    "lighting support",
  ],
  openGraph: {
    title: "Contact | Calero Studio",
    description:
      "Contact Calero Studio for questions about orders, shipping, returns, refunds or products.",
    url: "https://calero.studio/contact",
    siteName: "Calero Studio",
    images: [
      {
        url: "https://calero.studio/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Calero Studio – Contact",
      },
    ],
    locale: "en_EU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Calero Studio",
    description:
      "Contact Calero Studio for questions about orders, shipping, returns, refunds or products.",
    images: ["https://calero.studio/og-image.jpg"],
  },
  alternates: {
    canonical: "https://calero.studio/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const helpfulLinks = [
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Shipping",
    href: "/shipping",
  },
  {
    label: "Returns",
    href: "/returns",
  },
  {
    label: "Privacy",
    href: "/privacy",
  },
  {
    label: "Terms",
    href: "/terms",
  },
];

export default function ContactPage() {
  return (
    <main
      className="
        min-h-screen
        bg-[#eeeeec]
        font-montserrat
        text-[#1a1817]
      "
    >
      <ScrollSection>
        <section className="px-4 pt-36 md:px-9">
          <h1
            className="
              mt-16
font-morganite              text-[15vw]
              font-bold
              leading-[0.76]
              sm:text-[17vw]
              md:mt-24
              md:text-[14vw]
              lg:text-[13.5vw]
            "
          >
            Get In Touch
          </h1>

          <div
            className="
              mt-20
              grid
              gap-16
              md:mt-28
              md:grid-cols-12
              md:gap-8
            "
          >
            <div className="md:col-span-4">
              <h2
                className="
                  mt-6
                  max-w-sm
font-morganite                  text-[32px]
                  font-normal
                  leading-[0.95]
                  md:text-[60px]
                "
              >
                How can we help?
              </h2>
            </div>

            <div className="md:col-span-8 md:pl-10 lg:pl-20">
              <p
                className="
                  max-w-2xl
                  font-montserrat
                  text-base
                  font-normal
                  leading-[1.65]
                  text-[#1a1817]/60
                  md:text-lg
                "
              >
                For questions about orders, shipping, returns, refunds or
                products, contact Calero Studio using the information below.
                Email is the fastest way to reach us.
              </p>

              <a
                href="mailto:support@calero.studio"
                className="
                  group
                  mt-10
                  inline-flex
                  items-center
                  gap-4
font-morganite                  text-[6.5vw]
                  font-thin
                  leading-[0.9]
                  transition-opacity
                  hover:opacity-55
                  sm:text-[5vw]
                  md:mt-14
                  md:text-[5.5vw]
                  lg:text-[6vw]
                "
              >
                support@calero.studio
                <svg
                  aria-hidden="true"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="
                    h-6
                    w-6
                    shrink-0
                    transition-transform
                    duration-300
                    ease-[cubic-bezier(0.16,1,0.3,1)]
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    md:h-8
                    md:w-8
                  "
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
              </a>
            </div>
          </div>

          <div
            className="
              mt-24
              grid
              gap-20
              md:mt-36
              md:grid-cols-12
              md:gap-8
            "
          >
            <section className="md:col-span-5">
              <div className="flex items-start justify-between">
                <h2
                  className="
font-morganite                    text-[32px]
                    font-semibold
                    leading-[0.95]
                    md:text-[60px]
                  "
                >
                  Support
                </h2>

                <span
                  className="
                    font-montserrat
                    text-[10px]
                    font-medium
                    tracking-[0.04em]
                    opacity-35
                  "
                >
                  01
                </span>
              </div>

              <div className="mt-10 space-y-8">
                <div>
                  <p
                    className="
                      font-montserrat
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.07em]
                      opacity-40
                    "
                  >
                    Email
                  </p>

                  <a
                    href="mailto:support@calero.studio"
                    className="
                      mt-2
                      inline-block
                      font-montserrat
                      text-base
                      font-normal
                      transition-opacity
                      hover:opacity-50
                    "
                  >
                    support@calero.studio
                  </a>
                </div>

                <div>
                  <p
                    className="
                      font-montserrat
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.07em]
                      opacity-40
                    "
                  >
                    Phone
                  </p>

                  <a
                    href="tel:+4748263011"
                    className="
                      mt-2
                      inline-block
                      font-montserrat
                      text-base
                      font-normal
                      transition-opacity
                      hover:opacity-50
                    "
                  >
                    +47 48 26 30 11
                  </a>
                </div>

                <div>
                  <p
                    className="
                      font-montserrat
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.07em]
                      opacity-40
                    "
                  >
                    Support hours
                  </p>

                  <p className="mt-2 font-montserrat text-base font-normal">
                    Monday–Friday
                  </p>
                </div>

                <div>
                  <p
                    className="
                      font-montserrat
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.07em]
                      opacity-40
                    "
                  >
                    Response time
                  </p>

                  <p className="mt-2 font-montserrat text-base font-normal">
                    Usually within 24–48 hours
                  </p>
                </div>
              </div>

              <p
                className="
                  mt-10
                  max-w-md
                  font-montserrat
                  text-base
                  font-normal
                  leading-[1.7]
                  text-[#1a1817]/70
                "
              >
                For the fastest response, please contact us by email. Phone
                support is available for order-related questions when needed.
              </p>
            </section>

            <section className="md:col-span-5 md:col-start-8">
              <div className="flex items-start justify-between">
                <h2
                  className="
font-morganite                    text-[32px]
                    font-normal
                    leading-[0.95]
                    font-semibold
                    md:text-[60px]
                  "
                >
                  Studio
                </h2>

                <span
                  className="
                    font-montserrat
                    text-[10px]
                    font-medium
                    tracking-[0.04em]
                    opacity-35
                  "
                >
                  02
                </span>
              </div>

              <div className="mt-10 space-y-8">
                <div>
                  <p
                    className="
                      font-montserrat
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.07em]
                      opacity-40
                    "
                  >
                    Store
                  </p>

                  <p className="mt-2 font-montserrat text-base font-normal">
                    Calero Studio
                  </p>
                </div>

                <div>
                  <p
                    className="
                      font-montserrat
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.07em]
                      opacity-40
                    "
                  >
                    Location
                  </p>

                  <p className="mt-2 font-montserrat text-base font-normal">
                    Oslo, Norway
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-10
                  max-w-lg
                  space-y-5
                  font-montserrat
                  text-base
                  font-normal
                  leading-[1.7]
                  text-[#1a1817]/72
                "
              >
                <p>
                  Calero Studio is an online lighting store operated from Oslo,
                  Norway and serves selected international markets.
                </p>

                <p>
                  Orders are processed by Calero Studio and fulfilled through
                  selected third-party fulfillment and shipping partners.
                </p>

                <p>
                  Calero Studio remains responsible for customer support, order
                  questions, shipping updates, returns, exchanges and refund
                  requests.
                </p>
              </div>
            </section>
          </div>

          <section
            className="
              mt-28
              border-t
              border-[#1a1817]/15
              pt-10
              md:mt-40
              md:pt-14
            "
          >
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <p
                  className="
                    font-montserrat
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.07em]
                    opacity-45
                    md:text-xs
                  "
                >
                  More information
                </p>

                <h2
                  className="
                    mt-5
font-morganite                    text-[32px]
                    font-semibold
                    leading-[0.95]
                    md:text-[60px]
                  "
                >
                  Helpful pages
                </h2>
              </div>

              <nav
                aria-label="Helpful pages"
                className="
                  flex
                  flex-wrap
                  content-start
                  gap-x-7
                  gap-y-4
                  md:col-span-8
                  md:justify-end
                "
              >
                {helpfulLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      font-montserrat
                      text-lg
                      font-medium
                      uppercase
                      tracking-[-0.01em]
                      transition-opacity
                      hover:opacity-50
                      md:text-xl
                    "
                  >
                    {link.label}

                    <svg
                      aria-hidden="true"
                      viewBox="0 0 18 18"
                      fill="none"
                      className="
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    >
                      <path
                        d="M2 9H15"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />

                      <path
                        d="M10 4L15 9L10 14"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />
                    </svg>
                  </Link>
                ))}
              </nav>
            </div>
          </section>
        </section>
      </ScrollSection>
    </main>
  );
}
