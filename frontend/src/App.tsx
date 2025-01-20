import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CollabBlog } from "./collaboration";
import { Blogging } from "./pages";
import { Landing } from "./pages";
import { Topbar } from "./components";
import './App.css';

export default function App() {
  return (
    <div className="bg-primary-black">
      <div className="bg-primary-off_white">
        <Topbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/room/:roomId" element={<CollabBlog />} />
            <Route path="/editor" element={<Blogging />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
