// app/layout.tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CustomerProvider } from "../lib/CustomerContext";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "HisabKar — Payment Tracker",
  description: "Monthly payment collection for local vendors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50 font-sans">
        <CustomerProvider>
          <div className="max-w-sm mx-auto min-h-screen bg-white shadow-sm relative">
            {children}
          </div>
        </CustomerProvider>
      </body>
    </html>
  );
}
