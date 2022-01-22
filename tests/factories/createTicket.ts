import HotelPlan from "../../src/entities/HotelPlan";
import PresenceType from "../../src/entities/PresenceType";
import Ticket from "../../src/entities/Ticket";
import createEnrollment from "./createEnrollment";

const createTicket = async() => {
  const createdEnrollment = await createEnrollment();
  const hotelPlan = await HotelPlan.create({
    name: "com hotel",
    price: 100,
  }).save();
  const presenceType = await PresenceType.create({
    name: "online",
    price: 200,
  }).save();
  const ticket = await Ticket.create({
    hotelPlan: hotelPlan,
    presenceType: presenceType,
    enrollment: createdEnrollment.enrollment,
  }).save();

  return {
    enrollment: createdEnrollment,
    ticket,
  };
};

export default createTicket;
