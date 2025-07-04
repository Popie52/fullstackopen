import express from 'express';
import User from '../models/User.js';
import Blog from '../models/Blog.js'

const testRouter = express.Router();

testRouter.post('/reset', async (req, res) => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    res.status(204).end()
})

export default testRouter