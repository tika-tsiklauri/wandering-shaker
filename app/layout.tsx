import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const siteUrl = "https://www.wandering-shaker.com/";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Wandering Shaker | Mobile Bar Service in Westchester, NY",
    template: "%s | Wandering Shaker",
  },

  description:
    "Thoughtfully designed mobile bar service for weddings, private gatherings, corporate events, fundraisers, and celebrations throughout Westchester County, New York City, the Hudson Valley, Connecticut, and New Jersey.",

  keywords: [
    "Wandering Shaker",
    "mobile bar service",
    "mobile bartending",
    "Westchester mobile bar",
    "Westchester bartending service",
    "New York mobile bar",
    "wedding bar service",
    "private event bartending",
    "corporate event bartending",
    "fundraiser bartending",
    "custom cocktails",
    "beer and wine service",
    "event beverage service",
  ],

  authors: [
    {
      name: "Wandering Shaker",
      url: siteUrl,
    },
  ],

  creator: "Wandering Shaker",
  publisher: "Wandering Shaker",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Wandering-Shaker",
    title: "Wandering Shaker | Mobile Bar Service in Westchester, NY",
    description:
      "Thoughtfully designed mobile bar service for intimate dinners, weddings, private gatherings, corporate events, fundraisers, and celebrations throughout New York, Connecticut, and New Jersey.",
    images: [
      {
        url: "/IMG_new_bar.jpg",
        width: 1200,
        height: 630,
        alt: "Wandering Shaker mobile bar service",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Wandering Shaker | Mobile Bar Service in Westchester, NY",
    description:
      "Thoughtfully designed mobile bar service for weddings, private gatherings, and celebrations throughout New York, Connecticut, and New Jersey.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const wanderingShakerSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${siteUrl}/#wandering-shaker`,

  name: "Wandering Shaker",
  alternateName: "Wandering Shaker NY",
  url: siteUrl,

  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/logo.png`,
  },

  image: `${siteUrl}/og-image.jpg`,

  description:
    "Wandering Shaker is a thoughtfully designed mobile bar and event hospitality service based in Westchester County, New York, serving weddings, private gatherings, corporate events, fundraisers, and celebrations throughout New York, Connecticut, and New Jersey.",

  address: {
    "@type": "PostalAddress",
    addressLocality: "Westchester County",
    addressRegion: "NY",
    addressCountry: "US",
  },

  areaServed: [
    {
      "@type": "AdministrativeArea",
      name: "Westchester County, New York",
    },
    {
      "@type": "AdministrativeArea",
      name: "Hudson Valley, New York",
    },
    {
      "@type": "City",
      name: "New York City",
    },
    {
      "@type": "AdministrativeArea",
      name: "Fairfield County, Connecticut",
    },
    {
      "@type": "State",
      name: "Connecticut",
    },
    {
      "@type": "State",
      name: "New Jersey",
    },
  ],

  knowsAbout: [
    "Mobile bar service",
    "Mobile bartending",
    "Private event hospitality",
    "Wedding bar service",
    "Corporate event bar service",
    "Fundraiser bar service",
    "Custom cocktail service",
    "Beer and wine service",
    "Mocktail service",
    "Event beverage programs",
  ],

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Mobile Bar Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Wedding Bar Service",
          description: "Custom mobile bar and beverage service for weddings.",
          areaServed: "New York, Connecticut, and New Jersey",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Private Event Bar Service",
          description:
            "Thoughtfully designed bar service for private gatherings and celebrations.",
          areaServed: "New York, Connecticut, and New Jersey",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Corporate Event Bar Service",
          description:
            "Mobile beverage and bartending service for corporate gatherings and brand events.",
          areaServed: "New York, Connecticut, and New Jersey",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fundraiser Bar Service",
          description:
            "Professional mobile bar service for fundraisers and nonprofit events.",
          areaServed: "New York, Connecticut, and New Jersey",
        },
      },
    ],
  },

  sameAs: [
    "https://www.instagram.com/wandering_shaker?utm_source=qr",
    "https://share.google/IyX6lLRECwdi0Ai1X",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`
          ${cormorant.variable}
          ${inter.variable}
          min-h-screen
          bg-[--background]
          text-[--foreground]
          antialiased
        `}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(wanderingShakerSchema).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />

        <Navbar />

        <main>{children}</main>

        <Footer />

        <Analytics />
      </body>
    </html>
  );
}
