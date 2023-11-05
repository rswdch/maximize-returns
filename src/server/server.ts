import express from "express";
import * as dotenv from "dotenv";
import * as path from "path";
import bodyParser from "body-parser";

// Import routers
import { router as purchaseRouter } from "./controllers/purchase/purchase.routes.js";
import { router as userRouter } from "./controllers/user/user.routes.js";
import { router as sessionRouter } from "./controllers/session/session.routes.js";

// ES6 compatibility for __dirname
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Type imports
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static client files
app.use(express.static(path.resolve(__dirname, "../../dist/client/")));

// Routes
app.use("/api/purchases", purchaseRouter);
app.use("/api/users", userRouter);
app.use("/session", sessionRouter);

/**
 * 404 handler
 */
app.use("*", (req: Request, res: Response) => {
  res.status(404).send("Not Found");
});

// Global Error handler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // All errors from async & non-async route above will be handled here
  console.error(err.stack);
  console.error(err.message);
  res.status(500).send("An unknown error has occurred.");
};
app.use(globalErrorHandler);

// Configure environment variables, start server
dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
