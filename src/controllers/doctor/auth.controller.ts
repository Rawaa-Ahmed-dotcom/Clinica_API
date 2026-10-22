import type { Request, Response } from "express";
import z from "zod";
import { doctorRegisterValidator } from "../../utils/validators/doctor.validator.js";
import type { ParsedQs } from "qs";
import { sharedRegister } from "../../utils/customRegister.js";
import { prisma } from "../../lib/prisma.js";
import { BaseError } from "../../utils/BaseError.js";
import { generateTokens } from "../../utils/generateTokens.js";
import { sha256 } from "../../utils/hashing.js";
import { REFRESH_TOKEN_TTL_MS } from "../../utils/constants.js";
import "dotenv/config";

export const doctorRegister = async (
  req: Request<
    object,
    object,
    z.infer<typeof doctorRegisterValidator>,
    ParsedQs
  >,
  res: Response,
) => {
  const { hashedPassword } = await sharedRegister(req);

  const speciality = await prisma.speciality.findUnique({
    where: { speciality_id: req.body.speciality_id },
  });
  if (!speciality) throw new BaseError(400, "Speciality not found");

  const { refreshToken, accessToken, newDoctor } = await prisma.$transaction(
    async (tx) => {
      const newDoctor = await tx.user.create({
        data: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hashedPassword,
          address: req.body.address,
          city_id: req.body.city_id,
          governorate: req.body.governorate,
          phone: req.body.phone,
          status: "ACTIVE",
          role: "DOCTOR",
          doctor: {
            create: {
              bio: req.body.bio ?? null,
              years_of_experience: req.body.years_of_experience,
              license_number: req.body.licence_number,
              issuing_authority: req.body.issuing_authority,
              expiry_date: req.body.expiry_date,
              speciality: {
                connect: { speciality_id: req.body.speciality_id },
              },
            },
          },
        },
        select: {
          user_id: true,
          role: true,
          doctor: {
            select: {
              status: true,
              created_at: true,
            },
          },
        },
      });

      const { accessToken, refreshToken } = generateTokens(newDoctor);

      await tx.refreshToken.create({
        data: {
          token: sha256(refreshToken),
          expires_at: new Date(REFRESH_TOKEN_TTL_MS + Date.now()),
          user_id: newDoctor.user_id,
        },
      });
      return { accessToken, refreshToken, newDoctor };
    },
  );

  res.cookie("refreshToken", refreshToken, {
    maxAge: REFRESH_TOKEN_TTL_MS,
    httpOnly: true,
    secure: process.env.MODE !== "development",
    sameSite: "strict",
  });
  return res.status(201).json({
    message: "application sent",
    status: newDoctor.doctor?.status,
    submitted_date: newDoctor.doctor?.created_at,
    accessToken,
  });
};

export const getMyDoctorStatus = async (req: Request, res: Response) => {
  const existedDoctor = await prisma.user.findUnique({
    where: {
      user_id: req.user?.user_id as number,
    },
    select: {
      doctor: {
        select: {
          status: true,
          created_at: true,
          updated_at: true,
        },
      },
    },
  });

  if (!existedDoctor) throw new BaseError(404, "Doctor profile not found");

  return res.status(200).json({
    status: existedDoctor.doctor?.status,
    submitted_date: existedDoctor.doctor?.created_at,
    updated_date: existedDoctor.doctor?.updated_at,
  });
};
