//import { useEffect } from "react";
import axios from "axios";

import {BACKEND_HOST} from '../constant'
import { Link } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Navbar from "./navbar";

function Login(params) {

// useEffect(()=>{

// },[])
const navigate = useNavigate();

const login=async()=>{
  
  let email= document.getElementById("email").value
  let password= document.getElementById("password").value
  
  let data={}
  data.email=email
  data.password=password
  console.log("pp",process.env,data)
  axios.defaults.withCredentials = true;
  let res=await axios( BACKEND_HOST+'/login',{
   
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include',//same-origin', // include, *same-origin, omit
    withCredentials:true,


//     headers: {
//    "Content-Type": "application/json",
//       'Access-Control-Allow-Origin':'*',
//    'Access-Control-Allow-Methods':'*',
//        //'Content-Type': 'application/x-www-form-urlencoded',
//        "Access-Control-Allow-Credentials": true,
//    },
    mode: 'no-cors',
    data:data,
    //redirect: "follow", // manual, *follow, error
   // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //data: JSON.stringify(data),
  })
  console.log({res});
  //if(res.status===200){
    localStorage.setItem('id',res.data.user);
    localStorage.setItem('email',res.data.email)
    navigate('/chat')
    // <Link to="/chat"></Link>
 // }
  //document.cookie=`token =${res.data.token}`
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
              <button onClick={login} class="btn" className="btn btn-primary">Login</button>
          </div>
      </div>    
    
    
    </>
)
}
export default Login