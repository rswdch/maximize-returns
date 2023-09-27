import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as purchaseController from "../controllers/purchaseController.js";
import * as session from "../middleware/session.js";
import { validate, schemas } from "../middleware/validation.js";
const router = express.Router();

router.get(
  "/",
  session.isLoggedIn,
  purchaseController.getUserPurchases,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.locals.userPurchases);
  }
);

router.post(
  "/",
  session.isLoggedIn,
  validate(schemas.newPurchase),
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
    res.status(200).send(res.locals.purchase);
  }
);

router.delete(
  "/:id",
  session.isLoggedIn,
  purchaseController.deletePurchase,
  (req: Request, res: Response, next: NextFunction) => {
    console.log("DELETE /purchases/id");
    const purchaseDetails = res.locals.deleted;
    res.send(purchaseDetails);
  }
);

export { router };
