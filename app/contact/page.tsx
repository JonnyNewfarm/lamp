import ContactClient from "@/components/ContactClient";
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
      "Questions about our lamp, shipping or collaborations? Contact Calero Studio.",
    images: ["https://calero.studio/og-image.jpg"],
  },
  alternates: { canonical: "https://calero.studio/contact" },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#ecebeb] text-[#161310]">
        <ContactClient />
      </main>
    </SmoothScroll>
  );
}
