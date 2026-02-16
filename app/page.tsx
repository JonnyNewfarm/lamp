import LandingPageClient from "@/components/LandingPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calm by Design — Good light doesn’t shout",
  description:
    "A calm, editorial product experience for focused work. Explore the Good Light Lamp — designed to disappear into the room.",
  keywords: [
    "Tripod Lamp",
    "design",
    "lamp",
    "lighting",
    "calm design",
    "editorial product",
    "minimal design",
  ],
  openGraph: {
    title: "Calm by Design",
    description:
      "Good light doesn’t shout. A calm, focused lighting experience.",
    url: "https://yourdomain.com",
    siteName: "Calm by Design",
    images: [
      {
        url: "/lamp.jpeg",
        width: 1200,
        height: 630,
        alt: "Good Light Lamp",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calm by Design",
    description: "Good light doesn’t shout. Designed for calm, focused work.",
    images: ["/lamp.jpeg"],
  },
};

const page = () => {
  return (
    <>
      <LandingPageClient />
    </>
  );
};

export default page;
