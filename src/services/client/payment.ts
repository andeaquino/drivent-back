import Enrollment from "@/entities/Enrollment";
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

export async function getUserTicket(enrollment: Enrollment) {
  const ticket = await Ticket.findOne({ where: { enrollment: enrollment.id } });

  return ticket;
}
