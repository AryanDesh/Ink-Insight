import { createRoot } from 'react-dom/client'
import './index.css'
import { StrictMode } from 'react';
import { RecoilRoot } from "recoil";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>
)
