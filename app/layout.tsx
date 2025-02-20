"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SWRProvider from "./context/SWRProvider"; // Import new provider
import { ThemeProvider } from "./context/ThemeProvider";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <ThemeProvider>
            <SWRProvider>
              {children}
            </SWRProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
