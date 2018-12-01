import React, { Component } from 'react'

export default class Item extends Component {
  render() {
    return (
      //Display shop item
        <li className="shopItem" onClick={()=> this.props.itemClick(this.props)}>
        {this.props.name}
        </li>
    )
  }
}
