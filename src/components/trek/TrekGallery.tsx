"use client"

import { useState } from "react"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const images = [
  "/images/img1.jpeg",
  "/images/img2.jpeg",
  "/images/img3.jpeg",
  "/images/img4.jpeg",
  "/images/img5.jpeg",
  "/images/img6.jpeg",
  "/images/img7.jpeg",
  "/images/img8.jpeg",
  "/images/img9.jpeg",
  "/images/img10.jpeg",
  "/images/img11.jpeg",
  "/images/img12.jpeg",
  "/images/img13.jpeg",
  "/images/img14.jpeg",
  "/images/img15.jpeg",
  "/images/img16.jpeg",
]

export function TrekGallery() {
  const [activeImage, setActiveImage] = useState(images[0])

  return (
    <section className="space-y-8 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Photo Gallery</h2>
      
      <div className="flex flex-col gap-4">
        
        {/* 1. Main Large Display */}
        <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-xl shadow-lg bg-gray-100">
          <Image 
            src={activeImage} 
            alt="Selected View" 
            fill 
            className="object-cover animate-in fade-in zoom-in duration-300" 
            key={activeImage} // Key ensures animation restarts on change
          />
        </div>

        {/* 2. Thumbnail Strip */}
        <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex gap-4">
          {images.map((src, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(src)}
              className={`relative flex-shrink-0 w-24 h-24 md:w-32 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                activeImage === src ? "border-orange-600 ring-2 ring-orange-100" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image 
                src={src} 
                alt="thumbnail" 
                fill 
                className="object-cover" 
              />
            </button>
          ))}
        </div>
        
        <ScrollBar 
          orientation="horizontal" 
          className="h-3 [&>div]:bg-orange-600 hover:[&>div]:bg-orange-700 [&>div]:w-2/3"
        />
      </ScrollArea>
      </div>
    </section>
  )
}