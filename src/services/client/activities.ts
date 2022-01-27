import Activity from "@/entities/Activity";
import Session from "@/entities/Session";
import PaymentRequiredActivities from "@/errors/PaymentRequiredActivities";
import PreconditionFailedActivities from "@/errors/PreconditionFailedActivities";

export async function getActivities(userId: number) {
  const ticket = await Session.checkTicket(userId);

  if (!ticket) throw new PaymentRequiredActivities();

  if (ticket.presenceType.name === "Online") throw new PreconditionFailedActivities();

  const activitiesInfo = await Activity.getActivitiesInfo();

  return activitiesInfo;
}
