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
  createdAt: string;
};

const users = new Map<string, UserRecord>();

const signToken = (user: UserRecord): string => {
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
  register: (email: string, fullName: string, role: UserRole): UserRecord => {
    const existing = users.get(email);
    if (existing) {
      return existing;
    }

    const user: UserRecord = {
      id: randomUUID(),
      email,
      fullName,
      role,
      createdAt: new Date().toISOString()
    };

    users.set(email, user);
    return user;
  },
  login: (email: string): UserRecord | null => {
    return users.get(email) ?? null;
  },
  issueCookie: (res: Response, user: UserRecord): string => {
    const token = signToken(user);
    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/"
    });
    return token;
  }
};
