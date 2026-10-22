import z from "zod";
import {
  DATE_REGEX,
} from "../regex.js";
import {
  Gender,
} from "../../../generated/prisma/enums.js";
import { registerSchema , passwordMatch , passwordMatchError} from "./globals.validator.js";

// ===========================================  AUTH VALIDATORS ===================================================


// ========== Patient Register Schema ==========

const patientRegisterSchema = registerSchema.extend({
  date_of_birth: z
    .string()
    .trim()
    .regex(DATE_REGEX, { message: "Date must be in the format YYYY-MM-DD." })
    .refine(
      (val) => {
        const date = new Date(`${val}T00:00:00Z`);
        return (
          !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === val
        );
      },
      { message: "Please enter a valid date." },
    )
    .refine((val) => new Date(val) < new Date(), {
      message: "Date of birth must be in the past.",
    })
    .refine((val) => new Date(val).getUTCFullYear() >= 1900, {
      message: "Please enter a valid date of birth.",
    })
    .transform((val) => new Date(val)),
  gender: z.nativeEnum(Gender),
});



// ========== Register Validator for patient ==========

export const PatientRegisterValidator = patientRegisterSchema.refine(
  passwordMatch,
  passwordMatchError,
);


