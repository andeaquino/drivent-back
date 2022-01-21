import { Request, Response } from "express";
import httpStatus from "http-status";

import * as enrollmentService from "@/services/client/enrollment";
import * as paymentService from "@/services/client/payment";
import CannotPayBeforeEnrollmentError from "@/errors/CannotPayBeforeEnrollmentError";
import TicketData from "@/interfaces/ticket";
import NotFoundError from "@/errors/NotFoundError";

export async function getPlansInfos(req: Request, res: Response) {
  const enrollmentInfo = await enrollmentService.getEnrollmentWithAddress(req.user.id);
  const plans = await paymentService.getAllPlans();

  if(!enrollmentInfo) {
    throw new CannotPayBeforeEnrollmentError();
  }
  
  res.send(plans).status(httpStatus.OK);
}

export async function saveTicket(req: Request, res: Response) {
  const enrollmentInfo = await enrollmentService.getEnrollmentWithAddress(req.user.id);
  const ticketData = req.body as TicketData;
  ticketData.enrollmentId = enrollmentInfo.id;
  await paymentService.createNewTicket(ticketData);
  res.sendStatus(httpStatus.CREATED);
}

export async function getTicket(req: Request, res: Response) {
  const enrollmentInfo = await enrollmentService.getEnrollmentWithAddress(req.user.id);

  if(!enrollmentInfo) {
    throw new CannotPayBeforeEnrollmentError();
  }

  const ticket = await paymentService.getUserTicket(enrollmentInfo);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket).status(httpStatus.OK);
}
