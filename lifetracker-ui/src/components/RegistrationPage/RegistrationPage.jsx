import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

export default function Signup({setAppState}) {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
  })

  /**Checks if inputs are valid*/
  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Password's do not match" }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setErrors((e) => ({ ...e, passwordConfirm: "Password's do not match" }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  /**Preforms form validation */
  const handleOnSubmit = async () => {
    setErrors((e) => ({ ...e, form: null }))

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
      return
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }))
    }

    try {
      console.log("0")
      const res = await axios.post("http://localhost:5173/auth/register", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        username: form.username,
      })
      console.log("1")

      if (res?.data?.user) {
        setAppState(res.data)
        console.log("2")
        //render hello name
        navigate("/ActivityPage")
      } else {
        setErrors((e) => ({ ...e, form: "Something went wrong with registration" }))
      }
    } catch (err) {
      console.log(err)
      const message = err?.response?.data?.error?.message
      setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
    }
  }

    return (
      <div className="registration-page">
            <div className="input-field">
              <label htmlFor="name">First Name    </label>
              <input
                type="text"
                name="firstName"
                placeholder="Jane"
                value={form.firstName}
                onChange={handleOnInputChange}
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div className="input-field">
              <label htmlFor="name">Last Name   </label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={form.lastName}
                onChange={handleOnInputChange}
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
            <div className="input-field">
            <label htmlFor="email">Email    </label>
            <input
              type="email"
              name="email"
              placeholder="enter email here"
              value={form.email}
              onChange={handleOnInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="username">Username    </label>
            <input
              type="username"
              name="username"
              placeholder="username"
              value={form.username}
              onChange={handleOnInputChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="password">Password    </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="passwordConfirm">Confirm Password   </label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="confirm password"
              value={form.passwordConfirm}
              onChange={handleOnInputChange}
            />
            {errors.passwordConfirm && <span className="error">{errors.passwordConfirm}</span>}
          </div>
          <button className="btn" onClick={handleOnSubmit}>
            {"Create Account"}
          </button>
      </div>
    );
}