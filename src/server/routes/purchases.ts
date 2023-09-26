import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as purchaseController from "../controllers/purchaseController.js";
import * as session from "../middleware/session.js";
const router = express.Router();

router.get(
  "/",
  session.isLoggedIn,
  purchaseController.getUserPurchases,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("Hello from purchases GET");
  }
);

router.post(
  "/",
  session.isLoggedIn,
  purchaseController.addPurchase,
  (req: Request, res: Response, next: NextFunction) => {
    console.log("POST /purchases");
    const purchaseDetails = res.locals.purchase_details;
    res.send(purchaseDetails);
  }
);

router.get(
  "/:id",
  session.isLoggedIn,
  purchaseController.getPurchase,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("Hello from purchase details");
  }
);

export { router };
