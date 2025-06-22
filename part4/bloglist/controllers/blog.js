import Blog from '../models/Blog.js';
import express from 'express';


const blogRouter = express.Router();

blogRouter.get('/', async (req, res, next) => {
    try {
        const result = await Blog.find({});
        res.json(result)
    } catch (error) {
        next(error)
    }
})

blogRouter.post('/', async(req, res, next) => {
    try {
        const blog = new Blog({...req.body, likes: req.body.likes || 0});
        const result = await blog.save();
        res.status(201).json(result);
    } catch(err) {
        next(err);
    }
    
})


export default blogRouter