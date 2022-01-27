import { Request, Response } from "express";

import * as service from "@/services/client/activities";

export async function get(req: Request, res: Response) {
  const userId = req.user.id;
  const activities = await service.getActivities(userId);

  res.send(activities);
}
