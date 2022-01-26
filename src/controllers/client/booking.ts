import { Request, Response, NextFunction } from "express";

import * as service from "@/services/client/booking";

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const booking = await service.getBooking(userId);

    res.send(booking);
  } catch (e) {
    if (e.name === "PaymentRequired") {
      return res.status(402).send(e.message);
    }
    if (e.name === "PreconditionFailed") {
      return res.status(412).send(e.message);
    } else res.send("Não foi possível conectar ao servidor!");
    next(e);
  }
}

export async function post(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, roomId } = req.body;

    await service.postBooking({ userId, roomId });

    res.sendStatus(200);
  } catch (e) {
    if (e.name === "PaymentRequired") {
      return res.status(402).send(e.message);
    }
    if (e.name === "PreconditionFailed") {
      return res.status(412).send(e.message);
    } else res.send("Não foi possível conectar ao servidor!");
    next(e);
  }
}
