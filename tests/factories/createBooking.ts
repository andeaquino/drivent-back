import Booking from "../../src/entities/Booking";
import { createRoom } from "./createRoom";
import createTicket from "./createTicket";

const createBooking = async() => {
  const ticket = await createTicket();
  const room = await createRoom();
  const booking = await Booking.create({
    ticket: ticket.ticket,
    room,
  }).save();
  return { booking, ticket };
};

export default createBooking;
