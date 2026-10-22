import { Router } from "express";
import { handleValidationErrors } from "../../middlewares/handleValidationErros.js";
import { PatientRegisterValidator } from "../../utils/validators/patient.validator.js";
import { AsyncHandler } from "../../middlewares/AsyncHandler.js";
import { patientRegister } from "../../controllers/patient/auth.controller.js";

const authPatientRouter = Router();

// ======================== Register =======================

// Patient Register

authPatientRouter.post(
  "/register",
  handleValidationErrors({ body: PatientRegisterValidator }),
  AsyncHandler(patientRegister),
);

export default authPatientRouter;
