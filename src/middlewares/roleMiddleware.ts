import type { NextFunction, Request, Response } from "express";
import { BaseError } from "../utils/BaseError.js";

export const isAllowed = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role as string)) {
      throw new BaseError(
        403,
        "You do not have permission to access this resource.",
      );
    }

    next();
  };
};
