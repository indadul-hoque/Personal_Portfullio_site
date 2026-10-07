import pino from "pino";
import { env, isProd } from "../config/env.js";
export const logger = pino({
    level: env.LOG_LEVEL,
    ...(!isProd && {
        transport: {
            target: "pino-pretty",
            options: { colorize: true, translateTime: "SYS:standard" },
        },
    }),
    base: { service: "api" },
    redact: {
        paths: [
            "req.headers.authorization",
            "req.headers.cookie",
            "res.headers['set-cookie']",
        ],
        censor: "[REDACTED]",
    },
});
//# sourceMappingURL=logger.js.map