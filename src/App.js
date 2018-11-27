import React, {Component} from 'react';
import './assets/css/App.css';
import {Map} from './components/Map'
import SquareAPI from './API/'

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

  componentDidMount() {
    // this.getVenues()
    SquareAPI.search({
      
      near: "London",
      query: "food",
      limit:10

    }).then(results => {
      const {venues} = results.response;
      const {center} = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {

        console.log(results);
        return {

          lat: venue.location.lat ,
          lng : venue.location.lng ,
          isOpen: false,
          isVisible: true
        }

      });
      this.setState({venues,center,markers});
    })
  }

  render() {
    return (

      <Map {...this.state} />

    )
  }
}


export default App;