import { Request, Response, NextFunction } from "express";
import { db } from "../../utils/pgConnect.js";
import * as dbDecoder from "../../utils/dbDecoder.js";

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
        "product.name as product",
        "store.name as store",
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

async function getPurchase(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await db
      .selectFrom("purchase_details")
      .where("id", "=", req.params.id)
      .selectAll()
      .executeTakeFirstOrThrow();
    res.locals.purchase = result;
  } catch (error) {
    next(error);
  }
  next();
}

async function addPurchase(req: Request, res: Response, next: NextFunction) {
  // User will supply store, product
  // Need to get id
  try {
    // Automatically add store if not existing
    const storeId = await dbDecoder.storeToId(req.body.store_name);
    const productId = await dbDecoder.productToId(req.body.product_name);

    // Destructure all the items in request body
    // Note: already has been validated with Zod
    const {
      product_name,
      purchase_date,
      return_days,
      warranty_days,
      price,
      receipt_id,
      note,
    } = req.body;

    const result = await db
      .insertInto("purchase_details")
      .values({
        purchase_date,
        product_id: productId,
        store_id: storeId,
        return_days,
        warranty_days,
        price,
        user_id: res.locals.userid,
        receipt_id: "1f3b30e1-1b64-4dbd-9098-ad6f7deb62d0",
        returned: false,
        note,
      })
      .returningAll()
      .executeTakeFirst();

    res.locals.purchase_details = result;
    res.locals.purchase_details.product = req.body.product_name;
    res.locals.purchase_details.store = req.body.store_name;
  } catch (e) {
    next(e);
  }
  next();
}

async function deletePurchase(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await db
      .deleteFrom("purchase_details")
      .where("id", "=", req.params.id)
      .returningAll()
      .executeTakeFirstOrThrow();
    res.locals.deleted = result;
  } catch (error) {}
  next();
}

async function updatePurchase(req: Request, res: Response, next: NextFunction) {
  console.log("Hello from purchaseController.updatePurchase");
  try {
    const updates = req.body;
    if (updates.product_name) {
      updates.product_id = await dbDecoder.productToId(req.body.product_name);
      delete updates.product_name;
    }
    if (updates.store_name) {
      updates.store_id = await dbDecoder.storeToId(req.body.store_name);
      delete updates.store_name;
    }
    const result = await db
      .updateTable("purchase_details")
      .set(updates)
      .where("id", "=", req.params.id)
      .returningAll()
      .executeTakeFirstOrThrow();
    res.locals.updated = result;
  } catch (error) {}
  next();
}
export {
  getPurchase,
  getUserPurchases,
  addPurchase,
  deletePurchase,
  updatePurchase,
};
