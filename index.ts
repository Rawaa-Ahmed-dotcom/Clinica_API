import app from "./src/server.js";
import type { Request , Response } from "express";




app.get("/", (req : Request , res: Response ) => {
   return res.status(200).json("Welcome to clinica");
})