import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CollabBlog } from "./collaboration";
import Editor from "./editor";
import { Landing } from "./pages";
import { Topbar } from "./components";

export default function App() {

  return( 
    <div className="bg-primary-black min-h-screen flex items-center justify-center">
      <div className="bg-primary-off_white m-4 rounded-md w-[96vw] min-h-[96vh]">
        <Topbar></Topbar>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/room/:roomId" element={<CollabBlog />} />
            <Route path="/editor" element={<Editor />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )

}
