import { Request, Response, NextFunction } from "express";
import { db } from "../utils/pgConnect.js";
import { Timestamp } from "kysely-codegen";
import * as bcrypt from "bcrypt";

const userController: Record<string, any> = {};

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  console.log("Hello from userController");
  const rows = await db.selectFrom("user").select("username").execute();
  res.locals.users = rows;
  next();
}

/* Create User
 * Receive username and password
 * Salt and hash password
 * Store password in DB
 */
async function createUser(req: Request, res: Response, next: NextFunction) {}

export { getAllUsers };
