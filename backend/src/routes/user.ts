import { Router } from "express";
import dotenv from 'dotenv';
import { db } from "../db";
import { User } from "@prisma/client";
import { object } from "zod";

type tUser = {
    email : string,
    password : string
};
export const userRouter = Router();

userRouter.post('/signin', async(req, res) => {
 
})

