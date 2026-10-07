import express, { type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { pinoHttp } from "pino-http";
import { randomUUID } from "node:crypto";

import { env, isProd } from "./config/env.js";
import { logger } from "./lib/logger.js";

// Application Routes
import apiRoutes from "./routes/index.js";

const app = express();

/* -------------------------------------------------------------------------- */
/*                               Trust proxy                                  */
/* -------------------------------------------------------------------------- */
// Correct req.ip behind Render/Railway/Fly/Nginx/Cloudflare.
app.set("trust proxy", env.TRUST_PROXY);

/* -------------------------------------------------------------------------- */
/*                              Security basics                               */
/* -------------------------------------------------------------------------- */
app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: false, // API-only, no HTML
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

/* -------------------------------------------------------------------------- */
/*                                Logging                                     */
/* -------------------------------------------------------------------------- */
app.use(
  pinoHttp({
    logger,
    genReqId: (req: Request) =>
      (req.headers["x-request-id"] as string | undefined) ?? randomUUID(),
    customLogLevel: (_req: Request, res: Response, err?: Error) => {
      if (err || res.statusCode >= 500) return "error";
      if (res.statusCode >= 400) return "warn";
      return "info";
    },
    autoLogging: {
      ignore: (req: Request) => req.url === "/healthz" || req.url === "/readyz",
    },
  }),
);

/* -------------------------------------------------------------------------- */
/*                                  CORS                                      */
/* -------------------------------------------------------------------------- */
const devOrigins = [
  env.DEV_MAIN_SITE_ORIGIN,
  env.DEV_DASHBOARD_ORIGIN,
  "http://localhost:5173",
  "http://localhost:5174",
];

const prodOrigins = [
  env.PROD_MAIN_SITE_ORIGIN,
  env.PROD_DASHBOARD_ORIGIN,
  ...(env.EXTRA_ALLOWED_ORIGINS?.split(",").map((o) => o.trim()) ?? []),
];

const rawOrigins = isProd ? prodOrigins : devOrigins;

const allowedOrigins: string[] = rawOrigins
  .filter((o): o is string => Boolean(o))
  .map((o) => o.replace(/\/+$/, ""))
  .map((o) => o.toLowerCase());

logger.info({ allowedOrigins, env: env.NODE_ENV }, "CORS origins configured");

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (curl, Postman, mobile, server-to-server)
      if (!origin) return callback(null, true);

      const normalized = origin.replace(/\/+$/, "").toLowerCase();

      if (allowedOrigins.includes(normalized)) {
        return callback(null, true);
      }

      // Reject cleanly — do NOT throw.
      logger.warn({ origin: normalized }, "CORS rejected origin");
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Request-Id"],
    exposedHeaders: ["X-Request-Id"],
    maxAge: 86_400,
  }),
);

/* -------------------------------------------------------------------------- */
/*                              Rate limiting                                 */
/* -------------------------------------------------------------------------- */
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: {
      status: "error",
      message: "Too many requests, please slow down.",
    },
  }),
);

app.use(
  "/api/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: {
      status: "error",
      message: "Too many auth attempts, try again later.",
    },
  }),
);

/* -------------------------------------------------------------------------- */
/*                             Body parsers                                   */
/* -------------------------------------------------------------------------- */
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

/* -------------------------------------------------------------------------- */
/*                                 Routes                                     */
/* -------------------------------------------------------------------------- */
app.use("/api", apiRoutes);

/* -------------------------------------------------------------------------- */
/*                              Health checks                                 */
/* -------------------------------------------------------------------------- */
app.get("/healthz", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.get("/readyz", async (_req: Request, res: Response) => {
  try {
    // await db.raw("SELECT 1");
    res.status(200).json({ status: "ready" });
  } catch (err) {
    logger.error({ err }, "readiness check failed");
    res.status(503).json({ status: "unavailable" });
  }
});

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "API is healthy and running fine.",
    status: "success",
    version: process.env.GIT_SHA ?? "dev",
    timestamp: new Date().toISOString(),
  });
});

export default app;
