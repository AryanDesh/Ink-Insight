import { io , Socket } from 'socket.io-client';

export type serverToClientEvent = {
    "receive-message" : (message: string) => void
}

export type clienttoServerEvent = {
    "send-message" : (message: string) => void;
}

const Socket_URL = "http://localhost:3000";

const socket : Socket<serverToClientEvent, clienttoServerEvent> = io(Socket_URL, {
    transports: ["websocket"],
    autoConnect: false
});

socket.on("connect", () => {
    console.log("Connected to Socket.IO server");
});

socket.on("disconnect", () => {
    console.log("Disconnected from Socket.IO server");
});

export default socket;