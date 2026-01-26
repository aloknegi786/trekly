import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/global/header";
import BackgroundImage from "@/components/global/bggroundImage";
import WhatsAppFloatingButton from "@/components/global/whatsappButton";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/global/Footer";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


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
