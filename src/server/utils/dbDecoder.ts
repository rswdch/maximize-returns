import { db } from "./pgConnect.js";
import { Request, Response, NextFunction } from "express";

async function storeToId(storeName: string) {
  const storeId = await db
    .selectFrom("store")
    .select("store.id")
    .where("store.name", "=", storeName)
    .executeTakeFirst();
  if (typeof storeId === "undefined") {
    console.log(`Store ${storeName} does not exist, creating new store.`);
    const newStore = await db
      .insertInto("store")
      .values({
        name: storeName,
      })
      .returning("store.id as id")
      .executeTakeFirstOrThrow();
    console.log(newStore.id);
    return newStore.id;
  }

  return storeId.id;
}

export { storeToId };
