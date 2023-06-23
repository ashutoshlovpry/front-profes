import logo from './logo.svg';
import Home from './component/Home';
//import './App.css';
import {  Routes, Route,BrowserRouter } from 'react-router-dom';
import Login from './component/login';
import Chat from './component/chat';
import Profile from './component/profile';
import Map from './component/map';
import './style/app.scss'
import React, { Component }  from 'react';
import { useEffect } from "react";
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";
import FirestoreSaveComponent from './component/firebase';
function App() {
 
    async function requestPermission() {
      const permission = await Notification.requestPermission();
      
      if (permission === "granted") {
        // Generate Token
        console.log("grnt")
        const token = await getToken(messaging, {
          vapidKey:
            "BLzowO5w_i1oMU_SzbHnw14STHGUv9Br5bzkDYceKiqTeTeZMVOoI_4RqDmgkRK1scgjkTcd1CezUE-koKoB0g8",
        });
        localStorage.setItem("firebase",token)
        console.log("Token Gen", token);
        // Send this token  to server ( db)
      } else if (permission === "denied") {
        
        alert("You denied for the notification");
      }
    }
  
    useEffect(() => {
      // Req user for notification permission
      requestPermission();
    }, []);
  return (
    <>
    {/* <BrowserRouter> */}
    <Routes>


    
      <Route path='login' element={<Login/>}></Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/chat' element={<Chat/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/map' element={<Map/>}></Route>
      <Route path='/fs' element={<FirestoreSaveComponent/>}></Route>
      </Routes>
      {/* </BrowserRouter> */}
    </>
        
  );
}

export default App;
