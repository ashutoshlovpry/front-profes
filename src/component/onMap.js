import React, { useEffect, useState } from 'react';
import axios from "axios";
import { BACKEND_HOST } from "../constant";
import  { memo } from 'react';

const Onmap = (props) => {
  const [location, setLocation] = useState(null);
 console.log("p",props);
 useEffect( ()=>{
 
  fetchnearData()

 },[])
 const fetchnearData=async()=>{
  let data={}
  data.latitude=localStorage.getItem('latitude')
      data.longitude=localStorage.getItem('longitude')
      data.radius=50000
  let res =await axios.post(BACKEND_HOST+'/api/nearby', data )
  
  
 console.log("rr",res);
 }
 



//  const marker = new window.google.maps.Marker({
//     position: {
//       lat: this.state.masterCoords.lat,
//       lng: this.state.masterCoords.lng,
//     },
//     draggable: true,
//   });
 const getmarker=()=> new window.google.maps.Marker({
    position: { lat: props.lat, lng: props.lng },
    draggable: true,
    title: "Tag Marker",
  });
  return (
    <>
    <div style={{ color: 'red', fontWeight: 'bold' }} onClick={getmarker}>jfjhhfggtrgdfgaretaed</div>
    <button onClick={fetchnearData}>API Call</button>
    </>

//     <div>
//       {location ? (
//         <div>
//           Latitude: {location?.latitude}, Longitude: {location?.longitude}
//         </div>
//       ) : (
//         <div>Loading location...</div>
//       )}
//     </div>
   );
}

export default memo(Onmap);
