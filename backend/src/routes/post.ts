import express from "express";
import { toggleLike, commentOnPost, getCommentsOnPost } from "../controller/postController";
import auth from "../middleware/auth";

const postRouter = express.Router();

postRouter.post("/like", auth, toggleLike);
postRouter.post("/comment", auth, commentOnPost);
postRouter.get("/comments", auth, getCommentsOnPost)
export default postRouter;
