import axios from "axios";
import { BACKEND_HOST } from "../constant";
//import {uploadToDrive} from '../common/mediaupload'
import { storage } from ".././firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import React, { Component }  from 'react';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {profileImg} from '../redux/actions/userDetails'

function Profile(props) {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const dispatch =useDispatch()
  const imageListRef = ref(storage, "images/")
  let selector=(state)=> state

  let state=useSelector(selector)
  console.log("d",state);
  const uploadImage = async (e) => {
    e.preventDefault()
  
    // Imageref is Image refrence. ref has two parameters.
    // First is storage and the second one is supposed to be the path of the file being uploaded.
    // `images/${imageUpload.name + v4()}` Creates a folder named images and saves the
    // file being uploaded with the file's name itself followed by a few random characters.
    const fileInput = document.getElementById('file-input').files[0];
    
   // console.log("jhg", URL.createObjectURL(fileInput))

    if (fileInput == null) return;
    console.log("ff",fileInput);
    let uniqueID=v4()
    const imageRef = ref(storage, `images/${uniqueID}`)
    uploadBytes(imageRef, fileInput).then(async(snapshot) => {
      console.log(snapshot);
    
    await  editAPI({id:localStorage.getItem('id'),profile_img:uniqueID})
      dispatch(profileImg(uniqueID))

      // getDownloadURL(snapshot.ref).then((url) => {
      //   console.log("uu",url);
      //   setImageList((prev) => [...prev, url])
      // })

    });
  };
// const handleFileChange=async (event)=>{
//     event.preventDefault();
//   console.log("functionc call");
//   const fileInput = document.getElementById('file-input');
//   const file = fileInput.files[0];
//   console.log("ff",file);
//     const formData = new FormData();
//     formData.append('file', file);
//    // let res = await uploadToDrive(file)
//     let res =await axios.post(BACKEND_HOST+'/api/upload', formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
//           'Access-Control-Allow-Origin': 'http://localhost:3001, https://front-profes.vercel.app, https://new-prof.onrender.com , http://localhost:8000',
//         }
//       })
// console.log("rr",res);

//     }
    const editDetails=async()=>{
      let data={}
      data.name=document.getElementById("name").value
      data.id=localStorage.getItem('id')
      data.latitude= localStorage.getItem('latitude')
      data.longitude=localStorage.getItem('longitude')
     await  editAPI(data)
    }
    const editAPI=async(data)=>{
      let res =await axios.put(BACKEND_HOST+'/api/edit_profile',data, {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          'Access-Control-Allow-Origin': 'http://localhost:3001, https://front-profes.vercel.app, https://new-prof.onrender.com , http://localhost:8000',
        }
      })
console.log("rr",res);
    }
    return(<>
    <form action="/profile" method="post" enctype="multipart/form-data">

    <lable>Choose profile picture</lable>
    <input type="file" id="file-input" name="myFile"  ></input>
    <button type="submit" onClick={uploadImage}>Submit</button>
    </form>
    <img src='https://github.com/ashutoshlovpry/profes/blob/master/upload/file_1688380295172_Screenshot%20from%202023-03-24%2015-28-28.png'/>
    <div className="lastname">
                  <label className="form__label" for="lastName">Name </label>
                  <input  type="text" name="" id="name"  className="form__input"placeholder="LastName"/>
              </div>
              <button type="submit" onClick={editDetails}>change name</button>
              {imageList.map((url) => {
        return <img src={url} />
      })}
    </>)
}
export default Profile