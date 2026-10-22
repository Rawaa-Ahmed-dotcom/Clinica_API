import { Router } from "express";
import authDoctorRouter from "./auth.routes.js";
import specialityRouter from "./speciality.routes.js";



const doctorRouter = Router();


doctorRouter.use("/auth" ,authDoctorRouter);
doctorRouter.use("/specialities" , specialityRouter);


export default doctorRouter;