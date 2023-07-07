
import { useState, useEffect } from "react"
import {userDetails} from '../redux/actions/userDetails'
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux" 
import { storage } from ".././firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import Avatar from '@mui/joy/Avatar';
import { sendNotification } from "../common/notifications";
import { BACKEND_HOST } from '../constant'
import {editAPI} from '../api/editDetails'
import Navbar from './navbar';
import Search from "./search";
import { messaging } from "../firebase";
import { getToken } from "firebase/messaging";
import axios from "axios";



let deviceToken=''
function Dashboardn(){
const dispatch=useDispatch()
const [imageList, setImageList] = useState('');
let userData=useSelector((state)=> state.userDetail.userDetails.user)
console.log("d",userData);
async function requestPermission() {
    const permission = await Notification.requestPermission();
    
    if (permission === "granted") {
      // Generate Token
      console.log("grnt")
      const token = await getToken(messaging, {
        vapidKey:
          "BLzowO5w_i1oMU_SzbHnw14STHGUv9Br5bzkDYceKiqTeTeZMVOoI_4RqDmgkRK1scgjkTcd1CezUE-koKoB0g8",
      });
      deviceToken=token
      // Send this token  to server ( db)
    } else if (permission === "denied") {
      
      alert("You denied for the notification");
    }
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('firebase-messaging-sw.js');
  }
const FCMtoken=async ()=>{
    console.log("funcal");
    let FCMdata={}
    FCMdata.id=localStorage.getItem('id')
    FCMdata.token=deviceToken
   let res= await addToken(FCMdata)
   console.log("fm ttto",res);
}
const addToken=async(data)=>{
    let res =await axios.put(BACKEND_HOST+'/api/fcmAdd',data, {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Origin': 'http://localhost:3001, https://front-profes.vercel.app, https://new-prof.onrender.com , http://localhost:8000',
      }
    })
    return res
  }
  useEffect(()=>{ 
//requestPermission()
FCMtoken()
const imageListRef = ref(storage, "images/"+userData?.profile_img)
//console.log("re",imageListRef);
// getDownloadURL(imageListRef).then((url) => {
//       console.log("uu",url);
//       setImageList((prev) => [...prev, url])
//     })

    return () => { }
  },[])


    return(<>
    <Navbar/>
    <Avatar alt={userData.name} src={imageList} />
    {/* <button onClick={sendNoti}>notif</button> */}
    </>)
}
export default Dashboardn