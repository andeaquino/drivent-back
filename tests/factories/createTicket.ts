import Ticket from "../../src/entities/Ticket";
import createEnrollment from "./createEnrollment";

const createTicket = async() => {
  const enrollment = await createEnrollment();
  const ticketData = {
    hotelPlan: 1,
    presenceType: 1,
    enrollmentId: enrollment.enrollment.id
  };
  await Ticket.createNew(ticketData);

  return { ticketData, enrollment };
};

export default createTicket;
