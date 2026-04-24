import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { errorHandler } from "./middleware/error";
import { authRouter } from "./modules/auth/auth.router";
import { jobsRouter } from "./modules/jobs/jobs.router";
import { companiesRouter } from "./modules/companies/companies.router";
import { applicationsRouter } from "./modules/applications/applications.router";

export const app = express();

app.use(
  cors({
    origin: env.WEB_ORIGIN,
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/companies", companiesRouter);
app.use("/api/applications", applicationsRouter);

app.use(errorHandler);

if (env.NODE_ENV !== "test") {
  app.listen(env.PORT, () => {
    console.log(`API started on port ${env.PORT}`);
  });
}
