import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import "./ActivityPage.css";

export default function ActivityPage({ user, setAppState }) {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(user?.email);
  const [averageDuration, setAverageDuration] = useState(0);

  const handleOnLogout = () => {
    navigate("/");
    localStorage.removeItem("token")
    setAppState(null)
    window.location.reload();
  };

  useEffect(() => {
    const fetchAverageDuration = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5173/auth/ActivityPage/average-duration/${user.id}`,
          {
            params: { user_id: user.id },
          }
        );
        setAverageDuration(res.data.averageDuration);
      } catch (err) {
        console.error("Failed to fetch average duration", err);
      }
    };
    fetchAverageDuration();
  }, []);  

  const title = isAuthenticated ? "" : "Please login to the Activity Page to see your information.";

  const content = isAuthenticated ? (
    <>
      <p>Hello, you have logged in and can view this Activity Page.</p>
      <br />
      <p>Please refer to the navbar to explore your exercise page or to end your session!</p>
    </>
  ) : (
    <p className="appt">Thank you!</p>
  );

  const button = isAuthenticated ? (
    <button className="btn primary" onClick={handleOnLogout}>
      Logout
    </button>
  ) : (
    <Link to="/auth/login">
      <button className="btn primary">Login</button>
    </Link>
  );

  const averageTime = isAuthenticated ? (
    <p>Average Exercise Duration: {averageDuration} min</p>
  ) : (
    <Link to="/auth/login">
      <button className="btn primary">Login</button>
    </Link>
  );

  return (
    <div className="ActivityPage">
      <div className="content">
        {isAuthenticated ? <h1>Welcome, {user.firstName}!</h1> : null}
        <div className="card">
          <div className="header">
            <div className={`title ${isAuthenticated ? "green" : ""}`}>{title}</div>
          </div>
          <div className="content">{content}</div>
          <div className="footer">{button}</div>
          <div className="averageTime">{averageTime}</div>
        </div>
      </div>
    </div>
  );
}
