import type { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { BaseError } from "../utils/BaseError.js";
import { handlePrismaErrors } from "./handlePrismaErrors.js";

export const handleGlobalErrors = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const handled = handlePrismaErrors(error);

  const normalized =
    handled instanceof BaseError
      ? handled
      : new BaseError(500, "Internal server error");

  if (normalized.statusCode >= 500) console.error(error);

  const isDev = process.env.MODE === "development";

  return res.status(normalized.statusCode).json({
    status: normalized.statusCode >= 500 ? "error" : "fail",
    message: normalized.message,
    ...(isDev && {
      name: normalized.name,
      stack: error instanceof Error ? error.stack : undefined,
    }),
  });
};