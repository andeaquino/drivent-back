import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import Room from "./Room";
import Ticket from "./Ticket";

@Entity("bookings")
export default class Booking extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Ticket)
    @JoinColumn({ name: "ticket_id" })
    ticket: Ticket;

    @OneToOne(() => Room)
    @JoinColumn({ name: "room_id" })
    room: Room;
}
