import type { Request, Response } from "express";
import type { ParsedQs } from "qs";
import type z from "zod";
import type { PatientRegisterValidator } from "../../utils/validators/patient.validator.js";
import { prisma } from "../../lib/prisma.js";
import { sha256 } from "../../utils/hashing.js";
import { BaseError } from "../../utils/BaseError.js";
import { generateTokens } from "../../utils/generateTokens.js";
import { REFRESH_TOKEN_TTL_MS } from "../../utils/constants.js";
import { sharedRegister } from "../../utils/customRegister.js";

export const patientRegister = async (
  req: Request<
    object,
    object,
    z.infer<typeof PatientRegisterValidator>,
    ParsedQs
  >,
  res: Response,
) => {
  const { hashedPassword } = await sharedRegister(req);

  const { accessToken, refreshToken, newUser } = await prisma.$transaction(
    async (tx) => {
      const newUser = await tx.user.create({
        data: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hashedPassword,
          address: req.body.address,
          city_id: req.body.city_id,
          status: "ACTIVE",
          governorate: req.body.governorate,
          phone: req.body.phone,
          patient: {
            create: {
              date_of_birth: req.body.date_of_birth,
              gender: req.body.gender,
            },
          },
        },
        select: {
          user_id: true,
          first_name: true,
          last_name: true,
          email: true,
          address: true,
          city_id: true,
          status: true,
          governorate: true,
          phone: true,
          role: true,
        },
      });

      const { accessToken, refreshToken } = generateTokens(newUser);
      await tx.refreshToken.create({
        data: {
          token: sha256(refreshToken),
          expires_at: new Date(REFRESH_TOKEN_TTL_MS + Date.now()),
          user_id: newUser.user_id,
        },
      });
      return { accessToken, refreshToken, newUser };
    },
  );
  res.cookie("refreshToken", refreshToken, {
    maxAge: REFRESH_TOKEN_TTL_MS,
  });
  return res.status(201).json({ user: newUser, accessToken });
};
