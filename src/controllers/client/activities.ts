import { Request, Response } from "express";
import PaymentRequired from "@/errors/PaymentRequired";
import PreconditionFailed from "@/errors/PreconditionFailed";

import * as service from "@/services/client/activities";

export async function get(req: Request, res: Response) {
  const userId = req.user.id;
  const activities = await service.getActivities(userId);

  if (!activities) throw new PaymentRequired();

  if (activities.presenceType.name === "Online") throw new PreconditionFailed();

  res.send(activities);
}
