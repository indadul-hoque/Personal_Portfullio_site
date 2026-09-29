import type { Request, Response } from "express";

import { prisma } from "../config/dbConnection.js";

export const getEducation = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const educations = await prisma.education.findMany();
    if (!educations) {
      res
        .status(401)
        .json({ message: "Educations are not found!", success: false });
    }

    res.status(200).json({
      message: "Education fetched successfully.",
      data: educations,
      success: true,
    });
  } catch (error) {
    console.log("Internal server error");
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const createEducation = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { institutionName, degreeName, fieldOfStudy, startDate, endDate } =
      req.body;
    if (
      !institutionName ||
      !degreeName ||
      !fieldOfStudy ||
      !startDate ||
      !endDate
    ) {
      res
        .status(400)
        .json({ message: "All fields are required", success: false });
      return;
    }

    const education = await prisma.education.create({
      data: {
        institutionName,
        degreeName,
        fieldOfStudy,
        startDate,
        endDate,
      },
    });

    res.status(200).json({
      message: "Education created successfully.",
      data: education,
      success: true,
    });
  } catch (error) {
    console.log("Internal server error.");
    res.status(500).json({ message: "Internal server error.", success: false });
  }
};
