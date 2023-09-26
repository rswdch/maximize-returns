import { Request, Response, NextFunction } from "express";
import { db } from "../utils/pgConnect.js";
import * as dbDecoder from "../utils/dbDecoder.js";

async function getUserPurchases(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await db
      .selectFrom("purchase_details")
      .where("purchase_details.user_id", "=", res.locals.userid)
      .innerJoin("product", "purchase_details.product_id", "product.id")
      .innerJoin("store", "purchase_details.store_id", "store.id")
      .select([
        "purchase_details.id",
        "product.name",
        "store.name",
        "purchase_details.purchase_date",
        "purchase_details.return_days",
        "purchase_details.warranty_days",
        "purchase_details.price",
        "purchase_details.returned",
      ])
      .execute();
    res.locals.userPurchases = result;
  } catch (e) {
    next(e);
  }
  console.log("Hello from purchaseController.getUserPurchases");
  next();
}

function getPurchase(req: Request, res: Response, next: NextFunction) {
  console.log("Hello from purchaseControler.getPurchase");
  next();
}

async function addPurchase(req: Request, res: Response, next: NextFunction) {
  // User will supply store, product
  // Need to get id
  try {
    console.log("Hello from purchaseController.addPurchase");
    const storeId = await dbDecoder.storeToId(req.body.store_name);

    // Destructure all the items in request body
    // Note: already has been validated with Zod
    const {
      purchase_date,
      product_id,
      return_days,
      warranty_days,
      price,
      receipt_id,
    } = req.body;

    const result = await db
      .insertInto("purchase_details")
      .values({
        purchase_date,
        product_id,
        store_id: storeId,
        return_days,
        warranty_days,
        price,
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
