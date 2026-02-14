import { Metadata } from "next";
import {
  TrekHero,
  TrekMetaBar,
  TrekOverview,
  TrekGallery,
  TrekBookingCard,
  TrekEnquiryForm
} from "@/components/trek";
import { TrekItinerary } from "@/components/trek/TrekItinerary";

// 1. Update Props: params is a PROMISE
type Props = {
  params: Promise<{ trekname: string }>; // Note: 'trekname' is lowercase based on your error
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// 2. Metadata Generator
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ✅ FIX: Await the params first!
  const resolvedParams = await params;
  const trekName = resolvedParams.trekname;

  const trekNameReadable = trekName.replace(/-/g, " ");
  
  const baseUrl = "https://divyatourandtreks.in";
  const currentPath = `/trek/${trekName}`;
  const fullUrl = `${baseUrl}${currentPath}`;

  return {
    title: `${trekNameReadable} Package`,
    description: `Book the best ${trekNameReadable} package from Dehradun. 2 Days / 1 Night. Includes transport, meals, camping gear, and guide.`,
    
    keywords: [
      trekNameReadable, 
      `${trekNameReadable} trek`,
      `${trekNameReadable} booking`,
      `${trekNameReadable} package`,
      "Nag Tibba",
      "Nag Tibba trek pictures",
      "Nag Tibba trek from Dehradun",
      "Pantwari to Nag Tibba distance",
      "weekend treks near Mussoorie",
      "best snow trek in Uttarakhand",
      "Nag Tibba trek cost",
      "Nag Tibba trek difficulty",
      "Nag Tibba trek itinerary",
      "Nag Tibba trek best time",
      "Nag Tibba summit",
    ],

    alternates: {
      canonical: fullUrl,
    },

    openGraph: {
      title: `${trekNameReadable} - Weekend Snow Trek`,
      description: "Join us for a life-changing Himalayan adventure.",
      url: fullUrl,
      siteName: "Divya Tour and Treks",
      images: [
        {
          url: "/images/img1.jpeg",
          width: 1200,
          height: 630,
          alt: `${trekNameReadable} View`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
  };
}

// 3. Page Component
export default async function TrekDetailPage({ params }: Props) {
  // ✅ FIX: Await the params here too!
  const resolvedParams = await params;
  const trekName = resolvedParams.trekname;

  const trekNameReadable = trekName.replace(/-/g, " ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${trekNameReadable} Package`,
    "image": "https://divyatourandtreks.in/images/img6.jpeg",
    "description": "2 Days / 1 Night trek via Pantwari Village. Includes pickup from Dehradun ISBT.",
    "brand": {
      "@type": "Brand",
      "name": "Divya Tour and Treks"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://divyatourandtreks.in/trek/${trekName}`,
      "priceCurrency": "INR",
      "price": "2500",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Divya Tour and Treks"
      }
    }
  };

  return (
    <div className="w-full">
      {/* Inject Schema into the page head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <TrekHero />
      <TrekMetaBar />

      <main className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <TrekOverview />
          <TrekItinerary />
          <TrekGallery />
        </div>

        <div className="lg:block sticky top-7 h-fit space-y-6">
          <TrekBookingCard />
          
          <div id="EnquiryForm" className="scroll-mt-32">
            <TrekEnquiryForm />
          </div>
          
        </div>
      </main>
    </div>
  );
}