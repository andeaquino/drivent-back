import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import Room from "./Room";

@Entity("hotels")
export default class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  img: string;

  @OneToMany(() => Room, (room) => room.hotel)
  rooms: Room[];

  static async getHotelInfo() {
    const hotelInfo = await this.find();
    const rooms = await Room.find();

    const hotels = hotelInfo.map((info) => {
      info.rooms = rooms.filter((room) => room.hotel.id === info.id);
      return info;
    });

    return hotels;
  }
}
