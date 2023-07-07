import axios from "axios";

import { BACKEND_HOST } from '../constant'

export const editAPI=async(data)=>{
    let res =await axios.put(BACKEND_HOST+'/api/edit_profile',data, {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Origin': 'http://localhost:3001, https://front-profes.vercel.app, https://new-prof.onrender.com , http://localhost:8000',
      }
    })
    return res
  }