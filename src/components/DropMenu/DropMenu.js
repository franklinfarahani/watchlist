import React, { Component } from 'react';
import styled from 'styled-components';
import { colors, shadows } from '../../config/styleVariables';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: flex-end;
  z-index: 2000;
`

const MenuButton = styled.div`
  cursor: pointer;
`

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40px;
  right: -30px;
  background: ${colors.WHITE};
  margin: 0; 
  border-radius: 4px;
  box-shadow: ${shadows.VERYLOW};
  width: 140px;
  padding: 16px;
`

const MenuListItem = styled.li`
  padding-bottom: 4px;
  font-size: 14px;
  &:last-child {
    padding-bottom: 0;
  }
`

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
  }

  

  render(){
    return(
      <MenuContainer>
        <MenuButton onClick={this.handleClick}>{this.props.button}</MenuButton>
        {this.state.isOpen &&
          <MenuList>
            {this.props.children.map(menuItem => <MenuListItem key={menuItem.props.children}>{ menuItem }</MenuListItem>)}
          </MenuList>
        }
      </MenuContainer>
    )
  }
}

export default DropMenu;