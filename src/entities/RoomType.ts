import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Room from "./Room";

@Entity("room_types")
export default class RoomType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    vacancies: number;

    @OneToMany(() => Room, (room) => room.type)
    rooms: Room[];
}
