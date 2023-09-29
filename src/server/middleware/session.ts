import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import CustomError from "../utils/CustomError.js";
import * as dotenv from "dotenv";
dotenv.config();
const JWT_SECRET: string = String(process.env.JWT_SECRET);

async function grantToken(req: Request, res: Response, next: NextFunction) {
  console.log("hello from sessioncontroller.granttoken");
  console.log(res.locals.user.id);

  jwt.sign(
    { ssid: res.locals.user.id },
    JWT_SECRET,
    { expiresIn: "60m" },
    (err, data) => {
      if (err) {
        next({ err: "JWT ERROR" });
      }
      // Success
      // Token stored in localStorage, not cookie
      // res.cookie("token", data, { httpOnly: true });
      res.status(200).json({ token: data });
    }
  );
}

async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization")?.replace("Bearer", "");

    // Error: no token was provided
    if (!token) {
      const MissingTokenError = new CustomError(
        "No token was provided. Please login",
        "MissingTokenError"
      );
      throw MissingTokenError;
    }

    // // Verify token and assign to res.locals
    const tokenData = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // // Need type check due to typescript. If string, something wrong happened
    // if (typeof tokenData === "string") {
    //   const TokenVerifyError = new CustomError(
    //     "Error verifying token, it was a string",
    //     "TokenVerificationError"
    //   );
    //   throw TokenVerifyError;
    // }

    console.log("================ Verified User ===================");
    console.log("User ID: ", tokenData.ssid);
    res.locals.userid = tokenData.ssid;
    next();
  } catch (e) {
    if (e?.name === "TokenExpiredError" || e?.name === "MissingTokenError") {
      console.log("User has invalid session.");
      res.redirect("/session/login");
    } else if (e) {
      next(e);
    }
  }
}
export { grantToken, isLoggedIn };
