import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import Ticket from "./Ticket";

@Entity("hotel_plans", {
  orderBy: {
    price: "ASC",
  }
})
export default class HotelPlan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @OneToMany(() => Ticket, (ticket) => ticket.hotelPlan)
  tickets: Ticket[];

  static async getAll() {
    return await this.find();
  }
}
