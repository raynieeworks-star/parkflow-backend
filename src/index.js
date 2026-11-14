import path from "path";
import dotenv from "dotenv";
const dir = import.meta.dirname;

dotenv.config({ path: path.join(dir, "..", "config.env") });

import app from "./app.js";

const PORT = process.env.PORT || 3000;

const startServer = async function () {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
