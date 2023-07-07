import * as React from "react";
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import axios from "axios"
import jwtDecode from "jwt-decode"



import Landing from "../Landing/Landing";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import ActivityPage from "../ActivityPage/ActivityPage"

function App() {
  const [appState, setAppState] = useState({})
  const [token, setToken] = useState({});
  console.log(appState)

  async function handleUserInfo() {
    console.log('token value clientside is:', token)
    let userInfo = await axios.post('http://localhost:5174/auth/ActivityPage', {token})
    console.log(userInfo)
    if (userInfo) {
        setUser(userInfo.data)
    }
    return userInfo 
}

useEffect(() => {
    let existingToken = localStorage.getItem("token")
    if (existingToken) {
        const decodedToken = jwtDecode(existingToken);
        console.log(decodedToken)
        setAppState(decodedToken)
        setToken(existingToken)
        handleUserInfo()
    }
}, [token])

  return (
    <div className= "app">
      <BrowserRouter>
      <Routes>
        {/* <Route path="" element={<Navbar />} /> */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<LoginPage setAppState={setAppState} setToken={setToken} />} />
        <Route path="/auth/register" element={<RegistrationPage setAppState={setAppState}/>} />

        <Route path="/ActivityPage"
        element={<ActivityPage setAppState={setAppState} appState={appState} user={appState?.user} token={token}
        setToken={setToken}/>}
        />

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
