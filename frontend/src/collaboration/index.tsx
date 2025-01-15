import socket from "../lib/socket";
import React , {useEffect, useRef, useState} from "react";
import Editor from "../editor";
import { tEditorData } from "../lib/types";

export const initialData =  () : tEditorData => {
  return {
    "time" : new Date().getTime(),
    "blocks" : [
      {
        "type" : "header",
        "data" : {
          "text" : "...",
          "level" : 1
        } 
      }
    ]
  }
}

type t = Partial<tEditorData>
export const CollabBlog: React.FC = () => {
    const [editorData, setEditorData ] = useState<t>(initialData);
    
        // const [changes, setChanges] = useState<string>("");
    // Get an algorithm to showcase current changes


    useEffect(() => {
        socket.connect();
        
        socket.on("receive-message" ,(updates: t) => {
          setEditorData(updates);
        })
        return () =>{
            socket.disconnect();
        };
    },[]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Collaborative Blog</h1>
          <Editor editorData={editorData} setEditorData={setEditorData}></Editor>
          <button className="px-4 py-2 rounded-sm bg-slate-600 " onClick={() => {
                const sendMessage   = () =>{
                  socket.emit("send-message", editorData);
                }
                sendMessage();
          }}>Save</button>
        </div>
    );      
}