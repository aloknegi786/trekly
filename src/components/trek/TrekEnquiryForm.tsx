"use client";

import { useActionState } from "react";
import { handleEnquiryAction } from "@/actions/enquiryform";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export type ActionState = {
  success?: boolean;
  error?: string;
} | null;

export function TrekEnquiryForm() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    handleEnquiryAction,
    null
  );

  return (
    <aside className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Enquire Now</h3>

      <form id="EnquiryForm" action={formAction} className="space-y-3">
        {/* 'name' attributes are CRITICAL for Server Actions */}
        <Input name="fullName" placeholder="Full Name" required />
        <Input name="email" type="email" placeholder="Email Address" required />
        <Input name="phoneNumber" type="tel" placeholder="Phone Number" required />
        <Input name="date" type="date" required />

        <Textarea 
          name="message"
          placeholder="Message" 
          className="min-h-[100px] resize-none" 
          required
        />

        <Button 
          disabled={isPending}
          type="submit" 
          className="mt-2 w-full bg-orange-600 hover:bg-orange-700 font-semibold h-11"
        >
          {isPending ? "Sending..." : "Send Enquiry"}
        </Button>

        {/* Feedback Messages */}
        {state?.success && <p className="text-green-600 text-sm">Enquiry sent successfully!</p>}
        {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}
      </form>
    </aside>

  );
}