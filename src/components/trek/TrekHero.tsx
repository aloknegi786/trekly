"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PriceSection } from "./PriceSection";

export function TrekHero() {
  const [priceHovering, setHovering] = useState(false);

  const offer = {
    title: "Valentine's Special Offer",
    description: "Book now and get 10% off on all treks!",
    price: "₹2250",
    originalPrice: "₹2500", // Extracted for display logic
    startDate: "February 1, 2024",
    endDate: "February 28, 2024",
  };

  // Date Logic
  const now = new Date();
  const start = new Date(offer.startDate);
  const end = new Date(offer.endDate);
  
  // Check if current date is within range
  const isOfferActive = now >= start && now <= end;

  const scrollToSection = () => {
    document
      .getElementById("EnquiryForm")
      ?.scrollIntoView({ behavior: "smooth", block: "end" });
  };
  return (
    <section className="relative h-[70vh] w-full">
      <Image
        src="/images/NagTibba0.jpeg"
        alt="Nag Tibba Trek View"
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      <header 
        className="w-full px-2 py-1 flex bg-transparent top-0 h-10">
      </header>
      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col justify-center px-4 text-white">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Nag Tibba Trek
        </h1>

        <p className="mt-2 text-lg md:text-xl text-gray-200 font-medium">
          Garhwal Himalayas, Uttarakhand
        </p>

        <p className="mt-4 max-w-2xl text-lg text-gray-100 leading-relaxed shadow-sm">
          Experience the magic of the Himalayas. Whether you are a first-timer 
          or a seasoned hiker, join us for a life-changing adventure in the heart 
          of the Garhwal region.
        </p>

        <div className="mt-8 flex gap-4 container flex-col sm:flex-row sm:items-center sm:w-1/2">
          <Button 
            onClick={scrollToSection}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all"
          >
            Enquire Now
          </Button>

          <Button 
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all"
          >
            <span className="text-orange-200">₹</span>
            2500 <span className="text-gray-200 text-sm">/ person</span>
          </Button>
          <PriceSection />
        </div>

        
      </div>

    </section>
  )
}