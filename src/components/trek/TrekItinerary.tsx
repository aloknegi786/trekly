import { trekItinerary } from "./trekItineraryData"
import { TrekItineraryItem } from "./TrekItineraryItem"

export function TrekItinerary() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Day-by-Day Itinerary</h2>

      <div className="space-y-5">
        {trekItinerary.map(day => (
          <TrekItineraryItem key={day.day} {...day} />
        ))}
      </div>
    </section>
  )
}
