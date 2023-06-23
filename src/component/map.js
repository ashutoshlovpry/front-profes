import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';
import Onmap from './onMap';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Map(){

    const [location, setLocation] = useState(null);

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            console.log("ppos",latitude,longitude);
          },
          error => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }, []);
  const defaultProps = {
    center: {
      lat:28.50816,// location?.latitude,
      lng: 77.0899968 //location?.longitude
    },
    zoom: 12
  };
  

  return (
    
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
    //   bootstrapURLKeys={{
    //     key: "AIzaSyCf55dIPFL7yue2Cwu1tOFt8qr-FBHI92o",
    //     libraries: ["places", "geometry", "drawing", "visualization"],
    //   }}
      //apiKey={'AIzaSyAOz-GiMXkOfT3XAEp7oScc4c2G2fTBYJ8'}
       // bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {/* <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        /> */}
       <Onmap
             lat={location?.latitude}
             lng={location?.longitude}

        >
      


        </Onmap>

      </GoogleMapReact>
    </div>
  );
}
