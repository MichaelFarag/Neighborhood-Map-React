import React, {Component} from 'react';
import './assets/css/App.css';
import {Map} from './components/Map'
import SquareAPI from './API/'
import Marker from 'react-google-maps/lib/components/Marker';

class App extends Component {

constructor (){
  super();
  this.state = {
    venues :[],
    markers : [],
    center : [],
    zoom : 12
  }
}

handleCloseMarkers = () =>{
  const markers = this.state.markers.map(marker => {
    marker.isOpen = false;
    return marker;
  })
  this.setState({marker : Object.assign(this.state.markers,markers)})
}

handleMarkerClick = marker => {
  this.handleCloseMarkers();
  marker.isOpen = true;
  this.setState({ markers: Object.assign(this.state.markers, marker) });
  // const item =  this.state.items.find(item => item.id === marker.id);
  const venue = this.state.venues.find(venue => venue.id === marker.id);

  SquareAPI.getVenuesDetails(marker.id).then(res => {
  const newVenue = Object.assign(venue, res.response.venue) ;
  this.setState({venues: Object.assign(this.state.venues, newVenue)});
    // console.log(res)
  })
}
  componentDidMount() {
    // this.getVenues()
    SquareAPI.search({
      
      near: "London",
      query: "Shops",
      limit:10

    }).then(results => {
      const {venues} = results.response;
      const {center} = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {

        console.log(results);
        return {

          id: venue.id,
          lat: venue.location.lat ,
          lng : venue.location.lng ,
          isOpen: false,
          isVisible: true,
          name: venue.name,
          address: venue.location.address
          
        }

      });
      this.setState({venues,center,markers});
    })
  }

  render() {
    return (

      <Map {...this.state} handleMarkerClick={this.handleMarkerClick} />

    )
  }
}


export default App;