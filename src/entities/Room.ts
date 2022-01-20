import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import Booking from "./Booking";
import Hotel from "./Hotels";
import RoomType from "./RoomType";

@Entity("rooms")
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Hotel, { eager: true })
  @JoinColumn({ name: "hotel_id" })
  hotel: Hotel;

  @ManyToOne(() => RoomType, { eager: true })
  @JoinColumn({ name: "type_id" })
  type: RoomType;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];
}
