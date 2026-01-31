"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { TrekItineraryDay } from "./trekItineraryData"

export function TrekItineraryItem({
  day,
  title,
  description,
  distance,
  duration,
  elevation,
  highlights,
  image
}: TrekItineraryDay) {
  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:pl-4">
        <div className="relative h-48 md:h-full">
            {image && <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw,
                    (max-width: 1024px) 70vw,
                    33vw"
                className="object-cover rounded-lg w-4/5"
            />}
        </div>

        <CardContent className="md:col-span-2 space-y-4 p-5">
          <div className="flex items-center gap-3">
            <Badge className="bg-orange-500">Day {day}</Badge>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>

          <p className="text-muted-foreground">{description}</p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {distance && <span>📏 {distance}</span>}
            {duration && <span>⏱ {duration}</span>}
            {elevation && <span>⛰ {elevation}</span>}
          </div>

          {highlights && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-orange-500">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </div>
    </Card>
  )
}
