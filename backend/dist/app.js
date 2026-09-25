import express, {} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// Application Routes
import apiRoutes from "./routes/index.js";
const app = express();
// Global middleware
// CORS configuration
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    ...(process.env.CLIENT_URL ? [process.env.CLIENT_URL] : []),
];
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (curl, Postman, server-to-server)
        if (!origin)
            return callback(null, true);
        // Always allow in non-production
        if (process.env.NODE_ENV !== "production")
            return callback(null, true);
        // In production, check the allowlist
        if (allowedOrigins.includes(origin)) {
            return callback(null, origin);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
// Request body and cookie parsers
app.use(express.json());
app.use(cookieParser());
// API Routes
app.use("/api", apiRoutes);
// Health Check API
app.get("/", (_req, res) => {
    res.status(200).json({
        message: "API is healthy and running fine.",
        status: "success",
        timestamp: new Date().toISOString(),
    });
});
export default app;
//# sourceMappingURL=app.js.map