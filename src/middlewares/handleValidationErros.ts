import type { ZodType } from "zod/v4";
import type { Request, Response, NextFunction } from "express";
import z from "zod";
import { BaseError } from "../utils/BaseError.js";
import { fromError } from "zod-validation-error";

interface Schemas {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}

export const handleValidationErrors = (schemas: Schemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) {
        const errorMessage = fromError(result.error);
        throw new BaseError(400, errorMessage.toString());
      }
      req.body = result.data;
    }
    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) {
        const errorMessage = fromError(result.error);
        throw new BaseError(400, errorMessage.toString());
      }
      Object.assign(req.params, result.data);
    }
    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) {
        const errorMessage = fromError(result.error);
        throw new BaseError(400, errorMessage.toString());
      }
      Object.assign(req.query, result.data);
    }
    next();
  };
};
