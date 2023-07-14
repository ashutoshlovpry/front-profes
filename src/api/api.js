import axios from "axios";

import { BACKEND_HOST } from '../constant'
const headers={
  
    "Content-Type": "application/json",
    'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    'Access-Control-Allow-Origin': 'http://localhost:3001, https://front-profes.vercel.app, https://new-prof.onrender.com , http://localhost:8000',
  
}
export const editAPI=async(data)=>{
    let res =await axios.put(BACKEND_HOST+'/api/edit_profile',data, headers)
    return res
  }

export const feed=async(profession)=>{
    let data={}
    data.profession=profession
    data.id=localStorage.getItem('id')
    let res =await axios.post(BACKEND_HOST+'/api/feed',data, headers)

    return res.data
  }

  export const follow=async(id)=>{
    let data={}
    data.following=id
    data.id=localStorage.getItem('id')
    
    let res =await axios.post(BACKEND_HOST+'/api/follower',data, headers)
    return res.data
  }

  export const addPost=async(title,content,file)=>{
    let data={}
    data.title=title
    data.id=localStorage.getItem('id')
    data.content=content
    if (file) data.media=file
    let res =await axios.post(BACKEND_HOST+'/api/follower',data, headers)
    return res.data
  }