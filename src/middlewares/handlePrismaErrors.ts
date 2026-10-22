import { Prisma } from "../../generated/prisma/client.js";
import { BaseError } from "../utils/BaseError.js";

export const handlePrismaErrors = (error: unknown): unknown => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": {
        const target = error.meta?.target;
        const fields = Array.isArray(target)
          ? target.join(", ")
          : typeof target === "string"
            ? target
            : null;
        return new BaseError(
          409,
          fields ? `${fields} already exists` : "Duplicate value",
        );
      }

      case "P2003": {
        const field = error.meta?.field_name;
        return new BaseError(
          409,
          field
            ? `Operation failed because of a related record (${field})`
            : "This record is linked to other records and cannot be changed or deleted",
        );
      }

      case "P2011":
        return new BaseError(400, "A required field is missing");

      case "P2014":
        return new BaseError(400, "This change violates a required relation");

      case "P2025":
        return new BaseError(404, "Record not found");

      default:
        return new BaseError(500, "Database error");
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new BaseError(400, "Invalid data provided");
  }

  if (
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientRustPanicError
  ) {
    return new BaseError(503, "Database is currently unavailable");
  }

  return error;
};
