import HotelPlan from "@/entities/HotelPlan";
import PresenceType from "@/entities/PresenceType";
import Ticket from "@/entities/Ticket";
import TicketData from "@/interfaces/ticket";

export async function getAllPlans() {
  const hotelPlans =  await HotelPlan.getAll();
  const presenceTypes = await PresenceType.getAll();
  
  return {
    hotelPlans: [...hotelPlans],
    presenceTypes: [...presenceTypes]
  };
}

export async function createNewTicket(ticketData: TicketData) {
  await Ticket.createNew(ticketData);
}
