import { Geist, Geist_Mono } from "next/font/google";
import { Jersey_15, Jersey_25_Charted } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jersey15 = Jersey_15({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-jersey-15",
});

const jersey25Charted = Jersey_25_Charted({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-jersey-25-charted",
});

export const metadata = {
  title: "Squid Game Theories 🦑 | Hidden Secrets & Season 3 Predictions",
  description:
    "Explore mind-blowing Squid Game theories, hidden details, and Season 3 predictions! Squid Game Season 2 is out now, and Season 3 is coming in June! 🔥",
  keywords: [
    "Squid Game",
    "Squid Game Season 2",
    "Squid Game Season 3",
    "Squid Game theories",
    "Netflix Squid Game",
    "Squid Game release date",
    "Squid Game hidden details",
    "Squid Game predictions",
    "Squid Game Netflix",
  ],
  author: "Squid Game Theory Hub",
  themeColor: "#ff0000",
  openGraph: {
    title: "Squid Game Theories 🦑 | Hidden Secrets & Season 3 Predictions",
    description:
      "Discover shocking Squid Game theories and predictions for Season 3! Squid Game Season 2 is here, and Season 3 is coming in June. Don't miss out!",
    url: "https://yourdomain.com",
    siteName: "Squid Game Theory Hub",
    images: [
      {
        url: "https://yourdomain.com/squid-game-thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "Squid Game Theories",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    creator: "@yourtwitterhandle",
    title: "Squid Game Theories 🦑 | Hidden Secrets & Season 3 Predictions",
    description:
      "Mind-blowing Squid Game theories, hidden clues, and predictions for Season 3! Squid Game Season 2 is out, and Season 3 is coming in June! 🚀",
    images: ["https://yourdomain.com/squid-game-thumbnail.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦑</text></svg>"
        />
      </head>
      <body
        className={`  
          ${jersey15.className}
          antialiased
          overflow-x-hidden
        `}
      >
        {children}
      </body>
    </html>
  );
}
