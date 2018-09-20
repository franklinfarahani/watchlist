import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from '../../config/styleVariables';

class DropMenu extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isOpen: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({isOpen : !this.state.isOpen})
    console.log(this.state.isOpen)
  }

  

  render(){
    const MenuButton = this.props.button;
    return(
      <div>
        <div onClick={this.handleClick}>{this.props.button}</div>
        {this.state.isOpen &&
          <ul>
            {this.props.children}
          </ul>
        }
      </div>
    )
  }
}

export default DropMenu;