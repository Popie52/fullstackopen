import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import 'dotenv/config';

const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;
    console.log(password);
    const user = await User.findOne({username});
    console.log(user.passwordHash);
    const passwordCorrect = user === null? false: await bcrypt.compare(password, user.passwordHash);
    
    if(!(passwordCorrect && user)){
        return res.status(401).json({
            error: "invalid username or password"
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET_KEY)
    res.status(200).send({token, username: username, name: user.name})


})

export default loginRouter