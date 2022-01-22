import PaymentRequired from "@/errors/PaymentRequired";
import PreconditionFailed from "@/errors/PreconditionFailed";
import { getRepository } from "typeorm";
import Session from "@/entities/Session";
import Booking from "@/entities/Booking";
import Hotels from "@/entities/Hotels";
import BookingIds from "@/interfaces/bookingIds";

export async function getBooking(userId: number) {
  const ticket = await Session.checkTicket(userId);

  if (!ticket) throw new PaymentRequired();

  if (ticket.presenceType.name === "Online") throw new PreconditionFailed();

  const bookingInfo = await getRepository(Booking).findOne({
    where: { ticket: ticket.id },
  });

  if (bookingInfo) return bookingInfo;

  const hotelsInfo = await Hotels.getHotelInfo();

  return hotelsInfo;
}

export async function postBooking({ userId, roomId }: BookingIds) {
  const ticket = await Session.checkTicket(userId);
  if (!ticket || !roomId) throw new PreconditionFailed();
  await Booking.createOrUpdateBooking(ticket, roomId);
}
