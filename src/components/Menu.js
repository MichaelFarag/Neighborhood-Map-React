import React, { Component } from 'react'
import ItemList from './ItemList'

export default class Menu extends Component {

  constructor (){
    super ();
    this.state = {
      query : "",
      venues : []
    };
  }

  //filter function 
  filter = () => {
    if (this.state.query.trim() !== "") {
      const venues = this.props.venues.filter(venue =>
        venue.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
      return venues;
    }
    return this.props.venues;

  };

  //search on shope handling
  search = e => {
    this.setState({ query: e.target.value });
    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      if (isMatched) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({ markers : Object.assign(this.props.markers,markers) });
  };

  render() {
    return (
        <div className="sidebar">
        <input type={"search"} id={"search"} placeholder={"search here"} onChange={this.search} />
        <ItemList 
        
        {...this.props} 
         venues={this.filter()} 
         itemClick={this.props.itemClick}

         />
      </div>
    )
  }
}
