import { Router } from "express";

import * as controller from "@/controllers/client/booking";

const router = Router();

router.get("/", controller.get);
router.post("/", controller.post);

export default router;
