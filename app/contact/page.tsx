import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Calero Studio",
  description:
    "Get in touch with Calero Studio. Questions about our lamp, shipping, wholesale or collaborations? We’re here to help.",

  keywords: [
    "Calero Studio",
    "contact Calero",
    "lamp support",
    "shipping information",
    "wholesale lighting",
    "designer lamp Europe",
    "customer service",
  ],

  openGraph: {
    title: "Contact | Calero Studio",
    description:
      "Questions about our lamp, shipping or collaborations? Contact Calero Studio.",
    url: "https://calero.studio/contact",
    siteName: "Calero Studio",
    images: [
      {
        url: "https://calero.studio/og-image.jpg", // bytt hvis du har en egen
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
      "Questions about our lamp, shipping or collaborations? Contact Calero Studio.",
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
    <SmoothScroll>
      <main className="min-h-screen bg-[#ecebeb] text-[#161310]">
        <section className="px-6 pt-20 pb-10 mt-10">
          <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="text-xs tracking-wide text-black/60">Contact</div>

              <h1 className="mt-6 text-5xl leading-[0.95] font-semibold">
                Let’s keep it
                <br />
                simple.
              </h1>

              <p className="mt-6 text-base leading-relaxed text-black/70 max-w-md">
                Questions about the product, shipping, or collaborations — send
                a message and we’ll get back to you.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="border border-black/25 p-8">
                <div className="space-y-8">
                  <div>
                    <div className="text-xs tracking-wide text-black/60">
                      Email
                    </div>
                    <a
                      href="mailto:hello@calero.studio"
                      className="mt-2 block text-lg hover:underline underline-offset-4"
                    >
                      calero.studio@gmail.com
                    </a>
                  </div>

                  <div>
                    <div className="text-xs tracking-wide text-black/60">
                      Location
                    </div>
                    <div className="mt-2 text-black/80">Europe</div>
                  </div>

                  <div>
                    <div className="text-xs tracking-wide text-black/60">
                      Business
                    </div>
                    <div className="mt-2 text-black/80">
                      Wholesale, press & collaborations
                    </div>
                  </div>

                  <div className="pt-6 border-t border-black/15 flex items-center gap-6 text-sm">
                    <Link
                      href="/shop"
                      className="hover:underline underline-offset-4"
                    >
                      Shop
                    </Link>
                    <Link
                      href="/"
                      className="hover:underline underline-offset-4"
                    >
                      Home
                    </Link>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="text-xs tracking-[0.45em] text-black/50 [writing-mode:vertical-rl]">
                  CALM BY DESIGN
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}
