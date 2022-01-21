import { Router } from "express";

import * as controller from "@/controllers/client/payment";
import ticketSchema from "@/schemas/ticketSchema";
import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

const router = Router();

router.get("/plans", controller.getPlansInfos);
router.get("/ticket", controller.getTicket);
router.post("/ticket", schemaValidatingMiddleware(ticketSchema), controller.saveTicket);

export default router;
