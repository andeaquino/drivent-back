import { Router } from "express";

import * as controller from "@/controllers/client/payment";

const router = Router();

router.get("/plans", controller.getPlansInfos);

export default router;
