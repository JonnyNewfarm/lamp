import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import { HeroIntroProvider } from "@/components/HeroIntroContext";

const eudoxus = localFont({
  src: [
    {
      path: "../public/fonts/EudoxusSans-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/EudoxusSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/EudoxusSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/EudoxusSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/EudoxusSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/EudoxusSans-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-eudoxus",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Calero Studio",
  description: "Modern lighting for contemporary homes",
  verification: {
    google: "UUIlGkSeMEKR8f-6zMMig7EIdwl3ytoLA3g5v7wd9uI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${eudoxus.className}
          ${eudoxus.variable}
        `}
      >
        <Script
          id="google-ads-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];

              function gtag() {
                window.dataLayer.push(arguments);
              }

              gtag("js", new Date());
              gtag("config", "AW-18147507684");
            `,
          }}
        />

        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s) {
                if (f.fbq) return;

                n = f.fbq = function() {
                  n.callMethod
                    ? n.callMethod.apply(n, arguments)
                    : n.queue.push(arguments);
                };

                if (!f._fbq) {
                  f._fbq = n;
                }

                n.push = n;
                n.loaded = true;
                n.version = "2.0";
                n.queue = [];

                t = b.createElement(e);
                t.async = true;
                t.src = v;

                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
              }(
                window,
                document,
                "script",
                "https://connect.facebook.net/en_US/fbevents.js"
              );

              fbq("init", "2145113892911426");
              fbq("track", "PageView");
            `,
          }}
        />

        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y) {
                c[a] = c[a] || function() {
                  (c[a].q = c[a].q || []).push(arguments);
                };

                t = l.createElement(r);
                t.async = 1;
                t.src = "https://www.clarity.ms/tag/" + i;

                y = l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t, y);
              })(
                window,
                document,
                "clarity",
                "script",
                "wqte6hm8sz"
              );
            `,
          }}
        />

        <CartProvider>
          <div className="relative min-h-screen w-full">
            <HeroIntroProvider>
              <Navbar />

              <main>{children}</main>
            </HeroIntroProvider>

            <Footer />
          </div>

          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
