import { Link, useNavigate } from "react-router-dom"
import moment from "moment"

export default function ActivityPage({ user, setAppState }) {
  const navigate = useNavigate()
  const isAuthenticated = Boolean(user?.email)

//   const handleOnLogout = () => {
//     setAppState({})
//     navigate("/")
//   }

  const title = isAuthenticated ? "Appointment Confirmed" : "Please login to the portal to see your appointment."

//   const content = isAuthenticated ? (
//     <>
//       <p className="appt">Your appointment is on {moment().calendar(new Date(user.date))}</p>
//       <p className="location">
//         Please head to <strong>{user.location}</strong> on that day.
//       </p>
//     </>
//   ) : (
//     <p className="appt">Thank you!</p>
//   )

  return (
    <div className="Portal">
      <div className="content">
        {isAuthenticated ? <h1>Welcome, {user.firstName}!</h1> : null}
      </div>
    </div>
  )
}