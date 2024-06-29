import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-wrapper container">
        <NavLink to="/" className="logo-name">Quotes Central</NavLink>
        <nav className="main-nav">
          <ul className="main-nav-list">
            <li className="main-nav-item">
              <NavLink to="/" className="main-nav-link">Quotes</NavLink>
            </li>
            <li className="main-nav-item">
              <NavLink to="/add-quote" className="main-nav-link">Submit new quote</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;