//import { useEffect } from "react";
import axios from "axios";
import  { useEffect, useState } from 'react';
import {BACKEND_HOST} from '../constant'
import { Link } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Navbar from "./navbar";
import React, { Component }  from 'react';
import {userDetails} from '../redux/actions/userDetails'
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
//import { useHistory } from 'react-router-dom';

function Login(params) {
    const [location, setLocation] = useState(null);
    const dispatch=useDispatch()
    let selector=(state)=> state

let state=useSelector(selector)
console.log("d",state);

// useEffect(() => {
//  return ()=>{

//  }
//   }, []);
const navigate = useNavigate();
//const history = useHistory();

const loginUser=async()=>{
  try{
  let email= document.getElementById("email").value
  let password= document.getElementById("password").value
  
  let data={}
  data.email=email
  data.password=password
  data.latitude=localStorage.getItem('latitude')
  data.longitude=localStorage.getItem('longitude')
  console.log("pp",process.env,data)
  axios.defaults.withCredentials = true;
  let res=await axios(BACKEND_HOST+'/login',{
    method: "POST", 
    cache: "no-cache", 
    withCredentials:true,
   headers: {
   //"Content-Type": "application/json",
   'Access-Control-Allow-Methods':'GET,OPTIONS,PATCH,DELETE,POST,PUT',
       'Access-Control-Allow-Origin':'http://localhost:3001, https://front-profes.vercel.app, https://new-prof.onrender.com , http://localhost:8000',
       "Access-Control-Allow-Credentials": true,
   },
//     mode: 'no-cors',
    data:data,
    //redirect: "follow", // manual, *follow, error
   // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //data: JSON.stringify(data),
  })
  
  console.log({res});

  dispatch(userDetails(res.data))
  
  //if(res.status===200){
    localStorage.setItem('id',res.data.user._id);
    localStorage.setItem('email',res.data.user.email)
    //history.push('/dashboard');
    navigate('/dashboard')
}
catch(e){
    console.log(e);
}
}
return(
    <>
    <Navbar/>
     <div className="form">
          <div className="form-body">
              
              <div className="email">
                  <label className="form__label" for="email">Email </label>
                  <input  type="email" id="email" className="form__input" placeholder="Email"/>
              </div>
              <div className="password">
                  <label className="form__label" for="password">Password </label>
                  <input className="form__input" type="password"  id="password" placeholder="Password"/>
              </div>
             
          </div>
          <div class="footer">
              <button onClick={loginUser} class="btn" className="btn btn-primary">Login</button>
          </div>
      </div>    
    
    
    </>
)
}
export default Login