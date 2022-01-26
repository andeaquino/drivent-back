import HotelInfo from "@/interfaces/hotelInfo";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
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

  static async getHotelInfo(): Promise<HotelInfo[]> {
    const hotelInfo = await this.find();
    const rooms = await Room.getRooms();

    const result: HotelInfo[] = [];

    for (let i = 0; i < hotelInfo.length; i++) {
      const elem = hotelInfo[i];
      let totalVacancy = 0;
      let availableTypes: string[] = [];
      const roomsById = rooms.filter((info) => info.hotel === elem.id);
      roomsById.map((info) => {
        totalVacancy += info.vacancies - info.occupied;
        if (!availableTypes.includes(info.name)) {
          availableTypes[info.typeId - 1] = info.type;
        }
      });
      availableTypes = availableTypes.filter(item => !!item);
      result.push({
        id: elem.id,
        name: elem.name,
        img: elem.img,
        totalVacancy,
        availableTypes,
        rooms: roomsById,
      });
    }
    return result;
  }
}
