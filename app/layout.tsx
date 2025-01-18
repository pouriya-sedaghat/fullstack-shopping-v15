import { Metadata } from "next";

import "@/styles/globals.css";

import localFont from "next/font/local";

import App from "@/layout/App";

import { CartContextProvider } from "@/context/Cart";

// import SessionProvider from "@/components/SessionProvider";

// NextAuth Version 4

// import { SessionProvider } from "next-auth/react";

// import { getServerSession } from "next-auth";

// import { authOptions } from "./api/auth/[...nextauth]/route";

// NextAuth Version 5 (Beta 25)

import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";

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
  // NextAuth Version 4

  // const session = await getServerSession(authOptions);

  // NextAuth Version 5 (Beta 25)

  const session = await auth();

  return (
    <html lang="en">
      <body className={`${PhilosopherFont.className}`}>
        {/* <SessionProvider> */}
        <SessionProvider session={session}>
          <CartContextProvider>
            <App>{children}</App>
          </CartContextProvider>
        </SessionProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
