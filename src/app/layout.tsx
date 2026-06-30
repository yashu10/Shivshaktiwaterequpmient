import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { UIProvider } from "../context/UIContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LeadPopup } from "../components/LeadPopup";
import { VideoModal } from "../components/VideoModal";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SHIV SHAKTI WATER EQUIPMENT PVT. LTD. | Leading B2B Water Filling Machinery",
  description: "Leading manufacturer & exporter of mineral water filling machinery, RO plants, and packaging equipment since 1998. Global reach with ISO certified quality.",
  keywords: "mineral water plant, bottle filling machine, juice filling machine, soda filling machine, beer filling machine, shrink wrapping, RO plant, blow molding, batch coding, lab equipment",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.shivshaktiengineering.com",
  },
  openGraph: {
    type: "website",
    url: "https://www.shivshaktiengineering.com",
    title: "SHIV SHAKTI WATER EQUIPMENT PVT. LTD. | B2B Manufacturing",
    description: "Trusted manufacturers of water treatment plants, juice, soda & filling lines.",
    images: [
      {
        url: "https://www.shivshaktiengineering.com/assets/images/shiv_shakti_logo.png",
        width: 800,
        height: 600,
        alt: "Shiv Shakti Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <UIProvider>
          <Header />
          {children}
          <Footer />
          <LeadPopup />
          <VideoModal />
        </UIProvider>
      </body>
    </html>
  );
}
