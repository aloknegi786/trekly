import TrekTable from "@/components/global/admin/TrekTable"
import { bookings } from "@/constants/bookedData"

const ActiveTrekPage = () => {
  
  return (
    <div>
      <TrekTable activeBookings={bookings} />
    </div>
  );
  
};

export default ActiveTrekPage;