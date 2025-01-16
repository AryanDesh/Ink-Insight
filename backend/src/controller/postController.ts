import { Request, Response } from "express";
import { db } from "../db";

// Like or dislike a post
export const toggleLike = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { postId } = req.body;

  if(!userId || !postId ) {
    res.status(404).json({ msg : "no such post found"});
    return;
  }
  try {
    const existingLike = await db.like.findFirst({
      where: { userId, postId },
    });

    if (existingLike) {
      await db.like.delete({ where: { id: existingLike.id } });
      res.status(200).json({ msg: "Post unliked successfully." });
      return 
    } else {
      await db.like.create({ data: { userId, postId } });
      res.status(200).json({ msg: "Post liked successfully." });
      return 
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle like." });
  }
};

// Comment on a post
export const commentOnPost = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { postId, content } = req.body;

  if(!userId || !postId ) {
    res.status(404).json({ msg : "no such post found"});
    return;
  }
  try {
    const comment = await db.comment.create({
      data: { userId, postId, content },
    });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to comment on post." });
  }
};

//all Comments on post
export const getCommentsOnPost = async (req: Request, res: Response) => {
    const { postId } = req.params;
  
    try {
      const comments = await db.comment.findMany({
        where: { postId: parseInt(postId) },
        include: { user: true },
      });
  
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments for the post." });
    }
  };