import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Room from "./Room";
import Ticket from "./Ticket";

@Entity("bookings")
export default class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Ticket)
  @JoinColumn({ name: "ticket_id" })
  ticket: Ticket;

  @ManyToOne(() => Room, (room: Room) => room.bookings)
  @JoinColumn({ name: "room_id" })
  room: Room;

  static async createOrUpdateBooking(ticket: Ticket, room: Room) {
    if (await this.findOne({ ticket: ticket })) {
      console.log(ticket);
      await this.delete({ ticket: ticket });
    }
    const session = this.create({ ticket, room });
    await session.save();
    return session;
  }

  static async getRoomQuantity(id: number) {
    const result = await this.find({
      where: { room: id },
    });
    return result.length;
  }

  static async getRoomInfosByBookingId(id: number) {
    const result = await this.findOne({
      relations: ["room"],
      where: { id: id },
    });
    const roomQuantity = await this.getRoomQuantity(result.room.id);
    return {
      roomId: result.room.id,
      roomName: result.room.name,
      roomType: result.room.type.name,
      roomQuantity,
      hotelId: result.room.hotel.id,
      hotelName: result.room.hotel.name,
      hotelImageUrl: result.room.hotel.img,
    };
  }
}
