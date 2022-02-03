import { Router } from "express";

import * as controller from "@/controllers/client/activities";

const router = Router();

router.get("/", controller.get);
router.post("/:id", controller.post);
router.post("/cancel/:id", controller.cancel);

export default router;
