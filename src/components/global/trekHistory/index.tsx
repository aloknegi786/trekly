"use client";

import { MapPin, Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";

type TrekHistoryItem = {
  id: string;
  trekName: string;
  location: string;
  startDate: string;
  duration: string;
  status: "Completed" | "Cancelled" | "Current" | "Upcoming" | "Ongoing";
  bookingStatus: string;
};

type TrekHistoryProps = {
  treks: TrekHistoryItem[];
};

// Helper for Trek Status (Time-based)
const getStatusStyles = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Upcoming":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "Current":
    case "Ongoing":
      return "bg-purple-100 text-purple-700 border-purple-200 animate-pulse";
    case "Cancelled":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getBookingStatusStyles = (status: string) => {
  const isConfirmed = status.toLowerCase().includes("confirmed");
  if (isConfirmed) return "text-green-600 bg-green-50 border-green-200";
  return "text-amber-600 bg-amber-50 border-amber-200";
};

const TrekHistory = ({ treks }: TrekHistoryProps) => {
  return (
    <section className="max-w-5xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-2xl font-bold text-gray-900">Your Trek History</h2>
          <p className="text-sm text-gray-500 mt-1">View past and upcoming adventures</p>
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-6">
          {treks.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No treks found</h3>
              <p className="text-gray-500 mt-1">You haven't booked any treks yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {treks.map((trek) => (
                <div
                  key={trek.id}
                  className="group relative flex flex-col md:flex-row md:items-center justify-between bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-orange-200 transition-all duration-200"
                >
                  
                  {/* Left: Main Info */}
                  <div className="flex-1 min-w-0 mb-4 md:mb-0">
                    <div className="flex items-center justify-between md:justify-start gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {trek.trekName}
                      </h3>
                      {/* Mobile Only Status Badge */}
                      <span className={`md:hidden px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getStatusStyles(trek.status)}`}>
                        {trek.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        <span>{trek.location}</span>
                      </div>
                      <div className="hidden md:block w-1 h-1 rounded-full bg-gray-300" />
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span>{trek.startDate}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span>{trek.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Statuses */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-3 md:gap-2 border-t md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
                    
                    {/* Desktop Trek Status Badge */}
                    <span className={`hidden md:inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusStyles(trek.status)}`}>
                      {trek.status}
                    </span>

                    {/* Booking Status Badge */}
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${getBookingStatusStyles(trek.bookingStatus)}`}>
                      {trek.bookingStatus.toLowerCase().includes("confirmed") ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5" />
                      )}
                      {trek.bookingStatus}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrekHistory;