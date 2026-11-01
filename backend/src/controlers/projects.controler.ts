import type { Request, Response } from "express";

import { prisma } from "../config/dbConnection.js";

// Get All Projects
export const getProjects = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const projects = await prisma.projects.findMany();

    if (!projects) {
      res.status(404).json({ message: "No project found", success: false });
    }

    res.status(200).json({
      data: projects,
      success: true,
      message: "Projects fetched successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Add Project
export const addProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      projectTitle,
      projectDescription,
      displayImage,
      projectFeatures,
      techStack,
      liveLink,
      repoLink,
    } = req.body;

    const finalDisplayImage = req.file
      ? `/uploads/${req.file.filename}`
      : displayImage;

    let parsedFeatures = projectFeatures;
    try {
      parsedFeatures =
        typeof projectFeatures === "string"
          ? JSON.parse(projectFeatures)
          : projectFeatures;
    } catch {
      parsedFeatures = [];
    }

    let parsedTechStack = techStack;
    try {
      parsedTechStack =
        typeof techStack === "string" ? JSON.parse(techStack) : techStack;
    } catch {
      parsedTechStack = [];
    }

    if (
      !projectTitle ||
      !projectDescription ||
      !finalDisplayImage ||
      !parsedFeatures ||
      !parsedTechStack ||
      !liveLink ||
      !repoLink
    ) {
      res
        .status(400)
        .json({ message: "All fields are required", success: false });
      return;
    }

    const project = await prisma.projects.create({
      data: {
        projectTitle,
        projectDescription,
        displayImage: finalDisplayImage,
        projectFeatures: parsedFeatures,
        techStack: parsedTechStack,
        liveLink,
        repoLink,
      },
    });

    res.status(201).json({
      data: project,
      success: true,
      message: "Project added successfully.",
    });
  } catch (error) {
    console.log("Error adding project:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
      success: false,
    });
  }
};

// Update Project
export const updateProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      res
        .status(400)
        .json({ message: "Project ID is required", success: false });
      return;
    }

    const updateData: {
      projectTitle?: string;
      projectDescription?: string;
      displayImage?: string;
      projectFeatures?: string[];
      techStack?: string[];
      liveLink?: string;
      repoLink?: string;
    } = {};

    if (req.body.projectTitle !== undefined) {
      updateData.projectTitle = req.body.projectTitle;
    }
    if (req.body.projectDescription !== undefined) {
      updateData.projectDescription = req.body.projectDescription;
    }
    if (req.body.liveLink !== undefined) {
      updateData.liveLink = req.body.liveLink;
    }
    if (req.body.repoLink !== undefined) {
      updateData.repoLink = req.body.repoLink;
    }

    if (req.file) {
      updateData.displayImage = `/uploads/${req.file.filename}`;
    } else if (req.body.displayImage !== undefined) {
      updateData.displayImage = req.body.displayImage;
    }

    if (req.body.projectFeatures !== undefined) {
      try {
        updateData.projectFeatures =
          typeof req.body.projectFeatures === "string"
            ? JSON.parse(req.body.projectFeatures)
            : req.body.projectFeatures;
      } catch {
        updateData.projectFeatures = [];
      }
    }

    if (req.body.techStack !== undefined) {
      try {
        updateData.techStack =
          typeof req.body.techStack === "string"
            ? JSON.parse(req.body.techStack)
            : req.body.techStack;
      } catch {
        updateData.techStack = [];
      }
    }

    const project = await prisma.projects.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    res.status(200).json({
      data: project,
      success: true,
      message: "Project updated successfully.",
    });
  } catch (error) {
    console.log("Error updating project:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
      success: false,
    });
  }
};

// Delete Project
export const deleteProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
      res.status(400).json({ message: "Id is required", success: false });
      return;
    }
    const projectExists = await prisma.projects.findUnique({
      where: { id },
    });
    if (!projectExists) {
      res.status(404).json({ message: "Project not found", success: false });
      return;
    }
    const deletedProject = await prisma.projects.delete({
      where: { id },
    });
    res.status(200).json({
      message: "Project deleted successfully.",
      data: deletedProject,
      success: true,
    });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
