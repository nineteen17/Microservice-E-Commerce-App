import { ZodSchema } from "zod";
import { errorMessage } from "../utils/errorMessage";
import { Request, Response, NextFunction } from "express";

export const validateMiddleware = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
      // Pass req.body directly to match the structure expected by RegisterSchema
      schema.parse(req.body);

      next();
  } catch (err) {
      return res.status(400).send(errorMessage(err));
  }
};
