import { randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";
import type { Response } from "express";
import { env } from "../../config/env";
import type { UserRole } from "@devjob/shared";

type UserRecord = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  password: string;
  createdAt: string;
};

const demoUsers: UserRecord[] = [
  {
    id: randomUUID(),
    email: "seeker@devjob.com",
    fullName: "Demo Seeker",
    role: "SEEKER",
    password: "123",
    createdAt: new Date().toISOString()
  },
  {
    id: randomUUID(),
    email: "employer@devjob.com",
    fullName: "Demo Employer",
    role: "EMPLOYER",
    password: "123",
    createdAt: new Date().toISOString()
  }
];

const users = new Map<string, UserRecord>(demoUsers.map((user) => [user.email, user]));

const sanitizeUser = (user: UserRecord): Omit<UserRecord, "password"> => {
  const { password: _password, ...safeUser } = user;
  return safeUser;
};

const signToken = (user: Omit<UserRecord, "password">): string => {
  return jwt.sign(
    {
      sub: user.id,
      role: user.role,
      email: user.email
    },
    env.JWT_SECRET,
    { expiresIn: "2h" }
  );
};

export const authService = {
  registerPlaceholder: (): string => {
    return "Registration is disabled in demo mode. Use seeker@devjob.com or employer@devjob.com with password 123.";
  },
  login: (email: string, password: string): Omit<UserRecord, "password"> | null => {
    const user = users.get(email);

    if (!user || user.password !== password) {
      return null;
    }

    return sanitizeUser(user);
  },
  issueCookie: (res: Response, user: Omit<UserRecord, "password">): string => {
    const token = signToken(user);
    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/"
    });
    res.cookie("role", user.role, {
      httpOnly: false,
      sameSite: "lax",
      secure: false,
      path: "/"
    });
    return token;
  }
};
