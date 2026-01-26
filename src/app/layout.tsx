import "./globals.css";
import { Metadata } from 'next';
import { Inter } from "next/font/google";
import Header from "@/components/global/header";
import BackgroundImage from "@/components/global/bggroundImage";
import WhatsAppFloatingButton from "@/components/global/whatsappButton";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/global/Footer";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL('https://divyatourandtreks.in'),
  title: "Divya Tour and Treks",
  description: "Explore the world with Divya Tour and Treks - Your trusted partner for unforgettable travel experiences and adventure tours.",
  openGraph: {
    title: 'Divya Tour and Treks - Travel Experiences',
    description: 'Explore the world with Divya Tour and Treks - Your trusted partner for unforgettable travel experiences and adventure tours.',
    url: 'https://divyatourandtreks.in',
    siteName: 'Divya Tour and Treks',
    images: [
      {
        url: '/icon.jpeg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <BackgroundImage />
        <Header />
        {children}
        <Footer/>
        <WhatsAppFloatingButton />
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
