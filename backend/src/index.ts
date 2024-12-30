import express from 'express';
import cors from 'cors';

import { userRouter } from './routes/user';
import { blogRoute } from './routes/blog';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const Port = process.env.PORT || 3000;

app.use(express.json())

app.use(cors())

app.use('/api/v1/user', userRouter )
app.use('/api/v1/blog', blogRoute)

app.listen(Port, () => console.log("Running on port :" + Port))