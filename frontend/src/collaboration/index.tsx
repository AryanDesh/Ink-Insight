import socket from "../lib/socket";
import React , {useEffect, useRef, useState} from "react";
import Editor from "../editor";
import { OutputData } from "@editorjs/editorjs";
import { editorContent } from "../store/Recoil";
import { useRecoilState, useRecoilValue } from 'recoil';


export const CollabBlog: React.FC= () => {

  const [editorData, setEditorData] = useRecoilState(editorContent);
    useEffect(() => {
        socket.connect();
        
        //@ts-ignore
        socket.on("receive-message" ,(updates: OutputData) => {
          setEditorData(updates);
        })
        return () =>{
            socket.disconnect();
        };
    },[]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Collaborative Blog</h1>
          <Editor collab = {true} receivedData={editorData}></Editor>
          <button className="px-4 py-2 rounded-sm bg-slate-600 " onClick={() => {
                const sendMessage   = () =>{
                  //@ts-ignore
                  socket.emit("send-message", editorData);
                }
                sendMessage();
          }}>Save</button>
        </div>
    );      
}