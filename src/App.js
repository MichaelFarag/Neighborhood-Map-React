import React, {Component} from 'react';
import './assets/css/App.css';
import {Map} from './components/Map';
import SquareAPI from './API/';
import Marker from 'react-google-maps/lib/components/Marker';
import Menu from './components/Menu'

class App extends Component {

constructor (){
  super();
  this.state = {
    venues :[],
    markers : [],
    center : [],
    zoom : 12,
    updateSuperState: obj => {
      this.setState(obj);
    }
  }
}


//Open Info window handling
openInfoWindow = marker => {
  this.closeInfoWindow();
  marker.isOpen = true;
  this.setState({ markers: Object.assign(this.state.markers, marker) });

  const venue = this.state.venues.find(venue => venue.id === marker.id);

  SquareAPI.getVenuesDetails(marker.id).then(res => {
  const newVenue = Object.assign(venue, res.response.venue) ;
  this.setState({venues: Object.assign(this.state.venues, newVenue)});
    // console.log(res)
  })
}

//Close info window handling
closeInfoWindow = () =>{
  const markers = this.state.markers.map(marker => {
    marker.isOpen = false;
    return marker;
  })
  this.setState({marker : Object.assign(this.state.markers,markers)})
}

//marker click function 
itemClick = venue => {
  // console.log("Venue Data" + venue)
  const marker = this.state.markers.find(marker => marker.id === venue.id);
  this.openInfoWindow(marker);
  // console.log("Marker info" + marker) 
}


//fetch all data from SquareAPI
  componentDidMount() {
    // this.getVenues()
    SquareAPI.search({
      near: "London",
      query: "Shops",
      limit:6

    }).then(results => {
      const {venues} = results.response;
      const {center} = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {

        // console.log(results);
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

     <div className="mapApp">
     <div className="Menu">
       <Menu {...this.state} itemClick={this.itemClick} />
       </div>
       <div className="Map">
        <Map {...this.state} openInfoWindow={this.openInfoWindow} />
        </div>
     </div>
    );
  }
}


export default App;