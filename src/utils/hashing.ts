import bcrypt from "bcrypt";
import { createHash } from "node:crypto";
export const hashPassword = async (password: string) => {
  const hashed = await bcrypt.hash(password, 12);
  return hashed;
};


export const sha256 =  (token : string) => {
  return createHash("sha256").update(token).digest('hex');
}
