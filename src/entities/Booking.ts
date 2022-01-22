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
    const session = this.create({ ticket, room });
    await session.save();
    return session;
  }
}
