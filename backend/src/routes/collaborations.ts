import { server } from '../index'
import { Server } from 'socket.io';

const io = new Server(server, {
    connectionStateRecovery: {},
    cors : {
      origin : "http://localhost:5173"
    }
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
  
    socket.on("send-message", (updates) => {
      updates.blocks?.map((block: { data: { text: any; }; }) => console.log(block.data.text))
      socket.broadcast.emit("receive-message", updates); 
    });
  
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
});