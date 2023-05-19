import React, { useEffect } from 'react';
import axios from "axios";

import {BACKEND_HOST} from '../constant'
import { io } from "socket.io-client";
import Navbar from "./navbar";
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';


function Home(params) {
   

    const navigate = useNavigate();


      
//         extraHeaders: {
//           "auth": document.cookie.token
//         }
//       });
//       console.log("ss",sockets);
//   socket.send('Hello Server!'); 
// }); 

// socket.addEventListener('message', function (event) { 
//   console.log('Message from server ', event.data); 
// });

// socket.addEventListener('close', function (event) { 
//   console.log('The connection has been closed'); 
// });
useEffect(()=>{
    const cookieValue = Cookies.get('token');
    if(cookieValue){
        navigate('/chat')
    }

},[])
const signUp=async()=>{
  let firstName= document.getElementById("firstName").value
  let lastName= document.getElementById("lastName").value
  let email= document.getElementById("email").value
  let password= document.getElementById("password").value
  let confirmPassword= document.getElementById("confirmPassword").value
  let profession=document.getElementById("profession").value
  let data={}
  data.name=firstName+lastName
  data.email=email
  data.password=password
  data.profession=profession
  console.log("pp",process.env,data)
  try {
  let res=await axios('/signup',{
   
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: 'same-origin', // include, *same-origin, omit
    //withCredentials:true,


    headers: {
   "Content-Type": "application/json",
      'Access-Control-Allow-Origin':'*',
   //'Access-Control-Allow-Methods':'*',
       //'Content-Type': 'application/x-www-form-urlencoded',
       "Access-Control-Allow-Credentials": true,
   },
    mode: 'cors',
    data:data,
    //redirect: "follow", // manual, *follow, error
   // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //data: JSON.stringify(data),
  })
  console.log({res});
}
  catch(error){
    console.log(error);
  }
  
}
return(
    <>
    <Navbar/>
     <div className="form">
          <div className="form-body">
              <div className="username">
                  <label className="form__label" for="firstName">First Name </label>
                  <input className="form__input" type="text" id="firstName" placeholder="First Name"/>
              </div>
              <div className="lastname">
                  <label className="form__label" for="lastName">Last Name </label>
                  <input  type="text" name="" id="lastName"  className="form__input"placeholder="LastName"/>
              </div>
              <div className="email">
                  <label className="form__label" for="email">Email </label>
                  <input  type="email" id="email" className="form__input" placeholder="Email"/>
              </div>
              <div className="password">
                  <label className="form__label" for="password">Choose Profession </label>
                  <select id ="profession">
                    <option value='student'>Student</option>
                    <option value='counsler'>Counsler</option>
                  </select>
              </div>
              <div className="password">
                  <label className="form__label" for="password">Password </label>
                  <input className="form__input" type="password"  id="password" placeholder="Password"/>
              </div>
              <div className="confirm-password">
                  <label className="form__label" for="confirmPassword">Confirm Password </label>
                  <input className="form__input" type="password" id="confirmPassword" placeholder="Confirm Password"/>
              </div>
          </div>
          <div class="footer">
              <button onClick={signUp} class="btn" className="btn btn-primary">Register</button>
          </div>
      </div>    
    
    
    </>
)
}
export default Home