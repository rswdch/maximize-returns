import * as z from "zod";
import { Request, Response, NextFunction } from "express";

const validate =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err) {
      return res.status(400).send(err.errors);
    }
  };

const schemas = {
  login: z.object({
    body: z.object({
      username: z.string(),
      password: z.string().min(6),
    }),
  }),

  signup: z.object({
    body: z.object({
      email: z.string().email(),
      username: z.string(),
      password: z.string().min(6),
    }),
  }),
};

export { validate, schemas };
