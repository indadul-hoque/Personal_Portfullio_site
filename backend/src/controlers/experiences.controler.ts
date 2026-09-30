import type { Request, Response } from "express";
import { prisma } from "../config/dbConnection.js";

export const getExperience = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const experiences = await prisma.experience.findMany();
    if (!experiences) {
      res.status(401).json({
        message: "Experiences are not found.",
        success: false,
      });
    }

    res.status(200).json({
      message: "Experiences fetched successfully.",
      data: experiences,
      success: true,
    });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const createExperience = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { companyName, jobTitle, jobDescription, startDate, endDate } =
      req.body;

    if (
      !companyName ||
      !jobTitle ||
      !jobDescription ||
      !startDate ||
      !endDate
    ) {
      res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const experience = await prisma.experience.create({
      data: {
        companyName,
        jobTitle,
        jobDescription,
        startDate,
        endDate,
      },
    });

    res.status(200).json({
      message: "Experience created successfully.",
      data: experience,
      success: true,
    });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const updateExperience = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { companyName, jobTitle, jobDescription, startDate, endDate } =
      req.body;

    if (!id || typeof id !== "string") {
      res
        .status(400)
        .json({ message: "Experience ID is required", success: false });
      return;
    }

    const experienceExists = await prisma.experience.findUnique({
      where: { id },
    });

    if (!experienceExists) {
      res.status(404).json({ message: "Experience not found", success: false });
      return;
    }

    const updateData: any = {};
    if (companyName) updateData.companyName = companyName;
    if (jobTitle) updateData.jobTitle = jobTitle;
    if (jobDescription) updateData.jobDescription = jobDescription;
    if (startDate) updateData.startDate = startDate;
    if (endDate) updateData.endDate = endDate;

    const updatedExperience = await prisma.experience.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json({
      message: "Experience updated successfully.",
      data: updatedExperience,
      success: true,
    });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
