import jwt from "jsonwebtoken";
import "dotenv/config";
import { BaseError } from "./BaseError.js";
import type { User } from "../../generated/prisma/client.js";

export const generateTokens =  (
  user: Pick<User , "user_id" | "role"> ,
) => {
  let secretKey = process.env.SECRET_KEY;
  let refreshSecretKey = process.env.REFRESH_SECRET_KEY;
  if (!secretKey || !refreshSecretKey)
    throw new BaseError(500, "Server Configuration Error : Missing Secret Key");
   
  const tokenPayload = {
    user_id: user.user_id,
    role: user.role
  };
  const accessToken =  jwt.sign(tokenPayload, secretKey, {
    expiresIn: "15m",
  });

  const refreshToken =  jwt.sign(tokenPayload, refreshSecretKey, {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
};
