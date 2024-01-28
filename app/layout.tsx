import "./globals.css";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import PersistLogin from "@/components/PersistedLogin";
import ProviderWrapper from "@/components/Wrappers/Provider";
import QueryClientProviderWrapper from "@/components/Wrappers/QueryClientProvider";
import { Inter } from "next/font/google";
import QuickViewModel from "@/components/Models/QuickViewModel";
import PictureModel from "@/components/Models/PictureModel";
import CompareModel from "@/components/Models/CompareModel";
import Footer from "@/components/Footer";

import { type ReactNode } from "react";
// import { TooLongTimeError } from "@/utils/exception";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://localhost:3000"),
  title: "Dukamarket App",
  description: "Digital storefront on the internet",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  authors: [
    { name: "Amr tawfik" },
    { name: "Hady Tawfik", url: "https://dukamarket-nextjs.vercel.app" },
  ],
  applicationName: "Dukamarket",
  openGraph: {
    title: "Dukamarket App",
    description: "Digital storefront on the internet",
    url: "https://dukamarket-nextjs.vercel.app",
    siteName: "Next.js",
    images: [
      {
        url: "https://res.cloudinary.com/amrelgendy/image/upload/v1692019913/ogImage.png_ez8ot9.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // throw new TooLongTimeError("asasas");
  return (
    <html lang="en">
      <QueryClientProviderWrapper>
        <ProviderWrapper>
          <body className={inter.className}>
            <PersistLogin>
              {/* <Topbar /> */}
              <Header />
              <Navbar />
              <main className="py-8 bg-gray-100">{children}</main>
              <Footer />
              <QuickViewModel />
              <PictureModel />
              <CompareModel />
            </PersistLogin>
          </body>
        </ProviderWrapper>
      </QueryClientProviderWrapper>
    </html>
  );
}
