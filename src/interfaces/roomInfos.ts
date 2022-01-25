import Booking from "@/entities/Booking";
import TicketInfos from "./ticketInfos";

interface RoomInfos {
  booking: Booking;
  ticket: TicketInfos;
}
export default RoomInfos;
