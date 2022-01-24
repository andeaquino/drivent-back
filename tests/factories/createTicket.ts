import Ticket from "../../src/entities/Ticket";

const createTicket = async(enrollmentId: number) => {
  const ticketData = {
    hotelPlan: 1,
    presenceType: 1,
    enrollmentId
  };
  await Ticket.createNew(ticketData);
};

export default createTicket;
