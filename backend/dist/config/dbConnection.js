// Db Connection Setup
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
export async function dbConnection() {
    try {
        await prisma.$connect();
        console.log("Database connected successfully");
    }
    catch (error) {
        console.error("Error in database connection", error);
        process.exit(1);
    }
}
export default dbConnection;
//# sourceMappingURL=dbConnection.js.map