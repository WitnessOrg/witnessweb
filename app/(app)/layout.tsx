import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import "@/app/globals.css";

// Shadcn Components import
import { Button } from "@/components/ui/button"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Witness",
  description: "The system has lawyers. Now you have Witness.",
};


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full w-full antialiased bg-white`}
      >
        <header className="bg-white h-auto pt-2.5 pl-7.5 pr-7.5 pb-2.5">
          <nav className="h-10 flex items-center justify-between ">
            <Link href="/">
              <Image src="/witness-logo.svg" width={77} height={18} alt="Witness logo" />
            </Link>
            <div className="flex items-center gap-x-2.25">
              <Link href="/sign-in" className="flex items-center justify-center rounded-full w-auto bg-black pl-2.5 pr-2.5 pt-0.5 pb-0.5">
                <span className="font-sans tracking-[-0.05em] font-normal text-sm text-white">Sign in</span>
              </Link>
            </div>
          </nav>
        </header>
        <main className="bg-white">{children}</main>
      </body>
    </html>
  );
}