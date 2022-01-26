import { Router } from "express";

import * as controller from "@/controllers/client/activities";

const router = Router();

router.get("/", controller.get);

export default router;
