import express from "express";
import Comment from "../models/Comments.js";
import Blog from "../models/Blog.js";
const commentRouter = express.Router();

commentRouter.get("/:id/comments", async (req, res, next) => {
  try {
    const comments = await Comment.find({ blog: req.params.id });
    res.json(comments); 
  } catch (error) {
    next(error);
  }
});

commentRouter.post("/:id/comments", async (req, res) => {
  const { comment } = req.body;
  const blogId = req.params.id;

  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }

  const newComment = new Comment({
    comment,
    blog: blog._id,
  });
  const savedComment = await newComment.save();
  res.status(201).json(savedComment);
});

export default commentRouter;
