import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as purchaseController from "../controllers/purchaseController.js";
const router = express.Router();

/* Login
 * 1. Verify User
 * 2. Set JWT to cookie/localstorage
 */
router.post("/login", (req: Request, res: Response, next: NextFunction) => {});

/* Signup
 * 1. Create user
 * 2. Set JWT to cookie/localstorage
 */
router.post("/signup", (req: Request, res: Response, next: NextFunction) => {});

export { router };
