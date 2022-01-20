import { Request, Response } from "express";
import httpStatus from "http-status";

import * as enrollmentService from "@/services/client/enrollment";
import * as paymentService from "@/services/client/payment";
import CannotPayBeforeEnrollmentError from "@/errors/CannotPayBeforeEnrollmentError";

export async function getPlansInfos(req: Request, res: Response) {
  const enrollmentInfo = await enrollmentService.getEnrollmentWithAddress(req.user.id);
  const plans = await paymentService.getAllPlans();

  if(!enrollmentInfo) {
    throw new CannotPayBeforeEnrollmentError();
  }
  
  res.send(plans).status(httpStatus.OK);
}
