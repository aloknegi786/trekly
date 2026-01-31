"use client";

import { Check, X } from "lucide-react"

export function TrekInclusions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <Item icon={<Check />} text="English-speaking guide"/>
      <Item icon={<Check />} text="Accommodation" />
      <Item icon={<Check />} text="Meals" />
      <Item icon={<X />} text="International flights" />
    </div>
  )
}

function Item({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-green-600">{icon}</span>
      <span>{text}</span>
    </div>
  )
}
