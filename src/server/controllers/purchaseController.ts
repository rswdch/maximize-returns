import { Request, Response, NextFunction } from "express";
import { db } from "../utils/pgConnect.js";

function getUserPurchases(req: Request, res: Response, next: NextFunction) {
  console.log("Hello from purchaseController.getUserPurchases");
  next();
}

function getPurchase(req: Request, res: Response, next: NextFunction) {
  console.log("Hello from purchaseControler.getPurchase");
  next();
}

async function addPurchase(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("Hello from purchaseController.addPurchase");
    const result = await db
      .insertInto("purchase_details")
      .values({
        purchase_date: "2020-01-01",
        product_id: 1,
        store_id: 1,
        return_days: 90,
        warranty_days: 90,
        price: 10,
        user_id: res.locals.userid,
        receipt_id: "1f3b30e1-1b64-4dbd-9098-ad6f7deb62d0",
        returned: false,
      })
      .returningAll()
      .executeTakeFirst();

    res.locals.purchase_details = result;
  } catch (e) {
    next(e);
  }
  next();
}

export { getPurchase, getUserPurchases, addPurchase };
