import { Request, Response, NextFunction } from "express";

import * as service from "@/services/client/booking";

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const booking = await service.getBooking();
    res.send(booking);
  } catch (e) {
    if (e.name === "PaymentRequired") {
      return res.status(402).send(e.message);
    }
    if (e.name === "PreconditionFailed") {
      return res.status(412).send(e.message);
    }
    next(e);
  }
}
