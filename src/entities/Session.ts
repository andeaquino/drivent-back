import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import Enrollment from "@/entities/Enrollment";
import Ticket from "@/entities/Ticket";
import { getRepository } from "typeorm";

@Entity("sessions")
export default class Session extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  token: string;

  static async createNew(userId: number, token: string) {
    const session = this.create({ userId, token });
    await session.save();
    return session;
  }

  static async checkTicket(userId: number) {
    const enrollmentId = await getRepository(Enrollment).findOne({
      where: { userId: userId },
    });

    return await getRepository(Ticket).findOne({
      where: { enrollment: enrollmentId.id },
    });
  }
}
