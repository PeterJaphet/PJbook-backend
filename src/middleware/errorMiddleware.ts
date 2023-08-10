import ah from "express-async-handler";
import { NextFunction, Request, Response } from 'express'
const notFound = (req:Request, res:Response, next:NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404)
  
//   .json({
//     message: "Resource not found",
//   });
  next(error);
};

const errorHandler =(err:any, req:Request, res:Response, next:NextFunction) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not Found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV !== "production" ? err.stack : "",
  });
};

export { notFound, errorHandler };
