import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker,InfoWindow } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>

<GoogleMap
    defaultZoom={13}
    zoom = {props.zoom}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    center = {props.center}
  >
    {props.markers && 
         props.markers
            .filter(marker => marker.isVisible)
            .map((marker,idx) => {
                
              const venueInfo = props.venues.find(venue => venue.id == marker.id);
              return (
              
                <Marker
                tabIndex="1"
                 position={{
                   lat: marker.lat,
                   lng: marker.lng
                 }}
                 
                 title={marker.name}
                 key={idx}
                 onClick={() => props.openInfoWindow(marker)}
                  >

      {marker.isOpen && (
            <InfoWindow>
              <div aria-label="Location Information">
              <p><b>Shop name :</b> {venueInfo.name}</p>
              <p><b>Shop address :</b>{venueInfo.location.address} - {venueInfo.location.city} - {venueInfo.location.country}</p>
              </div>
            </InfoWindow>
          )}
            </Marker>
            );
            })}
  </GoogleMap>
))

export  class Map extends Component {
  render() {
    return (

            <MyMapComponent
            {...this.props}
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBiqYQSFmxgoM69o0uHdqhoCktOOO8uXls"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: ` 100%`, width: `80%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
    )
  }
}

export default Map
