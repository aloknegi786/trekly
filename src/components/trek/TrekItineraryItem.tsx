import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { TrekItineraryDay } from "./trekItineraryData"
import { Clock, Mountain, Ruler } from "lucide-react"

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
    <Card className="overflow-hidden border-orange-100/50"> 
      <div className="grid grid-cols-1 md:grid-cols-3"> 
        
        {/* Image Container */}
        <div className="relative h-48 md:h-full min-h-[200px] w-full bg-gray-100">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover" 
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
           
            <div className="flex items-center justify-center h-full text-gray-400">
              <Mountain className="w-10 h-10 opacity-20" />
            </div>
          )}
        </div>

        {/* Content Container */}
        <CardContent className="md:col-span-2 space-y-4 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-orange-500 hover:bg-orange-600">Day {day}</Badge>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          </div>

          <p className="text-gray-600 leading-relaxed">{description}</p>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium pt-2">
            {distance && (
              <span className="flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-orange-500" /> {distance}
              </span>
            )}
            {duration && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-orange-500" /> {duration}
              </span>
            )}
            {elevation && (
              <span className="flex items-center gap-1.5">
                <Mountain className="w-4 h-4 text-orange-500" /> {elevation}
              </span>
            )}
          </div>

          {highlights && highlights.length > 0 && (
            <div className="pt-2">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-orange-500 mt-1">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  )
}