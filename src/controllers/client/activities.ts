import { Request, Response } from "express";
import http from "@/enums/http.status";
import * as service from "@/services/client/activities";

export async function get(req: Request, res: Response) {
  const userId = req.user.id;
  const activities = await service.getActivities(userId);

  res.send(activities);
}

export async function post(req: Request, res: Response) {
  const userId: number = req.user.id;
  const activityId = Number(req.params.id);
  await service.postUserActivity(userId, activityId);
  res.sendStatus(http.CREATED);
}
