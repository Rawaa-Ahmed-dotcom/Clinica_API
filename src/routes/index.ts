import { Router } from "express";
import doctorRouter from "./doctorRoutes/index.js";
import patientRouter from "./patientRoutes.ts/index.js";
import globals from "./globals.routes.js";
const globalRouter = Router();

globalRouter.use("/api/patient", patientRouter);
globalRouter.use("/api/doctor", doctorRouter);
globalRouter.use("/api/globals", globals);

export default globalRouter;
