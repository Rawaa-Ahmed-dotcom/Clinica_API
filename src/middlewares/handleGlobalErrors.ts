import type {  Response} from "express";
import "dotenv/config";
import { BaseError } from "../utils/BaseError.js";

export const handleGlobalErrors = (error : BaseError , res : Response) => {
    let mode = process.env.MODE;
    error.statusCode = error.statusCode || 500;
    
    mode === "development" ? handleErrorsOnDev(error , res) : handleErrorsOnPro(error, res);  
}

const handleErrorsOnDev = (error : BaseError , res : Response) => {
    return res.status(error.statusCode).json({
        name : error.name,
        message : error.message,
        stack : error.stack,
    });
}


const handleErrorsOnPro = (error : BaseError , res : Response) => {
    return res.status(error.statusCode).json({
        message : error.message,
        name : error.name
    });
}