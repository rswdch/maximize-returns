import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as userController from "../controllers/userController.js";
const router = express.Router();

router.get(
  "/",
  userController.getAllUsers,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.users);
  }
);

export { router };
