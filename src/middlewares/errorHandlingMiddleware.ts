import { Request, Response, NextFunction } from "express";
import http from "../enums/http.status";

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
import CannotGetCertificateWithoutActivities from "@/errors/CannotGetCertificateWithoutActivities";
import PaymentRequiredCertificate from "@/errors/PaymentRequiredCertificate";

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
    return res.status(http.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err instanceof CannotEnrollBeforeStartDateError) {
    return res.status(http.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err instanceof InvalidDataError) {
    return res.status(http.UNPROCESSABLE_ENTITY).send({
      message: err.message,
      details: err.details,
    });
  }

  if (err instanceof ConflictError) {
    return res.status(http.CONFLICT).send({
      message: err.message,
    });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(http.UNAUTHORIZED).send({
      message: err.message,
    });
  }
  if (err instanceof PreconditionFailed) {
    return res.status(http.PRECONDITION_FAILED).send({
      message: err.message,
    });
  }
  if (err instanceof PreconditionFailedActivities) {
    return res.status(http.PRECONDITION_FAILED).send({
      message: err.message,
    });
  }
  if (err instanceof PaymentRequired) {
    return res.status(http.PAYMENT_REQUIRED).send({
      message: err.message,
    });
  }
  if (err instanceof PaymentRequiredActivities) {
    return res.status(http.PAYMENT_REQUIRED).send({
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(http.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err instanceof CannotPayBeforeEnrollmentError) {
    return res.status(http.FORBIDDEN).send({
      message: err.message,
    });
  }
  if (err instanceof CannotGetCertificateWithoutActivities) {
    return res.status(http.FORBIDDEN).send({
      message: err.message,
    });
  }
  if (err instanceof PaymentRequiredCertificate) {
    return res.status(http.FORBIDDEN).send({
      message: err.message,
    });
  }

  /* eslint-disable-next-line no-console */
  console.error(err);
  res.status(http.INTERNAL_SERVER_ERROR).send({
    message: "Internal Server Error!",
  });
}
