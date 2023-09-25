import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
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
      res.cookie("token", data, { httpOnly: true });
      next();
    }
  );
}
async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET, (err, data) => {
    if (err?.name === "TokenExpiredError") {
      res.redirect("/session/login");
    } else if (err) {
      res.status(401).send("Please authenticate");
      next({ error: "OTHER JWT ERROR" });
    }
    console.log("user is logged in");
    console.log(data);
    next();
  });
}
export { grantToken, isLoggedIn };
