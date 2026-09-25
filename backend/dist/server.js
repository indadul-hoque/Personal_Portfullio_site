import process from "process";
import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { dbConnection } from "./config/dbConnection.js";
const PORT = process.env.PORT || 4001;
async function serverStart() {
    try {
        // Database connection first
        await dbConnection();
        // Create server and listen
        const server = app.listen(PORT, () => {
            console.log(`Server is running at port: http://localhost:${PORT}`);
        });
        // Server Stop
        process.on("SIGTERM", () => {
            console.log("Server is shutting down...");
            server.close(() => {
                console.log("Server closed");
                process.exit(0);
            });
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Error in server start: ${errorMessage}`);
    }
}
// Start the server
serverStart();
//# sourceMappingURL=server.js.map