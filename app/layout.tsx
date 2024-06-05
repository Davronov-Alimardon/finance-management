import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/provider/query-provider";
import { SheetProvider } from "@/provider/sheet-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance 911",
  description: "This is your Financial Overview Report",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <QueryProvider>
            <SheetProvider />
            <Toaster />
            {children}
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
