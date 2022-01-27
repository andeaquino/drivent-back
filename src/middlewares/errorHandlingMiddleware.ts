import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import InvalidEmailError from "@/errors/InvalidEmail";
import CannotEnrollBeforeStartDateError from "@/errors/CannotEnrollBeforeStartDate";
import InvalidDataError from "@/errors/InvalidData";
import ConflictError from "@/errors/ConflictError";
import UnauthorizedError from "@/errors/Unauthorized";
import NotFoundError from "@/errors/NotFoundError";
import CannotPayBeforeEnrollmentError from "@/errors/CannotPayBeforeEnrollmentError";
import PreconditionFailed from "@/errors/PreconditionFailed";
import PaymentRequired from "@/errors/PaymentRequired";
import PreconditionFailedActivities from "@/errors/PreconditionFailedActivities";
import PaymentRequiredActivities from "@/errors/PaymentRequiredActivities";

/* eslint-disable-next-line */
export default function errorHandlingMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  /* eslint-disable-next-line */
  console.error(err);
  if (err instanceof InvalidEmailError) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err instanceof CannotEnrollBeforeStartDateError) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err instanceof InvalidDataError) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
      message: err.message,
      details: err.details,
    });
  }

  if (err instanceof ConflictError) {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }
  if (err instanceof PreconditionFailed) {
    return res.status(httpStatus.PRECONDITION_FAILED).send({
      message: err.message,
    });
  }
  if (err instanceof PreconditionFailedActivities) {
    return res.status(httpStatus.PRECONDITION_FAILED).send({
      message: err.message,
    });
  }
  if (err instanceof PaymentRequired) {
    return res.status(httpStatus.PAYMENT_REQUIRED).send({
      message: err.message,
    });
  }
  if (err instanceof PaymentRequiredActivities) {
    return res.status(httpStatus.PAYMENT_REQUIRED).send({
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err instanceof CannotPayBeforeEnrollmentError) {
    return res.status(httpStatus.FORBIDDEN).send({
      message: err.message,
    });
  }

  /* eslint-disable-next-line no-console */
  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: "Internal Server Error!",
  });
}
