import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/for-referencing/theme-provider"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "St' Joseph Plentong Church",
  description:
    "Discover immutable records of historic truth at Immutable Archive. Explore suppressed texts, prophetic parallels, and ancient wisdom preserved for truth-seekers worldwide.",
  keywords: [
    "immutable archive",
    "historical documents",
    "suppressed books",
    "bible translations",
    "martyrs testimonies",
    "prophecy records",
    "censorship resistance",
    "decentralized storage",
    "IPFS documents",
    "religious freedom",
    "historical truth",
    "reformation history",
    "secret societies",
    "church history",
    "biblical prophecy",
    "blog",
    "reformation",
    "christian history",
    "J.H. Merle D'Aubigné",
    "open source",
    "free speech",
    "Bernstein v. US",
    "encryption rights",
    "code as speech",
    "early believers",
    "martyrs",
    "eyewitness accounts",
    "historical Jesus",
  ],
  authors: [{ name: "Immutable Project" }],
  creator: "Immutable Project",
  publisher: "Immutable Archive",
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
  icons: {
    icon: "/favicon.ico",
    apple: "/immutable_logo.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://historictruth.org",
    siteName: "Immutable Archive",
    title: "Immutable | Truth Preserved. Censorship Resisted.",
    description:
      "Discover immutable records of historic truth at Immutable Archive. Explore suppressed texts, prophetic parallels, and ancient wisdom preserved for truth-seekers worldwide.",
    images: [
      {
        url: "https://historictruth.org/immutable_logo.png",
        width: 1200,
        height: 630,
        alt: "Immutable Archive - Truth Preserved. Censorship Resisted.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ImmutableArchive",
    creator: "@ImmutableArchive",
    title: "Immutable | Truth Preserved. Censorship Resisted.",
    description:
      "Discover immutable records of historic truth at Immutable Archive. Explore suppressed texts, prophetic parallels, and ancient wisdom preserved for truth-seekers worldwide.",
    images: {
      url: "https://historictruth.org/immutable_logo.png",
      alt: "Immutable Archive - Truth Preserved. Censorship Resisted.",
    },
  },
  verification: {
    google: "REPLACE_WITH_YOUR_VERIFICATION_CODE",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "education",
  classification: "Historical Archive",
  other: {
    "msapplication-TileColor": "#da532c",
    "theme-color": "#ffffff",
    "og:image:width": "1200",
    "og:image:height": "630",
    "twitter:image:width": "1200",
    "twitter:image:height": "630",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://historictruth.org/#website",
        name: "Immutable Archive",
        description:
          "Discover immutable records of historic truth at Immutable Archive. Explore suppressed texts, prophetic parallels, and ancient wisdom preserved for truth-seekers worldwide.",
        url: "https://historictruth.org",
        publisher: {
          "@id": "https://historictruth.org/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://historictruth.org/#library?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://historictruth.org/#organization",
        name: "Immutable Project",
        url: "https://historictruth.org",
        logo: {
          "@type": "ImageObject",
          url: "https://historictruth.org/immutable_logo.png",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://historictruth.org/#webpage",
        url: "https://historictruth.org",
        name: "Immutable Archive",
        description:
          "A decentralized archive preserving censored history, martyrs' testimonies, Bible translations, prophecy records, and lost books using decentralized technology.",
        isPartOf: {
          "@id": "https://historictruth.org/#website",
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://historictruth.org",
            },
          ],
        },
      },
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="canonical" href="https://historictruth.org" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
