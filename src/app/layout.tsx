import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Tribe Agent | AI Automation & Web Development — London",
  description:
    "Tribe Agent builds custom AI automations, modern websites, and smart data tools for SMEs, retailers, and hospitality businesses in the UK. Based in Shoreditch, London.",
  keywords: [
    "AI automation",
    "n8n workflows",
    "web development",
    "London",
    "SME",
    "AI agents",
    "Framer websites",
  ],
  openGraph: {
    title: "Tribe Agent | AI Automation & Web Development",
    description:
      "Stop doing it manually. Let AI do the work. Custom automations and modern websites for UK small businesses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${outfit.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
