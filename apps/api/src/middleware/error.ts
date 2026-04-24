import type { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }

  res.status(500).json({ message: "Internal server error" });
};
