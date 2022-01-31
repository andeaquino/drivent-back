import Activity from "@/entities/Activity";
import Session from "@/entities/Session";
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

  if (ticket.presenceType.name === "Online")
    throw new PreconditionFailedActivities();

  const activitiesInfo = await Activity.getActivitiesInfo();

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
    throw new InvalidDataError("Activity", ["this activity has no vacancies"]);

  userActivities.forEach((item) => {
    if (isConflict(item, newActivityInfos))
      throw new ConflictError("You already have a activity in this time");
  });

  await Activity.postActivity(ticket, newActivityInfos);
}
