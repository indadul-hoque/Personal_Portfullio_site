/**
 * Simple env reader — no validation library yet.
 * Swap this for Zod later without touching the rest of the app.
 */

function required(name: string, value: string | undefined): string {
  if (!value) {
    console.error(`❌ Missing required env var: ${name}`);
    process.exit(1);
  }
  return value;
}

export const env = {
  NODE_ENV: (process.env.NODE_ENV ?? "development") as
    | "development"
    | "production"
    | "test",

  PORT: Number(process.env.PORT ?? 3000),

  LOG_LEVEL: process.env.LOG_LEVEL ?? "info",

  // Dev origins
  DEV_MAIN_SITE_ORIGIN: process.env.DEV_MAIN_SITE_ORIGIN,
  DEV_DASHBOARD_ORIGIN: process.env.DEV_DASHBOARD_ORIGIN,

  // Prod origins
  PROD_MAIN_SITE_ORIGIN: process.env.PROD_MAIN_SITE_ORIGIN,
  PROD_DASHBOARD_ORIGIN: process.env.PROD_DASHBOARD_ORIGIN,

  // Optional extras (comma-separated)
  EXTRA_ALLOWED_ORIGINS: process.env.EXTRA_ALLOWED_ORIGINS,

  // Trust proxy hops
  TRUST_PROXY: Number(process.env.TRUST_PROXY ?? 1),
};

export const isProd = env.NODE_ENV === "production";
export const isDev = env.NODE_ENV === "development";

// Fail fast in production if no prod origin is configured.
if (isProd && !env.PROD_MAIN_SITE_ORIGIN && !env.PROD_DASHBOARD_ORIGIN) {
  console.error(
    "❌ Production requires PROD_MAIN_SITE_ORIGIN or PROD_DASHBOARD_ORIGIN to be set.",
  );
  process.exit(1);
}

// Silence "required is unused" if you want the helper handy for later.
void required;
