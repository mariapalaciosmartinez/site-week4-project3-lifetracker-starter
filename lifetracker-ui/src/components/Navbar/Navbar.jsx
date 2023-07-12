import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar({ setAppState, appState }) {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("token") !== null;

  const logOutUser = () => {
    localStorage.removeItem("token");
    setAppState(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {loggedIn && (
          <>
            <li className="navbar-item">
              <Link to="/exercise" className="navbar-link">
                <button className="navbar-button">
                  <i>Exercise</i>
                </button>
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="navbar-link">
                <button className="navbar-button" onClick={logOutUser}>
                  <i>Logout</i>
                </button>
              </Link>
            </li>
          </>
        )}
        {!loggedIn && (
          <>
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
          </>
        )}
      </ul>
    </nav>
  );
}
