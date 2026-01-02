import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WorldCupTickets.app - Buy FIFA World Cup, Olympics & Sports Championship Tickets and More",
  description: "The ultimate destination for sports fans seeking tickets to FIFA World Cup 2026, Olympics 2028, Rugby World Cup, Cricket World Cup and more. Compare prices from StubHub, Viagogo & verified resellers.",
  keywords: "World Cup tickets, FIFA World Cup 2026, Olympics 2028 tickets, Rugby World Cup tickets, sports tickets, buy tickets",
  openGraph: {
    title: "WorldCupTickets.app - Global Sports Championship Tickets",
    description: "Buy tickets to FIFA World Cup 2026, Olympics 2028, Rugby World Cup and more from verified resellers.",
    type: "website",
    locale: "en_US",
    siteName: "WorldCupTickets.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "WorldCupTickets.app - Global Sports Championship Tickets",
    description: "Buy tickets to FIFA World Cup 2026, Olympics 2028, Rugby World Cup and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0f0f23" />
      </head>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
