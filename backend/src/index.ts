import { userRouter } from './routes/user';
import { blogRoute } from './routes/blog';
import bodyParser from 'body-parser'
import cors from 'cors';
import express  from "express";
import dotenv from 'dotenv';
import { createServer } from 'node:http';
import {Server } from 'socket.io';

dotenv.config();
export const Port = process.env.PORT || 3000;
export const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.use('/api/v1/user', userRouter )
app.use('/api/v1/blog', blogRoute)

const server = createServer(app);

const io = new Server(server, {
    connectionStateRecovery: {}
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
  
    socket.on("send-message", (message: string) => {
      console.log(`Message received: ${message}`);
      socket.broadcast.emit("receive-message", message); 
    });
  
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(Port, () => console.log("Running on port :" + Port))