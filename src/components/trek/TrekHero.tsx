"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { TrekMetaBar } from "./TrekMetaBar"

export function TrekHero() {
  return (
    <section className="relative h-[70vh] w-full">
      <Image
        src="/images/NagTibba1.jpeg"
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
          <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all">
            Enquire Now
          </Button>
          {/* <TrekMetaBar/> */}
        </div>
      </div>

    </section>
  )
}