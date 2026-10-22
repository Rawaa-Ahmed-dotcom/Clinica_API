import { Router, type Request, type Response } from "express";
import {
  GOVERNORATE_KEYS,
  GOVERNORATES,
  isGovernorate,
} from "../utils/constants.js";
import { BaseError } from "../utils/BaseError.js";
import { prisma } from "../lib/prisma.js";
import { AsyncHandler } from "../middlewares/AsyncHandler.js";

const globals = Router();

globals.get(
  "/governs",
  AsyncHandler((req: Request, res: Response) => {
    const data = Object.entries(GOVERNORATES).map(([key, label]) => ({
      key,
      ...label,
    }));
    return res.status(200).json(data);
  }),
);

globals.get(
  "/:governorate/cities",
  AsyncHandler(async (req: Request, res: Response) => {
    const { governorate } = req.params;
    if (!isGovernorate(governorate)) {
      throw new BaseError(400, "Incorrect governorate");
    }
    const cities = await prisma.city.findMany({
      where: { governorate },
      select: { id: true, nameEn: true, nameAr: true },
      orderBy: { nameEn: "asc" },
    });
    return res.status(200).json(cities);
  }),
);

export default globals;
