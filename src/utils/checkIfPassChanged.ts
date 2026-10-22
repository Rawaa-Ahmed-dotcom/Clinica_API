import type { UserModel } from "../../generated/prisma/models.js";
import { BaseError } from "./BaseError.js";
import type { DecodedToken } from "./interfaces.js";

export const checkIfPasswordChanged = (
  decoded: DecodedToken,
  user: UserModel,
) => {
  if (user.password_changed_at) {
    if (new Date(user?.password_changed_at).getTime() / 1000 > decoded.iat) {
        throw new BaseError(401 , "This user recently has changed their password.Please, login again...");
    }
  }
};
