import { Request, Response, NextFunction } from "express";

function getUserPurchases(req: Request, res: Response, next: NextFunction) {
  console.log("Hello from purchaseController.getUserPurchases");
  next();
}

function getPurchase(req: Request, res: Response, next: NextFunction) {
  console.log("Hello from purchaseControler.getPurchase");
  next();
}

function addPurchase(req: Request, res: Response, next: NextFunction) {
  console.log("Hello from addPurchase");
  next();
}

export { getPurchase, getUserPurchases, addPurchase };
