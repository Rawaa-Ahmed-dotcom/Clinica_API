import { Router } from "express";
import { handleValidationErrors } from "../../middlewares/handleValidationErros.js";
import { doctorRegisterValidator } from "../../utils/validators/doctor.validator.js";
import { AsyncHandler } from "../../middlewares/AsyncHandler.js";

import {
  doctorRegister,
  getMyDoctorStatus,
} from "../../controllers/doctor/auth.controller.js";
import { authProtect } from "../../middlewares/authMiddleware.js";
import { isAllowed } from "../../middlewares/roleMiddleware.js";

const authDoctorRouter = Router();

authDoctorRouter.post(
  "/register",
  handleValidationErrors({ body: doctorRegisterValidator }),
  AsyncHandler(doctorRegister),
);

authDoctorRouter.use(authProtect);

authDoctorRouter.use(isAllowed("DOCTOR"));

authDoctorRouter.get("/getMyDoctorStatus", AsyncHandler(getMyDoctorStatus));

export default authDoctorRouter;
