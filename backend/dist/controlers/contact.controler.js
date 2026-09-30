import { prisma } from "../config/dbConnection.js";
export const getContacts = async (_req, res) => {
    try {
        const contacts = await prisma.contact.findMany();
        if (!contacts) {
            res
                .status(401)
                .json({ message: "Contacts are not found.", success: false });
        }
        res.status(200).json({
            message: "Contacts fetched successfully",
            data: contacts,
            success: true,
        });
    }
    catch (error) {
        console.log("Internal server error", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};
export const createContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            res
                .status(400)
                .json({ message: "All fields are required.", success: false });
        }
        const contact = await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message,
            },
        });
        res.status(200).json({
            message: "Contact created successfully.",
            data: contact,
            success: true,
        });
    }
    catch (error) {
        console.log("Internal server error", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};
//# sourceMappingURL=contact.controler.js.map