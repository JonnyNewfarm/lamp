import ShopPage from "@/components/ShopClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nordic Light — Wood Edition | Calero Studio",
  description:
    "Minimalist wood desk lamp designed for calm, focused work. Natural materials and warm lighting for modern interiors.",
  openGraph: {
    title: "Wood Desk Lamp — Calero Studio",
    description:
      "Minimalist wood desk lamp designed for calm, focused work. Discover the lamp from Calero Studio.",
    url: "https://calero.studio/shop",
    siteName: "Calero Studio",
    images: [
      {
        url: "/lamp.jpeg",
        width: 1200,
        height: 630,
        alt: "Wood Desk Lamp — Calero Studio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wood Desk Lamp — Calero Studio",
    description: "Minimalist wood desk lamp designed for calm, focused work.",
    images: ["/lamp.jpeg"],
  },
};

const page = () => {
  return <ShopPage />;
};

export default page;
