import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import Footer from "@/backbone/footer";
import type { Viewport } from "next";
import { AppProvider } from "@/components/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnıTopla",
  description: "AnıTopla ile düğün albümlerinizi oluşturun",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
