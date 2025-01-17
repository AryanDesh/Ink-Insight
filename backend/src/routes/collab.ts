import { io } from "..";

export const sockets = () => {
  // Namespace for collaboration
  io.of('/collab').on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for clients joining a specific room
    socket.on("join-room", (roomId) => {
      console.log(`User ${socket.id} joined room: ${roomId}`);
      socket.join(roomId); // Add the socket to the room
    });

    // Listen for incoming messages
    socket.on("send-message", (updates, roomId) => {
      console.log(`Message received in room ${roomId}`);
      console.log(updates);

      // Broadcast the message to all other clients in the room
      socket.to(roomId).emit("receive-message", updates);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
