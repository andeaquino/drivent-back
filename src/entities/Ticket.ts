import ConflictError from "@/errors/ConflictError";
import TicketData from "@/interfaces/ticket";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,
} from "typeorm";
import Activity from "./Activity";
import Enrollment from "./Enrollment";
import HotelPlan from "./HotelPlan";
import PresenceType from "./PresenceType";

@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => HotelPlan, { eager: true })
  @JoinColumn({ name: "hotel_plan_id" })
  hotelPlan: HotelPlan;

  @ManyToOne(() => PresenceType, { eager: true })
  @JoinColumn({ name: "presence_type_id" })
  presenceType: PresenceType;

  @OneToOne(() => Enrollment, { eager: true })
  @JoinColumn({ name: "enrollment_id" })
  enrollment: Enrollment;

  @ManyToMany(() => Activity, (activity) => activity.tickets, { cascade: true })
  activities: Activity[];

  static async createNew(data: TicketData) {
    const enrollment = await Enrollment.findOne({
      where: { id: data.enrollmentId },
    });
    let ticket = await Ticket.findOne({ where: { enrollment: enrollment } });

    if (ticket) {
      throw new ConflictError("Usuário já comprou um ingresso");
    }

    ticket = Ticket.create();
    ticket.enrollment = enrollment;
    ticket.hotelPlan = await HotelPlan.findOne({
      where: { id: data.hotelPlan },
    });
    ticket.presenceType = await PresenceType.findOne({
      where: { id: data.presenceType },
    });
    await ticket.save();
  }
}
