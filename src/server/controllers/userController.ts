import { Request, Response, NextFunction } from "express";
import { db } from "../utils/pgConnect.js";
import { Timestamp, User } from "kysely-codegen";
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
  const createdUserId = db
    .insertInto("user")
    .values(newUser)
    .returning("user.id")
    .executeTakeFirst();
  console.log(createdUserId);
  res.locals.user.id = createdUserId;
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
    console.log("userController.login not implemented");
    const { username, password }: UserLogin = req.body;

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
