"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function TrekEnquiryForm() {
  return (
    <aside className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Enquire Now</h3>

      <form className="space-y-3">
        <Input placeholder="Full Name" />
        <Input type="email" placeholder="Email Address" />
        <Input type="tel" placeholder="Phone Number" />
        <Input type="date" />

        <Textarea 
          placeholder="Message" 
          className="min-h-[100px] resize-none" 
        />

        <Button className="mt-2 w-full bg-orange-600 hover:bg-orange-700 font-semibold h-11">
          Send Enquiry
        </Button>
      </form>
    </aside>
  )
}