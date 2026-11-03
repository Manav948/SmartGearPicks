import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smartgearpicks.com";
const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export const viewport: Viewport = {
  themeColor: "#F6F4EF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SmartGearPicks – Curated Products & Everyday Gear Discovery",
    template: "%s | SmartGearPicks",
  },
  description:
    "Explore thoughtfully curated products across tech, workspace, lifestyle, and home gear. Honest discovery without endless scrolling.",
  keywords: [
    "curated products",
    "smart gear picks",
    "tech recommendations",
    "workspace essentials",
    "lifestyle accessories",
    "handpicked gear",
    "product discovery",
  ],
  authors: [{ name: "SmartGearPicks Editorial Team", url: siteUrl }],
  creator: "SmartGearPicks",
  publisher: "SmartGearPicks",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "SmartGearPicks",
    title: "SmartGearPicks – Curated Products & Everyday Gear Discovery",
    description:
      "Skip the endless scrolling. We discover and curate standout tech, lifestyle, and workspace tools to elevate your daily routine.",
    images: [
      {
        url: "/Hero/Luxury Tech and Fashion Product Collection.png",
        width: 1200,
        height: 630,
        alt: "SmartGearPicks Curated Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartGearPicks – Curated Products & Everyday Gear Discovery",
    description:
      "Handpicked gear, tools, and lifestyle accessories worth owning.",
    images: ["/Hero/Luxury Tech and Fashion Product Collection.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global JSON-LD Schema: WebSite & Organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "SmartGearPicks",
        description:
          "Independent product discovery and curation platform for technology, lifestyle, and workspace gear.",
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/catalog?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "SmartGearPicks",
        url: siteUrl,
        logo: `${siteUrl}/Hero/Luxury Tech and Fashion Product Collection.png`,
        contactPoint: {
          "@type": "ContactPoint",
          email: "contact@smartgearpicks.com",
          contactType: "customer service",
        },
      },
    ],
  };

  return (
    <html lang="en" className="h-full">
      <head>
        {/* Google Fonts: Geist + Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Inter:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        {/* Material Symbols Outlined — used by product detail pages */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />

        {/* Global Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google AdSense Integration Hook (Activated cleanly when NEXT_PUBLIC_ADSENSE_CLIENT_ID is set) */}
        {adsenseClientId && (
          <Script
            id="google-adsense"
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col antialiased bg-[#F6F4EF] text-[#22231F]">
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
