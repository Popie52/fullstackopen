import { Query } from 'mongoose';
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
    if(!req.body.title || !req.body.author) {
        return res.status(400).json({error: "Missing titleor author"});
    }

    try {
        const blog = new Blog({...req.body, likes: req.body.likes || 0});
        const result = await blog.save();
        res.status(201).json(result);
    } catch(err) {
        next(err);
    }
    
})

blogRouter.put("/:id", async(req, res, next) => {
    const id = req.params.id;
    if(!id) {
        return res.status(400).json({error: "Missing id"});
    }
    const details = req.body;

    try {
        const blog = await Blog.findByIdAndUpdate(id, details, { new: true, runValidators: true, context: 'query' });
        if(blog) {
            res.status(200).json(blog);
        } else {
            res.status(404).json({error: "blog not found"})
        }
    } catch (error) {
        next(error);
    }
})


blogRouter.delete('/:id', async(req, res, next) => {
    const id = req.params.id;
    if(!id) {
        return res.status(400).json({error: "Missing id"});
    }
    try {
        const blogs = await Blog.findByIdAndDelete(id);
        if(blogs) {
            res.status(204).end();
        } else {
            res.status(404).json({error: "blog not found"})
        }
    } catch (error) {
        next(error);
    }
})



export default blogRouter