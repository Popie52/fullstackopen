import express from "express";
import blogRouter from "./controllers/blog.js";
import config from "./utils/config.js";
import middleware from "./utils/middleware.js";
import mongoose from "mongoose";
import cors from 'cors';
import userRouter from "./controllers/user.js";
import loginRouter from "./controllers/login.js";
import testRouter from "./controllers/testing.js";
import 'dotenv/config.js';
import commentRouter from "./controllers/comment.js";

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
app.use(middleware.tokenExtracter);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', commentRouter)
if(process.env.NODE_ENV === 'test') {
    app.use('/api/testing', testRouter);
}


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app