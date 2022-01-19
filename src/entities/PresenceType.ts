import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Ticket from "./Ticket";

@Entity("presence_types")
export default class PresenceType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @OneToMany(() => Ticket, (ticket) => ticket.presenceType)
    tickets: Ticket[];
}
