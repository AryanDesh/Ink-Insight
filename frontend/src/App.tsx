import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CollabBlog } from "./collaboration";
import { Blogging } from "./pages";
import { Landing } from "./pages";
import { Topbar } from "./components";

export default function App() {

  return( 
    
    <div className="bg-primary-black min-h-screen max-h-screen flex items-center justify-center">
      <div className="bg-primary-off_white m-10 rounded-md w-[96vw] min-h-[96vh] overflow-hidden">
        <Topbar></Topbar>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/room/:roomId" element={<CollabBlog />} />
            <Route path="/editor" element={<Blogging />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )

}
