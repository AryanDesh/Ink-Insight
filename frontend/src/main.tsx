import { createRoot } from 'react-dom/client'
import './index.css'
import { RecoilRoot } from "recoil";
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CollabBlog } from './collaboration/index.tsx';
import Editor from './editor/index.tsx';

createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/room/:roomId" element={<CollabBlog />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  </RecoilRoot>,
)
