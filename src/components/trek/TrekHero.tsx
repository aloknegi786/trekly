"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { TrekMetaBar } from "./TrekMetaBar"

export function TrekHero() {
  const [priceHovering, setHovering] = useState(false);

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

        <div className="mt-8 flex gap-4">
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
        </div>
      </div>

    </section>
  )
}