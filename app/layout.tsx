import { Metadata } from "next";

import "@/styles/globals.css";

import localFont from "next/font/local";

import App from "@/layout/App";

import { CartContextProvider } from "@/context/Cart";

import SessionProvider from "@/components/SessionProvider";

import React from "react";

export const metadata: Metadata = {
  title: "Shopping",
  description: "Full Stack Shopping Project Developed With Nextjs version 15.",
};

const PhilosopherFont = localFont({
  src: "../public/fonts/Philosopher-Regular.woff2",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${PhilosopherFont.className}`}>
        <SessionProvider>
          <CartContextProvider>
            <App>{children}</App>
          </CartContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
