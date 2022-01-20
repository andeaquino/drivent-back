import { Request, Response, NextFunction } from "express";

import * as service from "@/services/client/booking";

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers["authorization"];
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);

    const booking = await service.getBooking(token);
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
