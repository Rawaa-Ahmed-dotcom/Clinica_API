import { Router } from "express";
import { authProtect } from "../../middlewares/authMiddleware.js";
import { isAllowed } from "../../middlewares/roleMiddleware.js";
import {
  createSpeciality,
  getAllSpecialities,
} from "../../controllers/doctor/specialities.controller.js";
import { handleValidationErrors } from "../../middlewares/handleValidationErros.js";
import { specialitiesValidator } from "../../utils/validators/doctor.validator.js";
import { AsyncHandler } from "../../middlewares/AsyncHandler.js";

const specialityRouter = Router();

// ============= Get ALL Specialities  ==================

specialityRouter.get("/", AsyncHandler(getAllSpecialities));

specialityRouter.use(authProtect);
specialityRouter.use(isAllowed("ADMIN"));

// ============= Create Speciality  ==================

specialityRouter.post(
  "/",
  handleValidationErrors({ body: specialitiesValidator }),
  AsyncHandler(createSpeciality),
);

export default specialityRouter;
