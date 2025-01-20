import { io , Socket } from 'socket.io-client';
import { OutputData } from '@editorjs/editorjs';
import { Params } from 'react-router-dom';

export type serverToClientEvent = {
    "receive-message" : (message: OutputData) => void
}

export type clienttoServerEvent = {
    "send-message" : (message: OutputData, roomId : Readonly<Params<string>>) => void;
}


const Socket_URL = import.meta.env.SOCKET_URL || "http://localhost:3000/collab";

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