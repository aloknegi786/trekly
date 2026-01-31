"use client"

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

type BookingData = {
  fullName: string;
  email: string;
  phoneNo: string;
  persons: string | number;
  amount: string | number;
  startDate: string;
};

const createBooking = async (formData: BookingData) => {
  const user = auth.currentUser;
  if (!user) throw new Error("You must be logged in to book.");

  const token = await user.getIdToken();

  const res = await fetch('/api/bookings', {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      ...formData,
      persons: Number(formData.persons),
      amount: Number(formData.amount),
      userId: user.uid,
    }),
  });
const contentType = res.headers.get("content-type");
  
  if (!res.ok) {
    // Handle error response
    let errorMessage = "Something went wrong!!";
    
    if (contentType && contentType.includes("application/json")) {
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        console.error("Failed to parse error response:", e);
      }
    } else {
      const errorText = await res.text();
      console.error("Non-JSON error response:", errorText);
    }
    
    throw new Error(errorMessage);
  }

  // Handle success response
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Server returned non-JSON response");
  }

  try {
    return await res.json();
  } catch (error) {
    console.error("Failed to parse success response:", error);
    throw new Error("Invalid response from server");
  }
};

export function TrekBookingCard() {
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    persons: "",
    amount: "",
    startDate: ""
  });
  const queryClient = useQueryClient();

  // 2. Define the mutation
  const { mutate, isPending } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success("Booking registered successfully.");
      queryClient.invalidateQueries({ queryKey: ['treks'] });
      setData({ fullName: "", email: "", phoneNo: "", persons: "", amount: "", startDate: "" });
    },
    onError: (error: Error) => {
      toast.error(error.message);
      if (error.message.includes("logged in")) {
        router.push('/login');
      }
    }
  });

  const handleBooking = () => {
    // Validate required fields
    if (!data.fullName || !data.email || !data.phoneNo || !data.persons || !data.amount || !data.startDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate phone number (basic check)
    if (data.phoneNo.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    // Validate persons and amount are positive numbers
    if (Number(data.persons) <= 0) {
      toast.error("Number of people must be greater than 0");
      return;
    }

    if (Number(data.amount) <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }
    mutate(data);
  };

  return (
    <aside className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Book Your Trek</h3>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showWarning ? 'max-h-24 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'}`}>
        <div className="bg-amber-50 border border-amber-200 rounded px-3 py-2 flex flex-col gap-1">
          <span className="text-amber-800 text-xs font-medium">
             ⚠️ Check for group discounts & availability first!
          </span>
          <a 
            href={`https://wa.me/${process.env.NEXT_PUBLIC_ADMIN_PHONE_NUMBER}?text=Hi,%20I%20want%20to%20confirm%20availability%20for%20a%20trek`}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-bold text-amber-700 underline hover:text-amber-900 w-fit"
          >
            Chat on WhatsApp &rarr;
          </a>
        </div>
      </div>

      <div 
        className="space-y-3"
        onFocus={() => setShowWarning(true)}
      >
        <Input 
          name="fullName"
          placeholder="Full Name"
          required
          value={data.fullName}
          onChange={(e)=> setData({...data, fullName: e.target.value})} 
        />
        <Input 
          name="email"
          type="email"
          placeholder="Email Address"
          required
          value={data.email}
          onChange={(e)=> setData({...data, email: e.target.value})}  
        />
        <Input 
          name="phoneNo"
          type="tel"
          placeholder="Phone Number" 
          required
          value={data.phoneNo}
          onChange={(e)=> setData({...data, phoneNo: e.target.value})} 
        />
        <Input 
          name="persons"
          type="number"
          placeholder="No. of People" 
          required
          value={data.persons}
          onChange={(e)=> setData({...data, persons: e.target.value})} 
        />
        <Input 
          name="amount"
          type="number"
          placeholder="Total amount paid" 
          required
          value={data.amount}
          onChange={(e)=> setData({...data, amount: e.target.value})} 
        />

      <div className="relative">
        <Input 
          type="date" 
          required
          value={data.startDate}
          min={new Date().toLocaleDateString('en-CA')}
          onChange={(e)=> setData({...data, startDate: e.target.value})} 
          onClick={(e) => (e.target as HTMLInputElement).showPicker()}
          className={`cursor-pointer relative z-10 ${
            !data.startDate ? "text-transparent" : "text-black"
          }`}
        />
        
        {!data.startDate && (
          <span className="absolute left-3 top-2.5 text-muted-foreground text-sm pointer-events-none z-0">
            Select Start Date
          </span>
        )}
      </div>

      </div>

      <Button 
          onClick={handleBooking} 
          disabled={isPending}
          className="mt-4 w-full bg-orange-600 hover:bg-orange-700"
        >
        {isPending ? "Processing..." : "Book Now"}
      </Button>
    </aside>
  )
}