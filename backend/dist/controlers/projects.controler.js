import { prisma } from "../config/dbConnection.js";
export const getProjects = async (_req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};
export const addProject = async (req, res) => {
    try {
        const { projectTitle, projectDescription, displayImage, projectFeatures, techStack, liveLink, repoLink, } = req.body;
        if (!projectTitle ||
            !projectDescription ||
            !displayImage ||
            !projectFeatures ||
            !techStack ||
            !liveLink ||
            !repoLink) {
            res
                .status(400)
                .json({ message: "All fields are required", success: false });
            return;
        }
        const project = await prisma.projects.create({
            data: {
                projectTitle,
                projectDescription,
                displayImage,
                projectFeatures,
                techStack,
                liveLink,
                repoLink,
            },
        });
        res.status(201).json({
            data: project,
            success: true,
            message: "Project added successfully.",
        });
    }
    catch (error) {
        console.log("Error fetching projects:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== "string") {
            res
                .status(400)
                .json({ message: "Project ID is required", success: false });
            return;
        }
        const project = await prisma.projects.update({
            where: {
                id: id,
            },
            data: req.body,
        });
        res.status(200).json({
            data: project,
            success: true,
            message: "Project updated successfully.",
        });
    }
    catch (error) {
        console.log("Error updating project:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
//# sourceMappingURL=projects.controler.js.map