import userRouter from './routes/user';
import blogRouter from './routes/post';
import bodyParser from 'body-parser'
import cors from 'cors';
import express  from "express";
import dotenv from 'dotenv';
import { createServer } from 'node:http';
import signupRouter from './routes/signup';
import loginRouter from './routes/login';
dotenv.config();
const Port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.use('/api/v1/signup', signupRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/user', userRouter );
app.use('/api/v1/blog', blogRouter);

export const server = createServer(app);

server.listen(Port, () => console.log("Running on port :" + Port))