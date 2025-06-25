import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const userRouter = express.Router();

userRouter.get('/', async(req, res) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1});
    res.json(users);
})

userRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;
  if (!username || !password || !name) {
    return res
      .status(400)
      .json({ error: "missing username or password or name" });
  }

  if(username.length < 3 || password.length < 3) {
    return res.status(400).json({error:"username and password must be more then 3 in length"})
  }
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

export default userRouter;
