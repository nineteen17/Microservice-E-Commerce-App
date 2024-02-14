import { IMiddlewareHandler } from "../types";
import { ZodSchema } from "zod";
import { errorMessage } from "../utils/errorMessage";

export const validateMiddleware = (schema: ZodSchema) => ({req, res, next}: IMiddlewareHandler) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
  
      next();
    } catch (err) {
      return res.status(400).send(errorMessage(err));
    }
  };