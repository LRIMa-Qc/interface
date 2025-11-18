import type { Metadata } from "next";
import { Space_Grotesk as Font } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "./components/header/Header";
import { Toaster } from "react-hot-toast";

const font = Font({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BRING",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics />
      <body className={`${font.className} antialiased `}>
        <Toaster />
        <main className="bg-black h-screen text-white max-w-screen overflow-hidden">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
