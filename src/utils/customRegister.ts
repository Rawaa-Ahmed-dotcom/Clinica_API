import type { Request } from "express";
import { prisma } from "../lib/prisma.js";
import type z from "zod";
import { BaseError } from "./BaseError.js";
import { isGovernorate } from "./constants.js";
import { hashPassword } from "./hashing.js";

export const sharedRegister = async (
  req: Request<object, object, z.infer<z.ZodTypeAny>>,
) => {
  const existed = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (existed) throw new BaseError(409, "user already exists");

  if (!isGovernorate(req.body.governorate)) {
    throw new BaseError(400, "Incorrect Governorate");
  }

  const city = await prisma.city.findUnique({
    where: { id: req.body.city_id },
  });

  if (!city || city.governorate !== req.body.governorate) {
    throw new BaseError(400, "City doesn't belong to this governorate");
  }
  const hashedPassword = await hashPassword(req.body.password);

  return { hashedPassword};
};
