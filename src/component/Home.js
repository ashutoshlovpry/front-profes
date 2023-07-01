import React, { useEffect } from 'react';
import axios from "axios";

import {BACKEND_HOST} from '../constant'
import { io } from "socket.io-client";
import Navbar from "./navbar";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
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
        return ()=>{}
    }
    else{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              position => {
                
                const { latitude, longitude } = position.coords;
                localStorage.setItem('latitude',latitude)
                localStorage.setItem('longitude',longitude)
      
                  if(latitude===localStorage.getItem('latitude') || longitude===localStorage.getItem('latitude')){
                     // let res= await axios
      
                  }
                console.log("ppos",latitude,longitude);
              },
              error => {
                console.error('Error getting location:', error);
              }
            );
          } else {
            console.error('Geolocation is not supported by this browser.');
          }
    }
    return ()=>{}

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
  data.longitude=localStorage.getItem('longitude')
  data.latitude=localStorage.getItem('latitude')
 
  try {
  let res=await axios(BACKEND_HOST+'/signup',{
   
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
    
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Name</InputLabel>
        <Input id="component-simple" defaultValue="Composed TextField" />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Name</InputLabel>
        <Input
          id="component-helper"
          defaultValue="Composed TextField"
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text">
          Some important helper text
        </FormHelperText>
      </FormControl>
      <FormControl disabled variant="standard">
        <InputLabel htmlFor="component-disabled">Name</InputLabel>
        <Input id="component-disabled" defaultValue="Composed TextField" />
        <FormHelperText>Disabled</FormHelperText>
      </FormControl>
      <FormControl error variant="standard">
        <InputLabel htmlFor="component-error">Name</InputLabel>
        <Input
          id="component-error"
          defaultValue="Composed TextField"
          aria-describedby="component-error-text"
        />
        <FormHelperText id="component-error-text">Error</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput
          id="component-outlined"
          defaultValue="Composed TextField"
          label="Name"
        />
      </FormControl>
      <FormControl variant="filled">
        <InputLabel htmlFor="component-filled">Name</InputLabel>
        <FilledInput id="component-filled" defaultValue="Composed TextField" />
      </FormControl>
    </Box>
    </>
)
}
export default Home