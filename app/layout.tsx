import type { Metadata, Viewport } from "next";
import { Inter, Anton, Sacramento } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SITE_TAGLINE } from "@/lib/site";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const script = Sacramento({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  keywords: [
    "best donut in Nepal",
    "best donuts Kathmandu",
    "best donut shop Kathmandu",
    "best donut Lalitpur",
    "best donut Kathmandu valley",
    "donut shop near me",
    "eggless donuts Kathmandu",
    "eggless donuts Nepal",
    "donut shop Pulchowk",
    "donut shop Jhamsikhel",
    "donut shop Budhanilkantha",
    "donut shop Dhapasi",
    "Donut Drool",
    "Donut Drool Nepal",
    "Donut Drool menu",
    "Donut Drool Jhamsikhel",
    "Donut Drool Pulchowk",
    "Donut Drool Budhanilkantha",
    "Donut Drool Dhapasi",
    "donut delivery Kathmandu",
    "cafe Pulchowk",
    "dessert shop Lalitpur",
    "sweet shop Kathmandu",
    "bakery Kathmandu",
    "kunafa donut Nepal",
    "oreo donut Kathmandu",
    "custard donut Kathmandu",
    "chocolate donut Kathmandu",
    "birthday donut box Kathmandu",
    "donut gift box Nepal",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "food",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/logo.png",
        width: 2471,
        height: 1312,
        alt: `${SITE_NAME} — fresh eggless donuts from Nepal`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: ["/logo.png"],
    creator: "@donut_drool",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon-192.png",
    apple: [
      { url: "/favicon-192.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: "InNcMDqo0jfUTcYvoVkaPiwP0i4XY92X-FxSVlQMHrQ",
  },
};

export const viewport: Viewport = {
  themeColor: "#e3242b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-NP"
      className={`${sans.variable} ${display.variable} ${script.variable}`}
    >
      <body>
        {children}
        <JsonLd />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
