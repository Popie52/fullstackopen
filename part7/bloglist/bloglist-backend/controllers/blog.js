import Blog from "../models/Blog.js";
import express from "express";
import middleware from "../utils/middleware.js";

const blogRouter = express.Router();

blogRouter.get("/", async (req, res, next) => {
  try {
    const result = await Blog.find({})
      .populate("user", {
        username: true,
        name: true,
      })
    res.json(result);
  } catch (error) {
    next(error);
  }
});


blogRouter.post("/", middleware.userExtracter, async (request, res, next) => {
  if (!request.body.title || !request.body.author) {
    return res.status(400).json({ error: "Missing titleor author" });
  }

  try {
    const body = request.body;

    const user = request.user;

    if (!user) {
      return res.status(400).json({ error: "userId missing or not valid" });
    }

    const blog = new Blog({ ...body, likes: body.likes || 0, user: user._id });
    const result = await blog.save();
    const populatedBlog = await Blog.findById(result._id).populate("user", {
      username: 1,
      name: 1,
    });

    user.blogs = user.blogs.concat(blog._id);
    await user.save();
    res.status(201).json(populatedBlog);
  } catch (err) {
    next(err);
  }
});

blogRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Missing id" });
  }

  try {
    const details = req.body;

    const blog = await Blog.findByIdAndUpdate(id, details, {
      new: true,
      runValidators: true,
      context: "query",
    }).populate("user", { username: 1, name: 1 });
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ error: "blog not found" });
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", middleware.userExtracter, async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Missing id" });
  }
  try {
    const user = req.user;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "unauthorized: not your blog" });
    }

    const blogs = await Blog.findByIdAndDelete(id);
    if (blogs) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "blog not found" });
    }
  } catch (error) {
    next(error);
  }
});

export default blogRouter;
