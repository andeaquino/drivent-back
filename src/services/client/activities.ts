import Activity from "@/entities/Activity";
import Session from "@/entities/Session";
import Ticket from "@/entities/Ticket";
import ConflictError from "@/errors/ConflictError";
import InvalidDataError from "@/errors/InvalidData";
import NotFoundError from "@/errors/NotFoundError";
import PaymentRequiredActivities from "@/errors/PaymentRequiredActivities";
import PreconditionFailedActivities from "@/errors/PreconditionFailedActivities";

function isConflict(item1: Activity, item2: Activity): boolean {
  if (
    item1.id === item2.id ||
    (item1.endTime > item2.startTime &&
      item1.startTime < item2.endTime &&
      item1.day.id === item2.day.id)
  )
    return true;
  return false;
}

export async function getActivities(userId: number) {
  const ticket = await Session.checkTicket(userId);

  if (!ticket) throw new PaymentRequiredActivities();

  if (ticket.presenceType.name === "Online") throw new PreconditionFailedActivities();

  const activitiesInfo = await Activity.getActivitiesInfo(ticket.id);

  return activitiesInfo;
}

export async function postUserActivity(userId: number, activityId: number) {
  const ticket = await Session.checkTicket(userId);

  if (!ticket) throw new PaymentRequiredActivities();
  const userActivities = await Activity.getActivitiesByTicket(ticket.id);
  const newActivityInfos = await Activity.findOne({
    where: { id: activityId },
  });
  if (!newActivityInfos) throw new NotFoundError();

  const openVacancies = await Activity.getOpenVacancies(newActivityInfos.id);

  if (openVacancies === 0)
    throw new InvalidDataError("Essa atividade não possui vagas disponíveis.", [
      "this activity has no vacancies",
    ]);

  userActivities.forEach((item) => {
    if (isConflict(item, newActivityInfos))
      throw new ConflictError("Você já possui uma atividade nesse horário");
  });

  await Activity.postActivity(ticket, newActivityInfos);
}

export async function cancel(userId: number, activityId: number) {
  const ticket = await Session.checkTicket(userId);
  if (!ticket) throw new PaymentRequiredActivities();

  const activityInfos = await Activity.findOne({
    where: { id: activityId },
  });
  if (!activityInfos) throw new NotFoundError();

  await Activity.deleteActivity(ticket.id, activityId);
}
