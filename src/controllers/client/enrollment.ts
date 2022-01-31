import { Request, Response } from "express";
import http from "@/enums/http.status";

import * as enrollmentService from "@/services/client/enrollment";
import EnrollmentData from "@/interfaces/enrollment";

export async function saveEnrollmentInfo(req: Request, res: Response) {
  const enrollmentData = req.body as EnrollmentData;
  enrollmentData.userId = req.user.id;

  await enrollmentService.createNewEnrollment(enrollmentData);

  res.sendStatus(http.CREATED);
}

export async function getEnrollmentInfos(req: Request, res: Response) {
  const enrollmentInfo = await enrollmentService.getEnrollmentWithAddress(
    req.user.id
  );

  if (!enrollmentInfo) {
    return res.sendStatus(http.NO_CONTENT);
  }

  res.send(enrollmentInfo).status(http.OK);
}
