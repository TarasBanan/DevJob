import { Router } from "express";
import { authPayloadSchema } from "@devjob/shared";
import { AppError } from "../../middleware/error";
import { loginBodySchema } from "./auth.schema";
import { authService } from "./auth.service";

export const authRouter = Router();

authRouter.post("/register", (_req, res) => {
  res.status(200).json({ message: authService.registerPlaceholder() });
});

authRouter.post("/login", (req, res, next) => {
  const parsed = loginBodySchema.safeParse(req.body);

  if (!parsed.success) {
    next(new AppError(parsed.error.issues[0]?.message ?? "Invalid payload", 400));
    return;
  }

  const user = authService.login(parsed.data.email, parsed.data.password);

  if (!user) {
    next(new AppError("Invalid credentials", 401));
    return;
  }

  const accessToken = authService.issueCookie(res, user);
  const payload = authPayloadSchema.parse({ user, accessToken });
  res.json(payload);
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie("accessToken", { path: "/" });
  res.clearCookie("role", { path: "/" });
  res.status(204).send();
});
