import React from 'react';
import './Topbar.css'
const Topbar : React.FC = () => {
  return (
    <div className="navbar">
  <div className="navbar-logo">  
    INK & INSIGHT
  </div>
  <div className="navbar-buttons">
    <button className="navbar-button">Indulge</button>
    <button className="navbar-button">Profile</button>
  </div>
</div>

  );
};

export default Topbar;