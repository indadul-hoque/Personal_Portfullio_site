import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/dbConnection.js";

export interface AuthenticatedUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: AuthenticatedUser;
}

interface JwtPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

export const verifyAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token = req.cookies?.adminToken;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Authentication required. No session token provided.",
      });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET environment variable is not defined.");
      res.status(500).json({
        success: false,
        message: "Server authentication configuration error.",
      });
      return;
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!decoded || !decoded.id) {
      res.status(401).json({
        success: false,
        message: "Invalid token payload.",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User account not found or session revoked.",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error: any) {
    if (error?.name === "TokenExpiredError") {
      res.status(401).json({
        success: false,
        message: "Session expired. Please log in again.",
      });
      return;
    }
    res.status(401).json({
      success: false,
      message: "Authentication verification failed.",
    });
  }
};
