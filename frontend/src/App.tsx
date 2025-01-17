import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Landing from "./components/Landing";
import Topbar from "./components/Topbar";

export default function App() {
  const [roomId, setRoomId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null); // Correct ref for input field

  const navigate = useNavigate();

  const createRoom = () => {
    const newRoomId = `${Date.now()}`;
    setRoomId(newRoomId);
    navigate(`/room/${newRoomId}`);
  };

  const openEditor = () => {
    navigate(`/editor`);
  }
  const joinRoom = () => {
    const existingRoomId = inputRef.current?.value.trim(); // Safely access value
    if (existingRoomId) {
      setRoomId(existingRoomId);
      navigate(`/room/${existingRoomId}`);
    } else {
      alert("Please enter a valid room ID");
    }
  };

  return (
    <>
      <Topbar />
      <Landing />
      <button onClick={createRoom}>Create Room</button>
      <input type="text" placeholder="Enter room ID" ref={inputRef} /> {/* Correct ref binding */}
      <button onClick={joinRoom}>Join Room</button>
      <button onClick={openEditor}> Editor</button>

    </>
  );
}
