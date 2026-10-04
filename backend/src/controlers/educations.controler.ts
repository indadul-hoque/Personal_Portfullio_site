import type { Request, Response } from "express";
import { prisma } from "../config/dbConnection.js";

interface educationParams {
  id: string;
}

// Get All Education
export const getEducation = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const educations = await prisma.education.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      message: "Education fetched successfully.",
      data: educations,
      success: true,
    });
  } catch (error) {
    console.log("Error fetching education:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Add Education
export const createEducation = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      institutionName,
      degreeName,
      fieldOfStudy,
      description,
      startDate,
      endDate,
    } = req.body;

    if (!institutionName || !degreeName || !startDate) {
      res.status(400).json({
        message: "Institution name, degree name, and start date are required",
        success: false,
      });
      return;
    }

    const education = await prisma.education.create({
      data: {
        institutionName,
        degreeName,
        fieldOfStudy: fieldOfStudy || "",
        description: description || "",
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : new Date(startDate),
      },
    });

    res.status(200).json({
      message: "Education created successfully.",
      data: education,
      success: true,
    });
  } catch (error) {
    console.log("Error creating education:", error);
    res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// Update Education
export const updateEducation = async (
  req: Request<educationParams>,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.id || req.body.id;
    if (!id) {
      res
        .status(400)
        .json({ message: "Education ID is required", success: false });
      return;
    }

    const educationExists = await prisma.education.findUnique({
      where: { id },
    });

    if (!educationExists) {
      res.status(404).json({ message: "Education not found", success: false });
      return;
    }

    const {
      institutionName,
      degreeName,
      fieldOfStudy,
      description,
      startDate,
      endDate,
    } = req.body;

    const updateData: any = {};
    if (institutionName !== undefined) updateData.institutionName = institutionName;
    if (degreeName !== undefined) updateData.degreeName = degreeName;
    if (fieldOfStudy !== undefined) updateData.fieldOfStudy = fieldOfStudy;
    if (description !== undefined) updateData.description = description;
    if (startDate !== undefined) updateData.startDate = new Date(startDate);
    if (endDate !== undefined) updateData.endDate = endDate ? new Date(endDate) : new Date(startDate);

    const education = await prisma.education.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json({
      message: "Education updated successfully.",
      data: education,
      success: true,
    });
  } catch (error) {
    console.log("Error updating education:", error);
    res.status(500).json({ message: "Internal server error.", success: false });
  }
};

// Delete Education
export const deleteEducation = async (
  req: Request<educationParams>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Id is required", success: false });
      return;
    }

    const educationExists = await prisma.education.findUnique({
      where: { id },
    });

    if (!educationExists) {
      res.status(404).json({ message: "Education not found", success: false });
      return;
    }

    const education = await prisma.education.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Education deleted successfully.",
      data: education,
      success: true,
    });
  } catch (error) {
    console.log("Error deleting education:", error);
    res.status(500).json({ message: "Internal server error.", success: false });
  }
};
