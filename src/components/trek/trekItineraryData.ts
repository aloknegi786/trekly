"use client";

export interface TrekItineraryDay {
  day: number
  title: string
  description: string
  distance?: string
  duration?: string
  elevation?: string
  highlights?: string[]
  image?: string
}

export const trekItinerary: TrekItineraryDay[] = [
  {
    day: 1,
    title: "Dehradun to Pantwari → Trek to Base Camp",
    description:
      "Early morning pickup from Dehradun followed by a scenic drive through Mussoorie to Pantwari village. After lunch, begin the trek through oak and rhododendron forests to reach Nag Tibba Base Camp.",
    distance: "4–5 km",
    duration: "3–4 hr drive + 4–5 hr trek",
    elevation: "8,700 ft",
    highlights: [
      "Scenic Mussoorie drive",
      "Forest trail trek",
      "Bonfire & camping",
      "Star gazing"
    ],
    image: "/images/itinerary_1.png"
  },
  {
    day: 2,
    title: "Nag Tibba Summit → Pantwari → Dehradun",
    description:
      "Early morning summit push to witness a breathtaking Himalayan sunrise. After spending time at the summit, descend to base camp for lunch and continue down to Pantwari before returning to Dehradun.",
    distance: "8–10 km",
    duration: "6–7 hrs",
    elevation: "9,915 ft (Summit)",
    highlights: [
      "Sunrise summit trek",
      "360° Himalayan views",
      "Swargarohini & Bandarpoonch views",
      "Return journey"
    ],
    image: "/images/itinerary_2.png"
  }
]
