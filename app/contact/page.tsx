import Link from "next/link";
import type { Metadata } from "next";

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

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#ecebeb] px-6 py-28 text-[#161310] md:px-12">
      <section className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.34em] text-[#161310]/45">
          Contact
        </p>

        <h1 className="mt-5 text-6xl font-black leading-[0.9] tracking-[-0.045em] md:text-8xl">
          Contact
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-[1.8] text-[#161310]/60">
          For questions about orders, shipping, returns, refunds or products,
          please contact Calero Studio using the information below.
        </p>

        <div className="mt-14 grid gap-12 border-t border-[#161310]/15 pt-10 md:grid-cols-12">
          <section className="md:col-span-6">
            <h2 className="text-2xl font-light tracking-[-0.04em]">
              Customer support
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-[1.9] text-[#161310]/60">
              <p>
                Email:{" "}
                <a
                  href="mailto:support@calero.studio"
                  className="underline underline-offset-4 hover:text-[#161310]"
                >
                  support@calero.studio
                </a>
              </p>

              <p>
                Phone:{" "}
                <a
                  href="tel:+47XXXXXXXX"
                  className="underline underline-offset-4 hover:text-[#161310]"
                >
                  +47 48 26 30 11
                </a>
              </p>

              <p>Support hours: Monday–Friday</p>

              <p>Response time: We typically reply within 24–48 hours.</p>

              <p>
                For the fastest response, please contact us by email. Phone
                support is available for order-related questions when needed.
              </p>
            </div>
          </section>

          <section className="md:col-span-6">
            <h2 className="text-2xl font-light tracking-[-0.04em]">
              Store information
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-[1.9] text-[#161310]/60">
              <p>Store name: Calero Studio</p>

              <p>Operated from: Oslo, Norway</p>

              <p>
                Calero Studio is an online store operated from Oslo, Norway and
                serves selected international markets.
              </p>

              <p>
                Orders are processed by Calero Studio and fulfilled through
                selected third-party fulfillment and shipping partners. Calero
                Studio remains responsible for customer support, order
                questions, shipping updates, returns, exchanges and refund
                requests.
              </p>
            </div>
          </section>
        </div>

        <section className="mt-14 border-t border-[#161310]/15 pt-10">
          <h2 className="text-2xl font-light tracking-[-0.04em]">
            Helpful pages
          </h2>

          <nav className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#161310]/60">
            <Link
              href="/shop"
              className="underline underline-offset-4 hover:text-[#161310]"
            >
              Shop
            </Link>

            <Link
              href="/shipping"
              className="underline underline-offset-4 hover:text-[#161310]"
            >
              Shipping
            </Link>

            <Link
              href="/returns"
              className="underline underline-offset-4 hover:text-[#161310]"
            >
              Returns
            </Link>

            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-[#161310]"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-[#161310]"
            >
              Terms
            </Link>
          </nav>
        </section>
      </section>
    </main>
  );
}
