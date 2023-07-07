import logo from './logo.svg';
import Home from './component/Home';
//import './App.css';
import {  Routes, Route,BrowserRouter } from 'react-router-dom';
import Login from './component/login';
import Chat from './component/chat';
import Profile from './component/profile';
import Map from './component/map';
import Dashboard from './component/dashboard';
import './style/app.scss'
import React, { Component }  from 'react';
import { useEffect } from "react";

import FirestoreSaveComponent from './component/firebase';
import AddFileButton from './component/uploadFIle'

function App() {
 
    
    useEffect(() => {
      // Req user for notification permission
     // requestPermission();
    }, []);
  return (
    <>
    {/* <BrowserRouter> */}
    <Routes>


    <Route path="/upload" element={<AddFileButton/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/chat' element={<Chat/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/map' element={<Map/>}></Route>
      <Route path='/fs' element={<FirestoreSaveComponent/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
      {/* </BrowserRouter> */}
    </>
        
  );
}

export default App;
