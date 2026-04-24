import { Router } from "express";
import { companiesListSchema, companySchema } from "@devjob/shared";
import { AppError } from "../../middleware/error";

const companies = [
  {
    slug: "aurora-labs",
    name: "Aurora Labs",
    about: "Product company building AI tooling for hiring teams with data-first workflows.",
    stack: ["TypeScript", "Next.js", "PostgreSQL"],
    rating: 4.8
  },
  {
    slug: "vector-soft",
    name: "Vector Soft",
    about: "Engineering studio focused on B2B SaaS for recruiting automation and analytics.",
    stack: ["Node.js", "Prisma", "React"],
    rating: 4.5
  }
];

export const companiesRouter = Router();

companiesRouter.get("/", (_req, res) => {
  res.json(companiesListSchema.parse({ items: companies, total: companies.length }));
});

companiesRouter.get("/:slug", (req, res, next) => {
  const company = companies.find((item) => item.slug === req.params.slug);

  if (!company) {
    next(new AppError("Company not found", 404));
    return;
  }

  res.json(companySchema.parse(company));
});
