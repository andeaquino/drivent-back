import { Request, Response } from "express";
import http from "../../enums/http.status";

import * as service from "@/services/client/user";

export async function signUp(req: Request, res: Response) {
  const user = await service.createNewUser(req.body.email, req.body.password);
  res.status(http.CREATED).send(user);
}
