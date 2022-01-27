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

  if (ticket.presenceType.name === "Online" || ticket.hotelPlan.name === "Sem Hotel")
    throw new PreconditionFailed();

  const booking = await getRepository(Booking).findOne({
    where: { ticket: ticket.id },
  });
  const hotelsInfos = await Hotels.getHotelInfo();
  if (booking) {
    const bookingInfos = await Booking.getRoomInfosByBookingId(booking.id);
    return {
      bookingInfos,
      hotelsInfos,
    };
  }
  return {
    bookingInfos: null,
    hotelsInfos,
  };
}

export async function postBooking({ userId, roomId }: BookingIds) {
  const ticket = await Session.checkTicket(userId);
  if (!ticket || !roomId) throw new PaymentRequired();
  
  await Booking.createOrUpdateBooking(ticket, roomId);
}
