import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster"
import { SWRProvider } from './swr-provider'
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "情侣默契大挑战",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-cn">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SWRProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-300 to-purple-400 p-4">
            {children}
            <footer className="mt-12 text-center text-white text-sm">
              © 2024 情侣默契大挑战. 保留所有权利.
            </footer>
          </div>
        </SWRProvider>
        <Toaster />
      </body>
    </html>
  );
}
