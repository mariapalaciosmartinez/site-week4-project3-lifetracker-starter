import * as React from "react";
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import axios from "axios"
import jwtDecode from "jwt-decode"



import Landing from "../Landing/Landing";
import LoginPage from "../LoginPage/LoginPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import ActivityPage from "../ActivityPage/ActivityPage";
import ExercisePage from "../ExercisePage/ExercisePage"
import ExerciseForm from "../ExerciseForm/ExerciseForm";
import Navbar from "../Navbar/Navbar";

function App() {
  const [appState, setAppState] = useState({
    user: null
  })
  const [token, setToken] = useState({});
  const [userInfo, setUser] = useState({});
  console.log(appState)

  async function handleUserInfo() {
    console.log('token value clientside is:', token)
    let userInfo = await axios.post('http://localhost:5173/auth/ActivityPage', {token})
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
        <Route path="/" element={<><Navbar appState={appState} setAppState={setAppState}/><Landing /></>} />
        <Route path="/auth/login" element={<><Navbar appState={appState} setAppState={setAppState}/><LoginPage setAppState={setAppState} setToken={setToken} /></>} />
        <Route path="/auth/register" element={<><Navbar appState={appState} setAppState={setAppState}/><RegistrationPage setAppState={setAppState}/></>} />
        <Route path="/exercise" element={<><Navbar appState={appState} setAppState={setAppState}/><ExercisePage user={appState.user}/></>} />
        <Route path="/exercise/create" element={<><Navbar appState={appState} setAppState={setAppState}/><ExerciseForm user={appState.user}/></>} />


        <Route path="/ActivityPage"
        element={<><Navbar appState={appState} setAppState={setAppState}/><ActivityPage
        setAppState={setAppState}
        appState={appState}
        user={appState.user}
        setToken={setToken}
      /></>}/>

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
