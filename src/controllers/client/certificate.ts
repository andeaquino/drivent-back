import { Request, Response } from "express";
import * as certificateService from "@/services/client/certificate";

export async function get(req: Request, res: Response) {
  const userId = req.user.id;
  const certificateInfos = await certificateService.getCertificateInfos(userId);
  res.send(certificateInfos);
}
