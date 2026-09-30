const ENVIRONMENT = import.meta.env.VITE_APP_ENV || "development";

const apiConfig = {
  development: {
    baseUrl:
      import.meta.env.VITE_DEVELOPMENT_BASE_URL || "http://localhost:4001/api",
  },
  production: {
    baseUrl:
      import.meta.env.VITE_PRODUCTION_BASE_URL || "http://localhost:5000/api",
  },
};

export const API_BASE_URL = apiConfig[ENVIRONMENT].baseUrl;
