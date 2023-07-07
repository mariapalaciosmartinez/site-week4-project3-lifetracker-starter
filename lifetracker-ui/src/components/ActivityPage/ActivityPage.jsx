import { Link, useNavigate } from "react-router-dom"
// import moment from "moment"

import "./ActivityPage.css"

export default function ActivityPage({ user, setAppState }) {
  const navigate = useNavigate()
  const isAuthenticated = Boolean(user?.email)

  const handleOnLogout = () => {
    setAppState({})
    navigate("/")
  }

  console.log(user);

  const title = isAuthenticated ? "Appointment Confirmed" : "Please login to the ActivityPage to see your appointment."

  const content = isAuthenticated ? (
    <>
      <p className="appt">Your appointment is on</p>
      <p className="location">
        Please head to on that day.
      </p>
    </>
  ) : (
    <p className="appt">Thank you!</p>
  )

  const button = isAuthenticated ? (
    <button className="btn primary" onClick={handleOnLogout}>
      Logout
    </button>
  ) : (
    <Link to="/auth/login">
      <button className="btn primary">Login</button>
    </Link>
  )

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
        </div>
      </div>
    </div>
  )
}