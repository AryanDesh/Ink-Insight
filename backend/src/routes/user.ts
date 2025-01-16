import express from "express";
import { getUserInfo, toggleFollow } from "../controller/userController";
import auth from "../middleware/auth";

const userRouter = express.Router();

userRouter.get("/info", auth, getUserInfo);
userRouter.post("/follow", auth, toggleFollow);

export default userRouter;
