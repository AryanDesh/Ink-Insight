import express from "express";
import { getUserInfo, toggleFollow, updateUserDetails } from "../controller/userController";
import auth from "../middleware/auth";

const userRouter = express.Router();

userRouter.get("/info", auth, getUserInfo);
userRouter.post("/follow", auth, toggleFollow);
userRouter.put("/update", updateUserDetails);

export default userRouter;