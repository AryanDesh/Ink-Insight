import socket from "../lib/socket";
import React , {useEffect, useState} from "react";
import Editor from "../editor";

export const CollabBlog: React.FC = () => {
    const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
    const [sentMessages, setSentMessages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        socket.connect();

        socket.on("receive-message" ,(message : string) => {
            setReceivedMessages((prevMessages) => [...prevMessages, message]);
        })
        return () =>{
            socket.disconnect();
        };
    },[]);

    const sendMessage   = () =>{
        if(message.trim()) {
            socket.emit("send-message", message);
            setSentMessages((prevMessages) => [...prevMessages, message]);
            setMessage("");
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Collaborative Blog</h1>
          <div className="border border-gray-300 rounded-md p-4 w-full max-w-md h-64 overflow-y-scroll bg-white shadow">
            {receivedMessages.map((msg, index) => (
              <p key={index} className="text-gray-700 text-sm mb-1">
                {msg} 
              </p>
            ))}
          </div>
          <div className="border border-gray-300 rounded-md p-4 w-full max-w-md h-64 overflow-y-scroll bg-white shadow">
            {receivedMessages.map((msg, index) => (
              <p key={index} className="text-gray-700 text-sm mb-1">
                {msg} 
              </p>
            ))}
          </div>
          <div className="mt-4 flex w-full max-w-md">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition"
            >
              Send
            </button>
          </div>
        </div>
    );      
}