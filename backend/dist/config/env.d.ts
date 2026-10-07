/**
 * Simple env reader — no validation library yet.
 * Swap this for Zod later without touching the rest of the app.
 */
export declare const env: {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    LOG_LEVEL: string;
    DEV_MAIN_SITE_ORIGIN: string | undefined;
    DEV_DASHBOARD_ORIGIN: string | undefined;
    PROD_MAIN_SITE_ORIGIN: string | undefined;
    PROD_DASHBOARD_ORIGIN: string | undefined;
    EXTRA_ALLOWED_ORIGINS: string | undefined;
    TRUST_PROXY: number;
};
export declare const isProd: boolean;
export declare const isDev: boolean;
//# sourceMappingURL=env.d.ts.map