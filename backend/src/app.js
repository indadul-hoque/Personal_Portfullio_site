import express from "express";

const app = express();

// Health Check API
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is healthy and running fine.",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

export default app;