import React, { useState } from 'react';
import { Tag } from 'lucide-react'; // Optional: for a nice icon touch

const PriceSection = () => {
  const [isHovering, setHovering] = useState(false);

  // Data Source
  const offer = {
    title: "Valentine's Special Offer",
    description: "Book now and get 10% off on all treks!",
    price: "₹2250",
    originalPrice: "₹2500",
    startDate: "January 31, 2026",
    endDate: "February 28, 2026",
  };

  // Logic: Comparison using timestamps for precision
  const now = new Date();
  const isOfferActive = now >= new Date(offer.startDate) && now <= new Date(offer.endDate);

  if(!isOfferActive) {
    return (
      <>
      </>
    );
  }

  // Styles for active offer
  const activeStyles = "bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700";
  const defaultStyles = "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700";

  return (
    <div
      className={`inline-flex items-center gap-2 px-2 py-2 rounded-md text-white font-semibold cursor-pointer transition-all ${
        isHovering ? activeStyles : defaultStyles
      }`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Tag className="w-5 h-5" />
      <div className="flex flex-col leading-tight justify-center items-center text-center w-full h-full">
        <span className="text-[11px] opacity-80">
          {offer.title}
        </span>

        <span className="text-[13px]">
          <span className="line-through opacity-60 mr-2">
            {offer.originalPrice}
          </span>
          <span className="font-medium">
            {offer.price}
          </span>
        </span>
      </div>

    </div>
  );
};

export { PriceSection };