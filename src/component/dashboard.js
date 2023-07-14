
import { useState, useEffect } from "react"
import {userDetails} from '../redux/actions/userDetails'
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux" 
import { storage } from ".././firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import Avatar from '@mui/joy/Avatar';
import { BACKEND_HOST ,HOST} from '../constant'
import {editAPI ,feed ,follow} from '../api/api'
import Navbar from './navbar';
import { messaging } from "../firebase";
import { getToken } from "firebase/messaging";
import axios from "axios";
import FixedBottomNavigation from './bottomNav'


let deviceToken=''
function Dashboardn(){
const dispatch=useDispatch()
const [imageList, setImageList] = useState('');
const [userSuggestion,setUserSuggesion]=useState([])
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
      }).then(async (res)=>{
        console.log("rrrrr",res);
          
        let FCMdata={}
        FCMdata.id=localStorage.getItem('id')
        FCMdata.token=res
       if (res){
         //let res= await addToken(FCMdata)
         //console.log("fm ttto",res);

       }
      });
      
      // Send this token  to server ( db)
    } else if (permission === "denied") {
      
      alert("You denied for the notification");
    }
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('firebase-messaging-sw.js');
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

  const userFeed=()=>{
let res= feed('doctor').then((res)=>{
  console.log("fees",res);
  setUserSuggesion(res)
imageFetch()
})


  }

  useEffect(()=>{ 
requestPermission()
const imageListRef = ref(storage, "images/"+userData?.profile_img)
//console.log("re",imageListRef);
// getDownloadURL(imageListRef).then((url) => {
//       console.log("uu",url);
//       setImageList((prev) => [...prev, url])
//     })
userFeed()
    return () => { }
  },[])
const imageFetch=()=>{
  
    setUserSuggesion((prev) => {
      return prev.map(item => {
      //  const imageListRef = ref(storage, "images/"+item?.profile_img)
      //console.log("re",imageListRef);

          return {...item , img:"url"}
        
      });
    });

    // getDownloadURL(imageListRef).then((url) => {
    //       console.log("uu",url);
    //       setUserSuggesion((prev) => {return {...prev , img:url}})
    //     })


}

    return(<>
    <Navbar/>
    <Avatar alt={userData.name} src={imageList} />
    <button onClick={userFeed}>fed</button>

{console.log("suugge",userSuggestion)}
    {userSuggestion.map((item)=>{
     return <>
     
    {item.name}
    <Avatar alt={item.name} src={item.img} />
    <button onClick={()=>{follow(item._id)}}>Follow</button>

</>

    })}

    <FixedBottomNavigation/>
    </>)
}
export default Dashboardn