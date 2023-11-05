import { Request, Response, NextFunction } from "express";
import { db } from "../../utils/pgConnect.js";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();
const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS);

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
interface UserSignup {
  email: string;
  username: string;
  password: string;
}

async function createUser(req: Request, res: Response, next: NextFunction) {
  const { email, password, username }: UserSignup = req.body;
  const newUser: UserSignup = { email, password, username };
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  newUser.password = hashedPassword;

  // Insert new user into db and get the user id
  const createdUserId = await db
    .insertInto("user")
    .values(newUser)
    .returning("user.id")
    .executeTakeFirst();
  console.log("================userController CREATED USER ID==============");
  console.log(createdUserId);

  // Insert dummy data for first render
  // const today = Date.now();
  // const result = await db
  //   .insertInto("purchase_details")
  //   .values({
  //     purchase_date: today.toString(),
  //     product_id: ,
  //     store_id: storeId,
  //     return_days,
  //     warranty_days,
  //     price,
  //     user_id: res.locals.userid,
  //     receipt_id: "1f3b30e1-1b64-4dbd-9098-ad6f7deb62d0",
  //     returned: false,
  //     note,
  //   })
  //   .returningAll()
  //   .executeTakeFirst();

  res.locals.user = { id: createdUserId?.id };
  next();
}

async function checkUserExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username }: { username: string } = req.body;
  const existingUser = await db
    .selectFrom("user")
    .select("username")
    .where("username", "=", username)
    .execute();
  if (existingUser.length > 0) {
    console.log("User exists from checkUserExists");
    console.log(existingUser);
    next({ err: "User already exists" });
  }
  next();
}

/* Login user
 * Check password
 */
interface UserLogin {
  username: string;
  password: string;
}
async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password }: UserLogin = req.body;
    console.log(`Received body`);
    console.log(req.body);
    console.log(Object.keys(req.body));

    const result = await db
      .selectFrom("user")
      .select(["password", "user.id"])
      .where("username", "=", username)
      .executeTakeFirstOrThrow();

    const validPassword: boolean = await bcrypt.compare(
      password,
      result.password
    );

    if (!validPassword) {
      next({ error: { message: "Invalid credentials." } });
    }

    // Store user id from database to generate a token
    res.locals.user = result;

    next();
  } catch (e) {
    console.error("Error from userController.login");
    next(e);
  }
}

export { getAllUsers, createUser, checkUserExists, login };
