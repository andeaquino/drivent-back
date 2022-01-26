import Session from "@/entities/Session";

export async function getActivities(userId: number) {
  const ticket = await Session.checkTicket(userId);

  return ticket;
}
