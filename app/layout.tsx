import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import ToastProvider from "@/components/providers/toaster-provider";

export const metadata: Metadata = {
  title: "Milfar Academy",
  description: "Pelajari teknik bercocok tanam dari dasar hingga mahir...",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
