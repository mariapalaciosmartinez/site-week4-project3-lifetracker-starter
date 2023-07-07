import { useState, useEffect  } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

import jwtDecode from "jwt-decode"

export default function Login({ setAppState, setToken }) {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setErrors((e) => ({ ...e, form: null }))

    try {
      const res = await axios.post(`http://localhost:5173/auth/login`, form)
      if (res?.data) {

        localStorage.setItem("token", res.data.token)
        console.log('token below!')
        console.log(res.data.token)
        setToken(res.data.token)
        // navigate('/profile')
        console.log(res.data.token)
        const decodedToken = jwtDecode(res.data.token);
        console.log(decodedToken)
        setAppState(decodedToken)
        navigate("/ActivityPage")
      } else {
        setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
      }
    } catch (err) {
      console.log(err)
      const message = err?.response?.data?.error?.message
      setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
    }
  }

  return (
    <div className="Login">
      <div className="card">
        <h2>Login to the Activity Page</h2>
        {Boolean(errors.form) && <span className="error">{errors.form}</span>}
        <br />
        <div className="form">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="user@gmail.com"
              value={form.email}
              onChange={handleOnInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button className="btn" onClick={handleOnSubmit}/>
        </div>

        <div className="footer">
          <p>
            Don't have an account? Sign up <Link to="/auth/register">here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}