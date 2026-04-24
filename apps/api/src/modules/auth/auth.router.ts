import { Router } from "express";
import { authPayloadSchema } from "@devjob/shared";
import { AppError } from "../../middleware/error";
import { loginBodySchema, registerBodySchema } from "./auth.schema";
import { authService } from "./auth.service";

export const authRouter = Router();

authRouter.post("/register", (req, res, next) => {
  const parsed = registerBodySchema.safeParse(req.body);

  if (!parsed.success) {
    next(new AppError(parsed.error.issues[0]?.message ?? "Invalid payload", 400));
    return;
  }

  const user = authService.register(parsed.data.email, parsed.data.fullName, parsed.data.role);
  const accessToken = authService.issueCookie(res, user);
  const payload = authPayloadSchema.parse({ user, accessToken });
  res.status(201).json(payload);
});

authRouter.post("/login", (req, res, next) => {
  const parsed = loginBodySchema.safeParse(req.body);

  if (!parsed.success) {
    next(new AppError(parsed.error.issues[0]?.message ?? "Invalid payload", 400));
    return;
  }

  const user = authService.login(parsed.data.email);

  if (!user) {
    next(new AppError("User not found. Register first.", 404));
    return;
  }

  const accessToken = authService.issueCookie(res, user);
  const payload = authPayloadSchema.parse({ user, accessToken });
  res.json(payload);
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie("accessToken", { path: "/" });
  res.status(204).send();
});
