import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import paymentRouter from "@/routers/client/payment";
import bookingRouter from "@/routers/client/booking";
import activitiesRouter from "@/routers/client/activities";
import certificateRouter from "@/routers/client/certificate";
import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/payment", tokenValidationMiddleware, paymentRouter);
router.use("/booking", tokenValidationMiddleware, bookingRouter);
router.use("/activities", tokenValidationMiddleware, activitiesRouter);
router.use("/certificate", tokenValidationMiddleware, certificateRouter);

export default router;
