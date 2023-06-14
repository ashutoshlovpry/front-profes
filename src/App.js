import logo from './logo.svg';
import Home from './component/Home';
//import './App.css';
import {  Routes, Route,BrowserRouter } from 'react-router-dom';
import Login from './component/login';
import Chat from './component/chat';
import Profile from './component/profile';
import './style/app.scss'
import React, { Component }  from 'react';

function App() {
  return (
    <>
    {/* <BrowserRouter> */}
    <Routes>


    
      <Route path='login' element={<Login/>}></Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/chat' element={<Chat/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>

      </Routes>
      {/* </BrowserRouter> */}
    </>
        
  );
}

export default App;
