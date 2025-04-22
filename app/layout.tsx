import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import { Analytics } from '@vercel/analytics/next';

import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_HOST ? new URL(process.env.NEXT_PUBLIC_HOST) : undefined,
  // title: "We The People Wear | T-Shirts con diseños positivos",
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
      <CartProvider>
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          {children}
          <Analytics />
        </body>
      </CartProvider>
    </html>
  );
}
