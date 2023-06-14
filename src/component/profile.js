import axios from "axios";
import { BACKEND_HOST } from "../constant";
//import {uploadToDrive} from '../common/mediaupload'
import React, { Component }  from 'react';

function Profile(props) {

const handleFileChange=async (event)=>{
    event.preventDefault();
  console.log("functionc call");
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];
  console.log("ff",file);
    const formData = new FormData();
    formData.append('file', file);
   // let res = await uploadToDrive(file)
    let res =await axios.post(BACKEND_HOST+'/api/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          'Access-Control-Allow-Origin': 'http://localhost:3001, https://front-profes.vercel.app, https://new-prof.onrender.com , http://localhost:8000',
        }
      })
console.log("rr",res);

    }
    return(<>
    <form action="/profile" method="post" enctype="multipart/form-data">

    <lable>Choose profile picture</lable>
    <input type="file" id="file-input" name="file"  ></input>
    <button type="submit" onClick={handleFileChange}>Submit</button>
    </form>
    
    
    </>)
}
export default Profile