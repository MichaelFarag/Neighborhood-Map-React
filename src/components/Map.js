import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

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
            .map((marker,idx) => (
                 <Marker 
                 tabIndex="1"
                 position={{
                   lat: marker.lat,
                   lng: marker.lng
                 }}
                 
                 title={marker.name}
                 key={idx} />
    )) }
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
            containerElement={<div style={{ height: ` 1000px`, width: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
    )
  }
}

export default Map
