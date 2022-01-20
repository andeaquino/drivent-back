import PaymentRequired from "@/errors/PaymentRequired";
import PreconditionFailed from "@/errors/PreconditionFailed";
import { getRepository } from "typeorm";
import Session from "@/entities/Session";
import Booking from "@/entities/Booking";
import Hotels from "@/entities/Hotels";

export async function getBooking(userId: number) {
  const ticket = await Session.checkTicket(userId);

  if (!ticket) throw new PaymentRequired();
  if (ticket.presenceType.name === "Online") throw new PreconditionFailed();

  const bookingInfo = await getRepository(Booking).findOne({ where: { ticket: ticket.id } });

  if (bookingInfo) return bookingInfo;

  const hotelsInfo = await Hotels.getHotelInfo();

  return hotelsInfo;
}
