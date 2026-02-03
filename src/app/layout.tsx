import "./globals.css";
import { Metadata } from 'next';
import { Inter } from "next/font/google";
import Header from "@/components/global/header";
import BackgroundImage from "@/components/global/bggroundImage";
import WhatsAppFloatingButton from "@/components/global/whatsappButton";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/global/Footer";
import React from "react";
import ReactQueryProvider from "@/tanstack-query";
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL('https://divyatourandtreks.in'),
  title: {
    default: "Nag Tibba Trek from Dehradun | Divya Tour and Treks",
    template: "%s | Divya Tour and Treks",
  },
  description: "Book the best Nag Tibba Trek package from Dehradun. 2-Day weekend snow trek via Pantwari Village. Includes transport, meals, camping gear, and guide.",
  keywords: [
    "Nag Tibba trek booking",
    "Nag Tibba trek from Dehradun",
    "Pantwari to Nag Tibba distance",
    "Nag Tibba weather",
    "weekend treks near Mussoorie",
    "Divya Tour and Treks",
    "best snow trek in Uttarakhand",
    "Nag Tibba trek cost",
  ],
  authors: [{ name: "Divya Tour and Treks" }],
  creator: "Divya Tour and Treks",
  publisher: "Divya Tour and Treks",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Nag Tibba Trek - Weekend Snow Trek from Dehradun',
    description: 'Join our premium Nag Tibba trek starting from Dehradun. Complete package including transport, food, and camping.',
    url: 'https://divyatourandtreks.in',
    siteName: 'Divya Tour and Treks',
    images: [
      {
        url: '/images/img6.jpeg',
        width: 1200,
        height: 630,
        alt: 'Nag Tibba Summit View',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nag Tibba Trek from Dehradun',
    description: 'Best weekend adventure from Dehradun. Book now!',
    images: ['/images/img6.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.png',
  },
  verification: {
    google: `${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_ID}`, // TODO: Add this from Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        // Schema for your Business
        "@type": "TravelAgency",
        "name": "Divya Tour and Treks",
        "image": "https://divyatourandtreks.in/icon.jpeg",
        "url": "https://divyatourandtreks.in",
        "telephone": `${process.env.NEXT_PUBLIC_ADMIN_PHONE_NUMBER}`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": `${process.env.NEXT_PUBLIC_ADDRESS}`, 
          "addressLocality": "Prayagraj", 
          "postalCode": `${process.env.NEXT_PUBLIC_PIN_CODE}`, 
          "addressCountry": "IN"
        },
        "priceRange": "₹ 2000 - ₹ 2500",
      },
      {
        "@type": "Product",
        "name": "Nag Tibba Trek Package (from Dehradun)",
        "image": "https://divyatourandtreks.in/images/img6.jpeg",
        "description": "2 Days / 1 Night trek to Nag Tibba summit. Includes pickup from Dehradun ISBT, meals, and camping equipment.",
        "brand": {
          "@type": "Brand",
          "name": "Divya Tour and Treks"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://divyatourandtreks.in/",
          "priceCurrency": "INR",
          "price": "2250",
          "priceValidUntil": "2026-02-28",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Divya Tour and Treks"
          }
        }
      },
      {
        // Schema for FAQs (Crucial for appearing in "People also ask")
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the best time for Nag Tibba Trek?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nag Tibba is a year-round trek. However, the best time for snow is January to March. For greenery, visit from April to June or October to December."
            }
          },
          {
            "@type": "Question",
            "name": "Do you provide transport from Dehradun?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our package includes pick-up and drop-off from Dehradun Railway Station or ISBT to Pantwari village (base camp)."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}');
          `}
        </Script>

        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <ReactQueryProvider>
          <BackgroundImage />
          <Header />
          
          <main className="flex-grow min-h-screen relative z-10">
            {children}
          </main>
          
          <Footer />
          <WhatsAppFloatingButton />
          <Toaster position="top-center" reverseOrder={false} />
        </ReactQueryProvider>
      </body>
    </html>
  );
}