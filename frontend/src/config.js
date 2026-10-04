const ENVIRONMENT = import.meta.env.VITE_APP_ENV || "development";

const apiConfig = {
  development: {
    baseUrl: import.meta.env.VITE_DEVELOPMENT_BASE_URL,
  },
  production: {
    baseUrl: import.meta.env.VITE_PRODUCTION_BASE_URL,
  },
};

export const API_BASE_URL = apiConfig[ENVIRONMENT].baseUrl;
