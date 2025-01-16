import { Request, Response } from "express";
import {db}from "../db";

export const getUserInfo = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const user = await db.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
        res.status(404).json({ error: "User not found" });
      return 
    }

    const followersCount = await db.follower.count({ where: { followingId: userId } });
    const followingCount = await db.follower.count({ where: { followerId: userId } });

    res.json({ user, followersCount, followingCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user info" });
  }
};

export const toggleFollow = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { targetId } = req.body;

  if (userId === targetId) {
    res.status(400).json({ error: "You cannot follow yourself." });
    return
  }

  try {
    const existingFollow = await db.follower.findFirst({
      where: { followerId: userId, followingId: targetId },
    });

    if (existingFollow) {
      await db.follower.delete({ where: { id: existingFollow.id } });
      res.json({ msg: "Unfollowed successfully." });
      return 
    } else {
      await db.follower.create({
        data: { followerId: userId!, followingId: targetId! },
      });
      res.json({ msg: "Followed successfully." });
      return
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle follow." });
  }
};

// update user details.
export const updateUserDetails = async (req: Request, res: Response) => {
  const userId = req.userId;
  const { penName, email, password } = req.body;

  try {
    if (!penName && !email && !password) {
      res.status(400).json({ error: "No fields to update provided." });
      return 
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        ...(penName && { penName }),
        ...(email && { email }),
        ...(password && { password }),
      },
    });

    res.json({ message: "User details updated successfully.", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user details." });
  }
};