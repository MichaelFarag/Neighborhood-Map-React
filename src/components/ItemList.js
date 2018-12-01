import React, { Component } from 'react'
import Item from './Item'

export default class ItemList extends Component {
  render() {
    return (
      //display all shops item list
        <ul className="shopList">
       { this.props.venues && 
            this.props.venues.map((venue,idx) => (
            <Item key={idx} {...venue}  itemClick={this.props.itemClick}/>
            ))}
     </ul>
    )
  }
}
