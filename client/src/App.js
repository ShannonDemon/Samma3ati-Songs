import React from 'react'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './Login';
import Dashboard from './Dashboard';
import axios from 'axios';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/user/Signup'
import Signin from './components/user/Signin'
import NavBar from './components/NavBar/NavBar';



const code = new URLSearchParams(window.location.search).get('code')
console.log(code)

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    let token = localStorage.getItem("token");

    if(token != null){
      let user = jwt_decode(token);

      if(user){
        setIsAuth(true);
        setUser(user)
      }
      else if(!user){
        localStorage.removeItem("token");
        setIsAuth(false);
      }
    }
  }, [])
  

  const registerHandler = (user) => {
    axios.post("http://localhost:3001/users", user)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err)
    });
  }

  const loginHandler = (cred) => {
    axios.post("http://localhost:3001/auth/signin", cred)
    .then(res => {
      console.log(res.data.token)

      // Store the token in Local Storage.
      if(res.data.token != null){
        localStorage.setItem("token", res.data.token);
        let user = jwt_decode(res.data.token);
        setIsAuth(true);
        setUser(user);
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const onLogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
  }
  return (
    <>
    <Router>
      <NavBar onLogoutHandler={onLogoutHandler} isAuth={isAuth} user={user}/>
      <Routes>
        <Route path='/home' element={code ? <Dashboard code ={code} />: <Signin login={loginHandler}></Signin>} />
        <Route path='*' element={<Dashboard code ={code} />} />

        <Route path="/signup" element={<Signup register={registerHandler}></Signup>}></Route>
        <Route path="/signin" element={isAuth ? <Login></Login> : <Signin login={loginHandler}></Signin>}></Route>
        <Route path="/dashboard" element={code ? <Dashboard code ={code} /> : <Signup register={registerHandler} />}></Route>
      </Routes>
    

    </Router></>
  )
}

export default App
