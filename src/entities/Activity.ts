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

  @ManyToMany(() => Ticket, (ticket) => ticket.activities, { cascade: true })
  @JoinTable()
  tickets: Ticket[];

  ticketCount: number;

  openVacancies: number;

  static async getOpenVacancies(activityId: number) {
    const activity = await this.createQueryBuilder("activities")
      .loadRelationCountAndMap("activities.ticketCount", "activities.tickets")
      .where("activities.id = :id", { id: activityId })
      .getOne();

    const openVacancies = activity.vacancies - activity.ticketCount;
    return openVacancies;
  }

  static async getActivitiesInfo() {
    const eventDays = await Day.find();
    const result = [];

    for (let i = 0; i < eventDays.length; i++) {
      const elem = eventDays[i];
      const activities = await this.find({ where: { day: { id: elem.id } } });
      const stages = await Stage.find();
      for (let i = 0; i < activities.length; i++) {
        const openVacancies = await this.getOpenVacancies(activities[i].id);
        activities[i].openVacancies = openVacancies;
      }

      result.push({
        id: elem.id,
        name: elem.name,
        stages: stages,
        activities: activities,
      });
    }

    return result;
  }

  static async getActivitiesByTicket(ticketId: number) {
    const ticketInfos = await Ticket.findOne({
      relations: ["activities"],
      where: { id: ticketId },
    });
    return ticketInfos.activities;
  }

  static async postActivity(ticket: Ticket, newActivityInfos: Activity) {
    newActivityInfos.tickets = [ticket];
    this.save(newActivityInfos);
  }
}
