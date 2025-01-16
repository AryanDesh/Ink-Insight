import { Request, Response } from "express";
import { db } from "../db";
import { Post } from "@prisma/client";
import { scheduleJob } from "node-schedule";
// Get all blogs
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await db.post.findMany({
      where: { status: "PUBLISHED" },
      include: { comments: true, likes: true },
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs." });
  }
};

interface userBlogs {
    post : Post,
    likes : number,
    comments : number
}
// Get user-centric blogs
export const getUserBlogs = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const blogs = await db.post.findMany({
      where: { ownerId: userId },
    });

    const data: userBlogs[] = await Promise.all(
        blogs.map(async (blog) => {
          const [likes, comments] = await Promise.all([
                db.like.count({ where: { postId: blog.id } }),
                db.comment.count({ where: { postId: blog.id } }),
            ]);
            return { post: blog, likes, comments };
        })
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user blogs." });
  }
};

// Create a blog
export const createBlog = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { title } = req.body;
  try {
    const blog = await db.post.create({
      data: { ownerId: userId!, title : title || "Untitled", status: "DRAFT" },
    });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog." });
  }
};

// Update a blog
export const updateBlog = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { blogId, title, content } = req.body;

  try {
    const blog = await db.post.update({
      where: { id: blogId, ownerId: userId },
      data: { title, content},
    });

    if (!blog) {
      res.status(404).json({ error: "Blog not found or unauthorized." });
      return 
    }

    res.json({ msg: "Blog updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog." });
  }
};

//delete a blog
export const deletePost = async (req: Request, res: Response) => {
    const { postId } = req.params;
  
    try {
      await db.post.delete({
        where: { id: parseInt(postId) },
      });
  
      res.json({ message: "Post deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete the post." });
    }
  };

// publish/draft

export const togglePostStatus = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const { status } = req.body;

    try {
        const updatedPost = await db.post.update({
        where: { id: parseInt(postId) },
        data: { status },
        });

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: "Failed to update the post status." });
    }
};


// schedule a publish
export const schedulePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { publishAt } = req.body;

  try {
    const post = await db.post.update({
      where: { id: parseInt(postId) },
      data: { publishAt: new Date(publishAt), status: "SCHEDULED" },
    });

    scheduleJob(new Date(publishAt), async () => {
      await db.post.update({
        where: { id: parseInt(postId) },
        data: { status: "PUBLISHED", publishedAt: new Date() },
      });
    });

    res.json({ message: "Post scheduled for publishing.", post });
  } catch (error) {
    res.status(500).json({ error: "Failed to schedule post publishing." });
  }
};
