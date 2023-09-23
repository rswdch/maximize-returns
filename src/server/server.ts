import express from "express";
import * as dotenv from "dotenv";
import * as path from "path";
// Import routers
import { router as purchaseRouter } from "./routes/purchases.js";
import { router as userRouter } from "./routes/users.js";
import { router as sessionRouter } from "./routes/sessions.js";
// ES6 compatibility for __dirname
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
// app.use(express.urlencoded());

// Serve static client files
app.use(express.static(path.resolve(__dirname, "../../dist/client/")));

// Routes
app.use("/api/purchases", purchaseRouter);
app.use("/api/users", userRouter);
app.use("/login", sessionRouter);

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
