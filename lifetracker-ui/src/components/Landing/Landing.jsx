import * as React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing">
      <div className="content-container">
        <h1>LifeTracker</h1>
        <p>Helping you take back control of your world.</p>
        <img src="https://lifetracker-ui-ai8e.onrender.com/assets/tracker-2a96bfd0.jpg" alt="LifeTracker" />
      </div>
      <div className="button-container">
        <Link to={`/auth/login`}>
          <button className="Login">
            <i>Login</i>
          </button>
        </Link>
        <Link to={`/auth/register`}>
          <button className="Register">
            <i>Register</i>
          </button>
        </Link>
      </div>
    </div>
  );
}
