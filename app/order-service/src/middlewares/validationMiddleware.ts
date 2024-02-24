import { ZodSchema } from "zod";
import { errorMessage } from "../utils/errorMessage";
import { Request, Response, NextFunction } from "express";

export const validateMiddleware = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {

  try {
      schema.parse(req.body);

      next();
  } catch (err) {
      return res.status(400).send(errorMessage(err));
  }
};
