// app/layout.tsx
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';

import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_HOST ? new URL(process.env.NEXT_PUBLIC_HOST) : undefined,
  title: {
    default: "We The People Wear | T-Shirts con diseños positivos",
    template: "%s | We The People Wear",
  },
  description: "Graphic T-Shirts con diseños positivos, modernos e inspiradores",
  openGraph: {
    title: "We The People Wear | T-Shirts con diseños positivos",
    description: "Graphic T-Shirts con diseños positivos, modernos e inspiradores",
    type: "website",
    locale: "es_ES",
    url: process.env.NEXT_PUBLIC_HOST,
    siteName: "We The People Wear",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="7n9y16bxi1mai34se0t2m3yxvi9gxq" />

        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4150167215271872');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Meta Pixel NoScript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=4150167215271872&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>

      <CartProvider>
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          {children}
          <Analytics />
        </body>
      </CartProvider>
    </html>
  );
}