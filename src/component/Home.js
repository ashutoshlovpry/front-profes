import React, { useEffect } from 'react';
import axios from "axios";

import { BACKEND_HOST } from '../constant'
import { io } from "socket.io-client";
import Navbar from "./navbar";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import names from '../professionData.json'
import Cookies from 'js-cookie';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { isValidEmail } from '../common/validation';
function Home(params) {
  const [error, setError] = React.useState({});


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
  useEffect(() => {
    console.log("pro", names);
    const cookieValue = Cookies.get('token');
    if (cookieValue) {
      navigate('/chat')
      return () => { }
    }
    else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {

            const { latitude, longitude } = position.coords;
            localStorage.setItem('latitude', latitude)
            localStorage.setItem('longitude', longitude)

            if (latitude === localStorage.getItem('latitude') || longitude === localStorage.getItem('latitude')) {
              // let res= await axios

            }
            console.log("ppos", latitude, longitude);
          },
          error => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
    return () => { }

  }, [])
  const signUp = async (e) => {
    e.preventDefault();
    let firstName = document.getElementById("firstName").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let confirmPassword = document.getElementById("confirmPassword").value
    let profession = document.getElementById("profession").value

    let validationObject = {}
    if (!firstName) validationObject.name = 'Name is required'
    if (email) {
      if (!isValidEmail) validationObject.email = "Incorrect email"
    }
    else validationObject.email = "Please fill email "
    if (!password) validationObject.password = "Password is reqired"
    if (!profession) validationObject.profession = "Profession is reqired"
    if (confirmPassword) {
      if (password !== confirmPassword) validationObject.confirmPassword = "Confirm password not match with password"
    }
    else validationObject.confirmPassword = "Confirm Password is required"
    setError(validationObject)
    if (Object.keys(validationObject).length !== 0) return
    let data = {}
    data.name = firstName
    data.email = email
    data.password = password
    data.profession = profession
    data.longitude = localStorage.getItem('longitude')
    data.latitude = localStorage.getItem('latitude')

    try {
      let res = await axios(BACKEND_HOST + '/signup', {

        method: "POST", // *GET, POST, PUT, DELETE, etc.
        //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        //withCredentials:true,


        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          //'Access-Control-Allow-Methods':'*',
          //'Content-Type': 'application/x-www-form-urlencoded',
          "Access-Control-Allow-Credentials": true,
        },
        mode: 'cors',
        data: data,
        //redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //data: JSON.stringify(data),
      })
      console.log({ res });
    }
    catch (error) {
      console.log(error);
    }

  }
  return (
    <>
      <Navbar />
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="form">
          <div class="footer">

          </div>
        </div>
      </Box>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        Validate
        autoComplete="off"
      >
        <TextField
          required
          id="firstName"
          label="Name"
          error={error.name}
        />
        {error.name}
        <TextField
          required
          id="email"
          label="Email"
          error={error.email}
        /><br/>
        {error.email}

        <Autocomplete
          id='profession'
          placeholder="Choose Profession"
          options={names}

          required={true}
          sx={{ width: 300 }}
          error={error.profession}
        />
        {error.profession}
        <TextField
          required
          id="password"
          label="Password"
          error={error.password}
        />
        {error.password}
        <TextField
          required
          id="confirmPassword"
          label="Confirm password"
          error={error.confirmPassword}
        />
        {error.confirmPassword}
      </Box>
      <button onClick={signUp} class="btn" className="btn btn-primary">Register</button>
    </>
  )
}
export default Home