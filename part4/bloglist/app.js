import express from "express";
import blogRouter from "./controllers/blog.js";
import config from "./utils/config.js";
import middleware from "./utils/middleware.js";
import mongoose from "mongoose";
import cors from 'cors';

const app = express();

(async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); 
    }
})();

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app