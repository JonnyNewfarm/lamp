import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";

const mont = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calero Studio",
  description: "Modern lighting for contemporary homes",
  verification: {
    google: "_oFTeZRp9Y269p4jGUZ104jXBp_PqTa08pQYbgjv4vk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${mont.variable}`}>
        {/* Google Ads tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18147507684"
          strategy="afterInteractive"
        />

        <Script
          id="google-ads-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'AW-18147507684');
            `,
          }}
        />

        {/* Meta Pixel */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');

              fbq('init', '2145113892911426');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wqte6hm8sz");
            `,
          }}
        />

        <CartProvider>
          <div className="relative h-full w-full">
            <Navbar />
            <NavbarMobile />
            {children}
            <Footer />
          </div>

          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
