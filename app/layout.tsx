import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://note-folio.onrender.com";

const TITLE = "Nishant Borude | Full Stack Developer| Backend developer";
const DESCRIPTION =
    "Explore Nishant Borude's portfolio, software engineering experience, full-stack projects, AI applications, and open-source contributions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Nishant Borude - PORTFOLIO'",
verification: {
    google: "UT0Cs7IGzXCCV3Uq4a3yAt6QRD5KQGVBhqQY5puw ",
  },
  authors: [{ name: "Nishant Borude" }],
  creator: "Nishant Borude",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Nishant Borude — Journal",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@nishant-borude"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "rgb(250 247 240)" },
    { media: "(prefers-color-scheme: dark)", color: "rgb(250 247 240)" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
