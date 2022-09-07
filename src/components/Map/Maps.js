import React,{useState} from 'react'
import Map,{FullscreenControl,Marker,NavigationControl,Popup} from 'react-map-gl';
const Maps = ({lat,lng,region}) => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
     <Map
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 13
      }}
      onClick={()=>setShowPopup(!showPopup)}
      style={{width: '100%', height:'100vh'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken="pk.eyJ1Ijoicm9ob3Y5OTQ3NSIsImEiOiJja3ZjNXVrcWIyc2prMnJsdTUzNjl1a2hjIn0.wWIW00DV5QwcG8SC4mik9Q"
    >
         <Marker longitude={lng} latitude={lat} anchor="bottom">
      <img src="../marker.svg" width="32px" height="40px" alt="marker" />
    </Marker>
    {showPopup && (
      <Popup longitude={lng} latitude={lat}
        anchor="bottom"
        onClose={() => setShowPopup(false)}>
        {region}
      </Popup>)}
      <FullscreenControl />
      <NavigationControl />

      </Map>
    </>
  )
}

export default Maps