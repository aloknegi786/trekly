"use client";

import { useActionState, useEffect, useRef } from "react"; // Added useEffect, useRef
import { handleEnquiryAction } from "@/actions/enquiryform";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast"; // Recommended for better feedback

export type ActionState = {
  success?: boolean;
  error?: string;
} | null;

export function TrekEnquiryForm() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    handleEnquiryAction,
    null
  );

 
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      toast.success("Enquiry sent successfully!");
      formRef.current?.reset(); // <--- This clears the inputs
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <aside 
      id="EnquiryForm" 
      className="rounded-xl border bg-white p-6 shadow-sm scroll-mt-28"
    >
      <h3 className="text-xl font-semibold mb-4">Enquire Now</h3>

      <form 
        ref={formRef}
        action={formAction} 
        className="space-y-3"
      >
        <Input name="fullName" placeholder="Full Name" required disabled={isPending} />
        <Input name="email" type="email" placeholder="Email Address" required disabled={isPending} />
        <Input name="phoneNumber" type="tel" placeholder="Phone Number" required disabled={isPending} />
     
        <Input 
          name="date" 
          type="date" 
          required 
          disabled={isPending}
          min={new Date().toISOString().split("T")[0]} 
        />

        <Textarea 
          name="message"
          placeholder="Message" 
          className="min-h-[100px] resize-none" 
          required
          disabled={isPending}
        />

        <Button 
          disabled={isPending}
          type="submit" 
          className="mt-2 w-full bg-orange-600 hover:bg-orange-700 font-semibold h-11"
        >
          {isPending ? "Sending..." : "Send Enquiry"}
        </Button>

        {state?.success && (
            <p className="text-green-600 text-sm text-center mt-2">
                ✓ Enquiry sent! We will contact you soon.
            </p>
        )}
      </form>
    </aside>
  );
}