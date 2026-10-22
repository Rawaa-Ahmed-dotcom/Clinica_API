import type { Request, Response, NextFunction } from "express";
import type z from "zod";
import type {
  specialitiesValidator,
  specialParams,
  specialUpdateValidator,
} from "../../utils/validators/doctor.validator.js";
import { prisma } from "../../lib/prisma.js";
import { BaseError } from "../../utils/BaseError.js";

export const createSpeciality = async (
  req: Request<object, object, z.infer<typeof specialitiesValidator>, object>,
  res: Response,
) => {
  const { name, description } = req.body;
  const newSpeciality = await prisma.speciality.create({
    data: {
      name,
      description: description ?? null,
    },
    select: {
      speciality_id: true,
      name: true,
      description: true,
    },
  });

  return res.status(201).json(newSpeciality);
};

export const getAllSpecialities = async (req: Request, res: Response) => {
  const specialities = await prisma.speciality.findMany({
    select: {
      speciality_id: true,
      name: true,
      description: true,
    },
    orderBy: { name: "asc" },
  });
  return res.status(200).json(specialities);
};

export const updateSpeciality = async (
  req: Request<
    z.infer<typeof specialParams>,
    object,
    z.infer<typeof specialUpdateValidator>,
    object
  >,
  res: Response,
) => {
  const id = Number(req.params.speciality_id);
  const { name, description } = req.body;

  const updated = await prisma.speciality.update({
    where: { speciality_id: id },
    data: {
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
    },
    select: {
      speciality_id: true,
      name: true,
      description: true,
    },
  });

  return res.status(200).json(updated);
};

export const deleteSpeciality = async (
  req: Request<z.infer<typeof specialParams>, object, object, object>,
  res: Response,
) => {
  const id = Number(req.params.speciality_id);

  const deleted = await prisma.speciality.delete({
    where: { speciality_id: id },
  });

  return res.status(200).json(deleted);
};
