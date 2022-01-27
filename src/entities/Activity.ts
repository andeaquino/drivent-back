import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Day from "./Day";
import Stage from "./Stage";
import Ticket from "./Ticket";

@Entity("activities")
export default class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: "start_time" })
  startTime: string;

  @Column({ name: "end_time" })
  endTime: string;

  @Column()
  vacancies: number;

  @ManyToOne(() => Day, { eager: true })
  @JoinColumn({ name: "day_id" })
  day: Day;

  @ManyToOne(() => Stage, { eager: true })
  @JoinColumn({ name: "stage_id" })
  stage: Stage;

  @ManyToMany(() => Ticket, (ticket) => ticket.activities)
  @JoinTable()
  tickets: Ticket[];

  static async getActivitiesInfo() {
    const eventDays = await Day.find();
    const result = [];
    for (let i = 0; i < eventDays.length; i++) {
      const elem = eventDays[i];
      const activities = await this.find({ where: { day: { id: elem.id } } });
      result.push({ id: elem.id, name: elem.name, activities: activities });
    }

    return result;
  }
}
