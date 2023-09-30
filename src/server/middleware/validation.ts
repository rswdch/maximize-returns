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
      username: z.string().min(3),
      password: z.string().min(6),
    }),
  }),

  newPurchase: z.object({
    body: z.object({
      // purchase_date: "2020-01-01",
      // product_id: z.number(),
      product_name: z.string(),
      // store_id: z.number(),
      store_name: z.string(),
      return_days: z.number(),
      warranty_days: z.number(),
      price: z.number(),
      // receipt_id: z.string().uuid(),
      returned: z.boolean(),
    }),
  }),
};

export { validate, schemas };
