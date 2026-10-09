import type {Request , Response, NextFunction} from "express";
import { BaseError } from "../utils/BaseError.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from '@prisma/adapter-pg';
import type { DecodedToken } from "../utils/interfaces.js";
import { checkIfPasswordChanged } from "../utils/checkIfPassChanged.js";

const prisma = new PrismaClient({adapter : new PrismaPg({connectionString : process.env.DATABASE_URL})});



export const authProtect = async (req : Request , res : Response , next : NextFunction) => {
    const authorizationHeader = req.headers?.authorization;
    if(!authorizationHeader) {
        throw new BaseError(401 , "UnAuthenticated : Missing or Malformed Token!");
    }
    const token = authorizationHeader.split(" ")[1];
    if(!token) {
        throw new BaseError(401 , "UnAuthenticated : Missed or Malformed Token!");
    }
    let secretKey = process.env.SECRET_KEY;
    if(!secretKey) {
        throw new BaseError(500 , "Server Configration Error : Missing Secret Key");
    }
    let decoded = await jwt.verify(token , secretKey) as DecodedToken;
    
    if(!decoded || !decoded.user_id) {
        throw new BaseError(401 , "UnAuthenticated : Missed or Malformed Token!");
    }
    const user = await prisma.user.findUnique({
        where : {
            user_id : decoded.user_id
        }
    });
    if(!user) {
        throw new BaseError(404 , "User not found");
    }
    checkIfPasswordChanged(decoded , user);

    req.user = user;
    next();
}