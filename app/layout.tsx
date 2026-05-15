import type { Metadata } from "next";
import { Inter, Anton, Sacramento } from "next/font/google";
import "./globals.css";

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
  title: "Donut Drool — Freaking Delicious",
  description:
    "Donut Drool: eggless Nepali donuts that make you smile a little more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
