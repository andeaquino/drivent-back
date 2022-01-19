import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
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

    @ManyToOne(() => Enrollment, { eager: true })
    @JoinColumn({ name: "enrollment_id" })
    enrollment: Enrollment;
}
