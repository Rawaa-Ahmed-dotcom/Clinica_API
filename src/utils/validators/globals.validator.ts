import z from "zod";
import { EMAIL_REGEX , PHONE_REGEX , PASSWORD_REGEX } from "../regex.js";
import { Governorate } from "../../../generated/prisma/enums.js";



// ========== Register Schema ==========

export const registerSchema = z.object({
  first_name: z.string().min(3).trim(),
  last_name: z.string().min(3).trim(),
  email: z.string().trim().regex(EMAIL_REGEX, {
    message: "Please enter a valid email address, such as name@example.com.",
  }),
  password: z.string().trim().regex(PASSWORD_REGEX, {
    message:
      "Your password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character (@, $, !, %, *, ?, or &).",
  }),

  phone: z.string().trim().regex(PHONE_REGEX, {
    message: "Please enter a valid phone number, such as 01552527899.",
  }),
  governorate: z.nativeEnum(Governorate),
  passwordConfirm: z.string().trim(),
  address: z.string().trim(),
  city_id: z.number().int().min(0),
});


// ========== Handle password Confirmation ==========
export const passwordMatch = (data: { password: string; passwordConfirm: string }) =>
  data.password === data.passwordConfirm;

export const passwordMatchError = {
  message: "Password and password confirm are not the same",
  path: ["passwordConfirm"],
};