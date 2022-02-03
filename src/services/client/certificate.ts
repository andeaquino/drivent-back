import Activity from "@/entities/Activity";
import Session from "@/entities/Session";
import Ticket from "@/entities/Ticket";
import CannotGetCertificateWithoutActivities from "@/errors/CannotGetCertificateWithoutActivities";
import PaymentRequiredCertificate from "@/errors/PaymentRequiredCertificate";

export async function getCertificateInfos(userId: number) {
  const ticket = await Session.checkTicket(userId);
  if (!ticket) throw new PaymentRequiredCertificate();
  const activities = await Activity.getActivitiesByTicket(ticket.id);

  if (activities.length === 0 && ticket.presenceType.id === 1) {
    throw new CannotGetCertificateWithoutActivities();
  }

  const infos = {
    name: ticket.enrollment.name,
    presenceType: ticket.presenceType.name,
    time: 8,
  };

  if (activities?.length > 0) {
    let time = 0;

    for (let i = 0; i < activities.length; i++) {
      const start = Number(
        activities[i].startTime[0] + activities[i].startTime[1]
      );
      const end = Number(activities[i].endTime[0] + activities[i].endTime[1]);
      time += end - start;
    }
    infos.time = time;
  }

  return infos;
}
