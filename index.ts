import { handleGlobalErrors } from "./src/middlewares/handleGlobalErrors.js";
import globalRouter from "./src/routes/index.js";
import app from "./src/server.js";
import type { NextFunction, Request , Response } from "express";
import cors from "cors";
import type { BaseError } from "./src/utils/BaseError.js";

app.use(cors());

app.use(globalRouter);

app.use((error : BaseError , req : Request , res : Response , next : NextFunction) => {
   return handleGlobalErrors(error , req , res , next);
})

app.get("/", (req : Request , res: Response ) => {
   return res.status(200).json("Welcome to clinica");
})