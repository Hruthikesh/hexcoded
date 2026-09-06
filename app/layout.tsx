import type { Metadata } from "next";
import "@fontsource/fraunces/300.css";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/300-italic.css";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource/fraunces/500-italic.css";
import "@fontsource/fraunces/600-italic.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hexcoded.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "HexCoded — AI-Powered Shows",
  description:
    "HexCoded makes short dramas, vertical series and short films with AI — with consistent characters and looks across the series.",
  openGraph: {
    title: "HexCoded — AI-Powered Shows",
    description:
      "HexCoded makes short dramas, vertical series and short films with AI — with consistent characters and looks across the series.",
    url: siteUrl,
    siteName: "HexCoded",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HexCoded — AI-Powered Shows",
    description:
      "HexCoded makes short dramas, vertical series and short films with AI — with consistent characters and looks across the series.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased">
        {children}
      </body>
    </html>
  );
}
