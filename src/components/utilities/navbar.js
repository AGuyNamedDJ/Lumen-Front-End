import React from 'react';
import { Link } from 'react-router-dom';

const navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/research">Research</Link>
        </li>
        <li className="nav-item">
          <Link to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link to="/company">Company</Link>
        </li>
      </ul>
    </nav>
  );
};

export default navbar;
