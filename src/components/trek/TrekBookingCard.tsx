import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TrekBookingCard() {
  return (
    <aside className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Book Your Trek</h3>

      <div className="space-y-3">
        <Input placeholder="Full Name" />
        <Input placeholder="Email Address" />
        <Input placeholder="Phone Number" />
        <Input type="date" />
      </div>

      <Button className="mt-4 w-full bg-orange-600 hover:bg-orange-700">
        Book Now
      </Button>
    </aside>
  )
}
