import React from 'react';
import './Header.css';

function Header({ title }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">{title}</h1>
      </div>
    </header>
  );
}

export default Header;
