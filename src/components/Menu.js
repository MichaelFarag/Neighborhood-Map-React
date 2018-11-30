import React, { Component } from 'react'
import ItemList from './ItemList'

export default class Menu extends Component {
  render() {
    return (
        <div className="sidebar">
        <input type={"search"} id={"search"} placeholder={"search here"}/>
        <ItemList {...this.props}  />
      </div>
    )
  }
}
