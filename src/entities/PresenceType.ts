import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Ticket from "./Ticket";

@Entity("presence_types", {
  orderBy: {
    price: "DESC",
  }
})
export default class PresenceType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @OneToMany(() => Ticket, (ticket) => ticket.presenceType)
  tickets: Ticket[];

  static async getAll() {
    return await this.find();
  }
}
