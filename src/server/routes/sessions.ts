import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as purchaseController from "../controllers/purchaseController.js";
import { validate, schemas } from "../utils/validation.js";
import * as userController from "../controllers/userController.js";
const router = express.Router();

/* Login
 * 1. Verify User
 * 2. Set JWT to cookie/localstorage
 */
router.post(
  "/login",
  validate(schemas.login),
  userController.login,
  (req: Request, res: Response, next: NextFunction) => {
    console.log("/login not yet implemented");
    res.status(200).send("/login not implemented");
  }
);

/* Signup
 * 1. Create user
 * 2. Set JWT to cookie/localstorage
 */
router.post(
  "/signup",
  validate(schemas.signup),
  userController.checkUserExists,
  userController.createUser,
  (req: Request, res: Response, next: NextFunction) => {
    // Check if username is available
    const { email, username, password } = req.body;
    res.json(req.body);
  }
);

export { router };
