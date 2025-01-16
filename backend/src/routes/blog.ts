import express from "express";
import { getAllBlogs, getUserBlogs, createBlog, updateBlog, deletePost, togglePostStatus, schedulePost } from "../controller/blogController";
import auth from "../middleware/auth";

const blogRouter = express.Router();

blogRouter.get("/all", getAllBlogs);
blogRouter.get("/user", auth, getUserBlogs);
blogRouter.post("/create", auth, createBlog);
blogRouter.put("/update", auth, updateBlog);
blogRouter.delete("/delete", auth, deletePost);
blogRouter.post("/status", auth, togglePostStatus);
blogRouter.post("/schedule", auth, schedulePost)

export default blogRouter;
