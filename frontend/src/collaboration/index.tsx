import socket from "../lib/socket";
import React , {useEffect, useState} from "react";
import Editor from "../editor";
import { OutputData } from "@editorjs/editorjs";
import { editorContent, initialData } from "../store/Recoil";
import { useRecoilValue } from 'recoil';
import { useParams } from "react-router-dom";
import { eCollab } from "../editor";

export const CollabBlog: React.FC = () => {
  const { roomId } = useParams();
  const editorData= useRecoilValue(editorContent);
  const [receivedData, setReceivedData] = useState<OutputData>(initialData);
  const [collab, setCollab] = useState<eCollab>(eCollab.SENT);
  useEffect(() => {
    socket.connect();

    socket.emit("join-room", roomId);

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    socket.on("receive-message", (updates: OutputData) => {
      if (JSON.stringify(editorData) !== JSON.stringify(updates)) {
        setReceivedData(updates);
        setCollab(eCollab.RECEIVED);
        console.log(updates);
      }
    });
    return () => {
      socket.off("receive-message");
    };
  }, [editorData]);

  const sendMessage = () => {
    socket.emit("send-message", editorData, roomId);
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Collaborative Blog</h1>
      <p>Room ID: {roomId}</p>
      <Editor collab={collab} receivedData={receivedData} />
      <button
        className="px-4 py-2 rounded-sm bg-slate-600"
        onClick={sendMessage}
      >
        Save
      </button>
    </div>
  );
};
