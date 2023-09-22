import express from "express";
import * as dotenv from "dotenv";
import * as path from "path";

// ES6 compatibility for __dirname
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { userController } from "./controllers/userController.js";

const app = express();

// Import routers
import { router as purchaseRouter } from "./routes/purchases.js";
app.use("/api/purchases", purchaseRouter);

// Middleware
app.use(express.json());
// app.use(express.urlencoded());

// Serve static client files
app.use(express.static(path.resolve(__dirname, "../../dist/client/")));

// Routes
app.get("/api/users", userController.getAllUsers, (req, res) => {
  console.log(userController);
  res.status(200).send("Success!");
});

/**
 * 404 handler
 */
app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

// Configure environment variables, start server
dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
