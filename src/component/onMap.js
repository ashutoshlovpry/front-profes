import React, { useEffect, useState } from 'react';

const Onmap = (props) => {
  const [location, setLocation] = useState(null);
 console.log("p",props);
 
    
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
};

export default Onmap;
