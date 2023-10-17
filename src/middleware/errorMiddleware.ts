import ah from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import logger from "../utils/logger";

const ErrorType = {
  VALIDATION_ERROR: "Validation Error",
  INTERNAL_ERROR: "Internal Error",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Not Found",
  UNAUTHORIZED: "Unauthorized",
} as const;

class HsapError extends Error {
  status = 500;
  message: string;
  validationError?: any;

  constructor(message: string, status: number, validationError?: any) {
    super(message);
    this.message = message;
    this.status = status;
    this.validationError = validationError;
  }
}

class ValidationError extends HsapError {
  status = 400;
  message: string;
  validationError: any;

  constructor(error: any) {
    super(
      typeof error === "string" ? error : ErrorType.VALIDATION_ERROR,
      400,
      typeof error !== "string" ? error : undefined
    );
    this.message =
      typeof error === "string" ? error : ErrorType.VALIDATION_ERROR;
    this.validationError = typeof error !== "string" ? error : undefined;
    this.name = this.constructor.name;
  }
}

class InternalError extends HsapError {
  status = 500;
  message: string;

  constructor(message: string = ErrorType.INTERNAL_ERROR) {
    super(message, 500);
    this.message = message;
    this.name = this.constructor.name;
  }
}

class ForbiddenError extends HsapError {
  status = 403;
  message: string;

  constructor(message: string = ErrorType.FORBIDDEN) {
    super(message, 403);
    this.message = message;
    this.name = this.constructor.name;
  }
}

class NotFoundError extends HsapError {
  status = 404;
  message: string;

  constructor(message: string = ErrorType.NOT_FOUND) {
    super(message, 404);
    this.message = message;
    this.name = this.constructor.name;
  }
}

class UnauthorizedError extends HsapError {
  status = 401;
  message: string;

  constructor(message: string = ErrorType.UNAUTHORIZED) {
    super(message, 401);
    this.message = message;
    this.name = this.constructor.name;
  }
}

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);

  //   .json({
  //     message: "Resource not found",
  //   });
  next(error);
};

const   errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err;

  if ((error as any)?.type === 'entity.parse.failed') {
    error = new HsapError('entity.parse.failed', 413)
  }

  if (error instanceof ZodError) {
    error = new ValidationError(error.issues)
  }

  if (!(error instanceof HsapError)) {
    //Don't send error to user
    error = new InternalError(
      process.env.NODE_ENV !== 'production' ? error : undefined,
    )
  }

  

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not Found";
  }
  res.status(statusCode).json({
    message,
    //stack: process.env.NODE_ENV !== "production" ? err.stack : "",
  });
};

export {
  notFound,
  errorHandler,
  HsapError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  InternalError,
  ForbiddenError,
};
