import * as React from "react";
import { Link } from "react-router-dom";
import './navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/auth/login" className="navbar-link">
            <button className="navbar-button">
              <i>Login</i>
            </button>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/auth/register" className="navbar-link">
            <button className="navbar-button">
              <i>Register</i>
            </button>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/exercise" className="navbar-link">
            <button className="navbar-button">
              <i>Exercise</i>
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
