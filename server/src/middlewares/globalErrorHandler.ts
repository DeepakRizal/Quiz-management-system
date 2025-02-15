import { NextFunction, Request, Response } from "express";

interface AppErrorType extends Error {
  statusCode: number;
  status: string;
}

const globalErrorHandler = (
  err: AppErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export default globalErrorHandler;
