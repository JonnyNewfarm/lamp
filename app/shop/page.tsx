import ShopPage from "@/components/ShopClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Good Light Lamp — Calm by Design",
  description:
    "Buy the Good Light Lamp. Calm, focused lighting for desk work. Designed to disappear into the room.",
  openGraph: {
    title: "Good Light Lamp — Calm by Design",
    description: "Calm, focused light for desk work. Buy the Good Light Lamp.",
    url: "https://yourdomain.com/shop",
    siteName: "Calm by Design",
    images: [
      {
        url: "/lamp.jpeg",
        width: 1200,
        height: 630,
        alt: "Good Light Lamp",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Good Light Lamp — Calm by Design",
    description: "Calm, focused light for desk work. Buy the Good Light Lamp.",
    images: ["/lamp.jpeg"],
  },
};

const page = () => {
  return (
    <>
      <ShopPage />
    </>
  );
};

export default page;
