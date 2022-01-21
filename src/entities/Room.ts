import RoomsInfo from "@/interfaces/roomsInfo";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
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

  static async getRooms(): Promise<RoomsInfo[]> {
    const rooms = await this.find();
    const result: RoomsInfo[] = [];

    for (let i = 0; i < rooms.length; i++) {
      const elem = rooms[i];
      const bookings = await Booking.find({ where: { room: elem.id } });
      result.push({
        id: elem.id,
        name: elem.name,
        hotel: elem.hotel.id,
        type: elem.type.name,
        vacancies: elem.type.vacancies,
        occupied: bookings.length,
      });
    }
    return result;
  }
}
