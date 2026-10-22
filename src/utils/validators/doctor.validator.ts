import z from "zod";
import { registerSchema } from "./globals.validator.js";
import { LICENCE_NUMBER_REGEX } from "../regex.js";
import { IssuingAuthority } from "../../../generated/prisma/enums.js";

// ===========================================  AUTH VALIDATORS ===================================================

// ========== Handle Expiry Date Licenece Number ==========

const expiryDateValidator = (data: { expiry_date: Date }) =>
  data.expiry_date > new Date();

const expiry_date_message = {
  message: "Licence expiry date must be in the future.",
};

// ========== Register Schema for Doctor ==========

const doctorSchema = registerSchema.extend({
  licence_number: z.string().trim().toUpperCase().regex(LICENCE_NUMBER_REGEX, {
    message:
      "Please enter a valid licence number in the format EGY-MED-123456.",
  }),
  issuing_authority: z.nativeEnum(IssuingAuthority),
  expiry_date: z.coerce.date({
    invalid_type_error: "Please enter a valid expiry date.",
  }),
  years_of_experience: z.number().min(0).max(60),
  speciality_id: z.number().int().min(1),
  bio: z.optional(z.string().trim().max(1000)),
});

// ========== Register Validator for Docotor ==========

export const doctorRegisterValidator = doctorSchema.refine(
  expiryDateValidator,
  expiry_date_message,
);

// ========== Specialities Validator ==========

export const specialitiesValidator = z.object({
  name: z.string().min(4).trim().toLowerCase(),
  description: z.optional(z.string().max(500).trim()),
});

export const specialUpdateValidator = specialitiesValidator
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });


export const specialParams = z.object({
  speciality_id : z.number().int().positive()
})