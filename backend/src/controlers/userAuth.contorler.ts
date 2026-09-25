import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../config/dbConnection.js";
import generateToken from "../utils/generateToken.js";

const SALT_ROUNDS = 12;

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: "Email and Password are required." });
      return;
    }

    let user = await prisma.user.findUnique({ where: { email } });
    let isNewUser = false;

    // If user doesn't exist, only allow creating the first initial admin account
    if (!user) {
      const userCount = await prisma.user.count();

      if (userCount === 0) {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            username: email.split("@")[0], // default username from email
            // role defaults to "ADMIN" per schema
          },
        });
        isNewUser = true;
      } else {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }
    } else {
      // Existing user → verify password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }
    }

    // Generate token (now user is guaranteed to exist)
    const token: string = generateToken(user.id, user.role);

    res.cookie("adminToken", token, {
      httpOnly: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV !== "development",
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    });

    res.status(isNewUser ? 201 : 200).json({
      success: true,
      message: isNewUser
        ? "Account created and logged in successfully"
        : "User logged in successfully",
      isNewUser,
    });
  } catch (error) {
    console.log("Something went wrong while logging in", error);
    res.status(500).json({ message: "Something went wrong while logging in" });
  }
};
