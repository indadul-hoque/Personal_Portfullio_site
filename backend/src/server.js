import process from "process";

import app from "./app.js";

const PORT = process.env.PORT || 4001;

function serverStart() {
  try {
    // Create server and listen
    const server = app.listen(PORT, () => {
      console.log(`Server is running at port: http://localhost:${PORT}`);
    });

    // Database connection

    // Server Stop
    process.on("SIGTERM", () => {
      console.log("Server is shutting down...");
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error(`Error in server start: ${error.message}`);
  }
}

// Start the server
serverStart();
