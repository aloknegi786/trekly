import {
  TrekHero,
  TrekMetaBar,
  TrekOverview,
  TrekInclusions,
  TrekGallery,
  TrekBookingCard,
  TrekEnquiryForm
} from "@/components/trek"
import { TrekItinerary } from "@/components/trek/TrekItinerary"

export default function TrekDetailPage() {
  return (
    <div className="w-full">
      <TrekHero />
      <TrekMetaBar />

      <main className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <TrekOverview />
          {/* <TrekInclusions /> */}
          <TrekItinerary />
          <TrekGallery />
        </div>

        <div className="lg:block sticky top-7 h-fit space-y-6">
          <TrekBookingCard />
          <TrekEnquiryForm />
        </div>
      </main>
    </div>
  )
}
