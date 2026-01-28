"use client"

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast";

export function TrekBookingCard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const [data, setData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    persons: "",
    amount: "",
    startDate: ""
  });


  const handleBooking = async () => {
    setLoading(true);
    try {
        const user = auth.currentUser;
        if(!user){
          alert("You must be logged in to book.");
          router.push('/login');
          return 
        }
        
        const token = await user.getIdToken();
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/bookings`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type" : "application/json",
          },
          body: JSON.stringify({
            ...data,
            persons: Number(data.persons),
            amount: Number(data.amount),
            userId: user.uid
          })
        });
   
        const result = await res.json();
        
        if(res.ok){
          console.log("Booking registered Successfully");
          toast.success("Booking registered successfully.");
        } else {
          console.error("Booking failed: ", result);
          toast.error(result.message || "Something went wrong, please try again!!");
        }
    } catch(error: any){
      console.error("Network Error : ", error);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
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
            href="https://wa.me/916397658576?text=Hi,%20I%20want%20to%20confirm%20availability%20for%20a%20trek" 
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
          disabled={loading}
          className="mt-4 w-full bg-orange-600 hover:bg-orange-700"
        >
        {loading ? "Processing..." : "Book Now"}
      </Button>
    </aside>
  )
}