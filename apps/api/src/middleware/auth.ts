import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { AppError } from "./error";
import { env } from "../config/env";
import { userRoleSchema } from "@devjob/shared";

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
  role: userRoleSchema,
  email: z.string().email()
});

export type AuthContext = z.infer<typeof tokenPayloadSchema>;

export type AuthedRequest = Request & { auth?: AuthContext };

export const requireAuth = (req: AuthedRequest, _res: Response, next: NextFunction): void => {
  const token = req.cookies.accessToken as string | undefined;

  if (!token) {
    next(new AppError("Unauthorized", 401));
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const parsed = tokenPayloadSchema.safeParse(decoded);

    if (!parsed.success) {
      next(new AppError("Invalid token", 401));
      return;
    }

    req.auth = parsed.data;
    next();
  } catch {
    next(new AppError("Invalid token", 401));
  }
};

export const requireRole = (role: z.infer<typeof userRoleSchema>) => {
  return (req: AuthedRequest, _res: Response, next: NextFunction): void => {
    if (!req.auth) {
      next(new AppError("Unauthorized", 401));
      return;
    }

    if (req.auth.role !== role) {
      next(new AppError("Forbidden", 403));
      return;
    }

    next();
  };
};
