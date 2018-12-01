import React, { Component } from 'react'
import Item from './Item'

export default class ItemList extends Component {
  render() {
    return (
        <ul className="shopList">
       { this.props.venues && 
            this.props.venues.map((venue,idx) => (
            <Item key={idx} {...venue}  handleListItemClick={this.props.handleListItemClick}/>
            ))}
     </ul>
    )
  }
}
