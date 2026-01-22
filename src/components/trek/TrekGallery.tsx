"use client"

import Image from "next/image"

const images = [
  "/images/img1.jpeg",
  "/images/img2.jpeg",
  "/images/img3.jpeg",
  "/images/img4.jpeg",
  "/images/img5.jpeg",
  "/images/img6.jpeg",
]

export function TrekGallery() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Photo Gallery</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src) => (
          <div key={src} className="relative aspect-square overflow-hidden rounded-lg">
            <Image 
                src={src} 
                alt="Trek photo" 
                fill 
                // sizes="(max-width: 640px) 100vw,
                //   (max-width: 1024px) 70vw,
                //   33vw"
                className="object-cover" 
              />
          </div>
        ))}
      </div>
    </section>
  )
}
