export type TrekBooking = {
  id: string
  customerName: string
  trekName: string
  startDate: string
  endDate: string
  status: "Active" | "cancelled" | "completed"
  peopleCount: number
}

export type TrekHistoryItem = {
  id: string;
  trekName: string;
  location: string;
  startDate: string;
  duration: string;
  status: "Completed" | "Cancelled" | "Current" | "Upcoming";
  bookingStatus: string;
  peopleCount?: number
};
