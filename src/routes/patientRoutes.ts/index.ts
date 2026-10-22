import { Router } from "express";
import authPatientRouter from "./auth.routes.js";

const patientRouter = Router();


patientRouter.use("/auth",authPatientRouter);



export default patientRouter;