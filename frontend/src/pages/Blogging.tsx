import './Blogging.scss';
import React, { useState } from 'react'
import Editor from '../editor';
const Blogging = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  
  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen)
  }

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen)
  }

  return (
    <div className="blogging-container">
        {/* Left Sidebar */}
        <aside 
        className={`sidebar sidebar-left ${
          leftSidebarOpen ? 'open' : 'closed'
        }`}
      >
        <h2>Basic Feature</h2>
        <h2>Other Drafts</h2>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <button 
          className="toggle-button toggle-left" 
          onClick={toggleLeftSidebar}
        >
          ☰
        </button>
        <button 
          className="toggle-button toggle-right" 
          onClick={toggleRightSidebar}
        >
          💬
        </button>
        <Editor></Editor>
      </main>

      {/* Right Sidebar */}
      <aside 
        className={`sidebar sidebar-right ${
          rightSidebarOpen ? 'open' : 'closed'
        }`}
      >
        <h2>Collab</h2>
        <div className="chatroom">
          <h3>chatroom</h3>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobile && (leftSidebarOpen || rightSidebarOpen) && (
        <div 
          className={`overlay ${
            leftSidebarOpen || rightSidebarOpen ? 'active' : ''
          }`}
          onClick={() => {
            setLeftSidebarOpen(false)
            setRightSidebarOpen(false)
          }}
        />
      )}
    </div>
  );
};

export default Blogging;
