import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Akula Topping | Premium Natural Sauces & Syrups",
    template: "%s | Akula Topping",
  },
  description:
    "Experience the purest taste of nature with Akula Topping. Artisanal chocolate, caramel, and fruit sauces crafted for culinary masterpieces.",
  keywords: [
    "premium sauces",
    "natural toppings",
    "syrups Egypt",
    "dessert toppings",
    "chocolate sauce",
    "caramel sauce",
    "topping",
    "cafe sauces",
    "premium sauces in egypt",
  ],
  openGraph: {
    title: "Akula Topping | The Purest Taste of Nature",
    description:
      "Premium natural toppings and syrups for elite desserts and drinks.",
    url: "https://akulatopping.com",
    siteName: "Akula Topping",
    images: [
      {
        url: "/images/HeroImage.webp",
        width: 1200,
        height: 630,
        alt: "Akula Topping Premium Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akula Topping",
    description: "Nature's finest flavors, refined for your table.",
    images: ["/images/HeroImage.webp"],
  },
  icons: {
    icon: [
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon.ico", sizes: "any" },
    ],
    apple: [
      {
        url: "/images/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/images/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/images/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/images/site.webmanifest",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const inlineSetLang = `try{(function(){const l=localStorage.getItem('akula_lang');if(l==='ar'){document.documentElement.lang='ar';document.documentElement.dir='rtl';document.documentElement.classList.add('rtl')}else if(l==='en'){document.documentElement.lang='en';document.documentElement.dir='ltr';document.documentElement.classList.remove('rtl')} })()}catch(e){};`;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: inlineSetLang }} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
