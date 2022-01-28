import { Request, Response } from "express";

import * as service from "@/services/client/activities";

export async function get(req: Request, res: Response) {
  const userId = req.user.id;
  const activities = await service.getActivities(userId);

  res.send(activities);
}

export async function post(req: Request, res: Response) {
  const userId: number = req.user.id;
  const activityId: number = req.body.activityId;

  await service.postUserActivity(userId, activityId);
}
