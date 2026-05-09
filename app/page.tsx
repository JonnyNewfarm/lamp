import FeaturedCollection from "@/components/FeaturedCollection";
import LandingPageClient from "@/components/LandingPageClient";
import LightingByMood from "@/components/LightingByMood";
import ScrollSection from "@/components/SmoothScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calm by Design — Modern lamps for calm interiors",
  description:
    "Explore a curated collection of modern lamps for calm, thoughtful interiors. Discover table lamps, floor lamps, tripod lamps and mood lighting designed to bring warmth, focus and atmosphere into your home.",
  keywords: [
    "lamps",
    "modern lamps",
    "designer lamps",
    "table lamps",
    "floor lamps",
    "tripod lamps",
    "mood lighting",
    "interior lighting",
    "home lighting",
    "calm design",
    "minimal design",
    "warm lighting",
    "decorative lamps",
  ],
  openGraph: {
    title: "Calm by Design — Modern lamps for calm interiors",
    description:
      "Discover modern lamps, mood lighting and calm interior lighting designed to bring warmth, focus and atmosphere into your home.",
    url: "https://calero.studio",
    siteName: "Calm by Design",
    images: [
      {
        url: "/lamp.jpeg",
        width: 1200,
        height: 630,
        alt: "Modern lamp from Calm by Design",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calm by Design — Modern lamps for calm interiors",
    description:
      "Explore modern lamps, table lamps, floor lamps and mood lighting for calm interiors.",
    images: ["/lamp.jpeg"],
  },
};

const page = () => {
  return (
    <>
      <ScrollSection>
        <LandingPageClient />
        <FeaturedCollection />
        <LightingByMood />
      </ScrollSection>
    </>
  );
};

export default page;
