

import axios from "axios";
import React, { Component }  from 'react';
import  { useEffect, useState } from 'react';
import { io } from "socket.io-client";

import {BACKEND_HOST} from '../constant'
 function Search(){
    const socket = io(BACKEND_HOST,{
        transports: ['websocket'],
        extraHeaders: {
            "token": document.cookie.token
          }
      });
    const [user, setUsers] = useState([]);

   const searchUser=async (e)=>{
    //e.preventDefault()
        let query=  document.getElementById("search").value

//         console.log(query);
//         let formData = new FormData();
// formData.append('query', query);
      let res=await axios( BACKEND_HOST +'/search',{

        method: "POST", // *GET, POST, PUT, DELETE, etc.
       // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
       // credentials: 'include',//same-origin', // include, *same-origin, omit
      //  withCredentials:true,
    
       headers: {
      "Content-Type": "application/json",
    
       'Access-Control-Allow-Methods':'GET,OPTIONS,PATCH,DELETE,POST,PUT',
         
           'Access-Control-Allow-Origin':'http://localhost:3001, https://front-profes.vercel.app, https://new-prof.onrender.com , http://localhost:8000',
          
       },
        mode: 'cors',
        data:JSON.stringify({"query":query})

      })

console.log("searcgh",res);
setUsers(res.data)


    }

const selectedUser=async(data)=>{
    console.log(data);
    let roomId=data._id+localStorage.getItem('id')
   // console.log({roomId});
    socket.emit('joinRoom',roomId)
}

    return(<>
    
    
    {/* <nav class="navbar navbar-light bg-light"> */}
    <input placeholder="Search" id="search" aria-label="Search"/>
    <button  onClick={searchUser}>Search</button>
{/* </nav> */}
    {
        user.length && user.map((i)=>(
            <div onClick={()=>selectedUser(i)}>
         {i.name}

         {i.profession}
         </div>
        )
            
        )
    }
    
    </>)
}
export default Search