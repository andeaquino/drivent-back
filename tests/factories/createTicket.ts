import Ticket from "../../src/entities/Ticket";
import createEnrollment from "./createEnrollment";
import createTypes from "./createTypes";

const createTicket = async() => {
  const createdEnrollment = await createEnrollment();
  const types = await createTypes();
  
  const ticket = await Ticket.create({
    hotelPlan: types.hotelPlan,
    presenceType: types.presenceType,
    enrollment: createdEnrollment.enrollment,
  }).save();

  return {
    ...createdEnrollment,
    ticket,
  };
};

export default createTicket;
