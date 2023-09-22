import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as purchaseController from "../controllers/purchaseController.js";
const router = express.Router();

router.get(
  "/:id",
  purchaseController.getUserPurchases,
  purchaseController.getPurchase,
  purchaseController.addPurchase,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("Hello from purchases GET");
  }
);

export { router };
