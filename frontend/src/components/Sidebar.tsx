import React, { ReactNode, useState } from "react";
import "./Sidebar.css"; // Assuming you move the styles to a separate CSS file
import { ChevronFirst, ChevronLast, MoreVertical } from 'lucide-react';
import { sidebarExpanded } from "../store/Recoil";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";

interface SidebarProps {
  children : ReactNode
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [expanded, setExpanded] = useRecoilState(sidebarExpanded);


  return (
    <aside className={`wrapper-sidebar ${
    expanded? 
    "wrapper-expand"
    : "wrapper-contract"
    }`}>
      <nav className="nav-sidebar">
        <div className="outer-div-sidebar">
          <img src="../../public/logoipsum-338.svg" alt="image" className={`logo-sidebar ${
            expanded?  "ls-show" :
            "ls-hidden"
          }` } />
          <button className="button-sidebar" onClick= {()=> {
            setExpanded(cur => !cur)
          }}>
            {expanded? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <ul className='ul-sidebar'>{children} </ul>
        <div className="div-bottom-sidebar">
          <img src="../../public/vite.svg" alt="" className="avatar-sidebar" />
          <div className={`div-inner-sidebar ${
            expanded ?  "dis-show" :
            "dis-hidden"
          }` }>
            <div className="div-end-sidebar">
              <h4 className="name-sidebar">Aryan Deshmukh</h4>
              <span className="email-sidebar">adeshmukh843@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;


interface SidebarItemsProps {
  icon: ReactNode; 
  text: string; 
  active?: boolean;
  alert?: boolean; 
}

export const SidebarItems : React.FC<SidebarItemsProps>= ({icon, text, active, alert}) =>{
  const expanded = useRecoilValue(sidebarExpanded);
  return(
    <li className={`li-sbi ${
      active
        ? "bg-gradient-to-tr text-indigo-800"
        : "hover:bg-indigo-50 text-gray-6"
    }`}>
      {icon}
      <span className={`text-sbi ${
      expanded? 
      "text-sbi-show" 
      : "text-sbi-hidden"
        }`}>{text}</span>
      {alert && <div className="alert-sbi"></div>}
    </li>
  )
}