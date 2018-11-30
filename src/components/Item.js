import React, { Component } from 'react'

export default class Item extends Component {
  render() {
    return (
        <li className="shopItem" onClick={()=> this.props.handleListItemClick(this.props)}>
        {this.props.name}
        </li>
    )
  }
}
