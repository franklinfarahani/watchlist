import React, { Component } from 'react';
import styled from 'styled-components';
import { colors, shadows } from '../../config/styleVariables';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: flex-end;
`

const MenuButton = styled.div`
  cursor: pointer;
`

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40px;
  background: ${colors.bg.DARK};
  margin: 0; 
  border-radius: 4px;
  box-shadow: ${shadows.VERYLOW};
  width: max-content;
  padding: 2px;
  z-index: 2000;
`

const MenuListItem = styled.li`
  font-size: 14px;
  color: ${colors.subtitle.MEDIUM}; 
  border-radius: 4px;
  
  a, button {
    padding: 8px 16px;
    color: inherit;
    text-decoration: none;
    display: flex;
    flex:1;
    cursor: pointer;
  }
  &:hover {
    color: ${colors.WHITE};
    background-color: ${colors.BLACK}
  }
`

class DropMenu extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      display: false
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  // Send the Open/Close state back to parent via this.props.isOpen
  handleShow(e) {
    e.preventDefault();
    this.setState({ display: true });
    this.props.isOpen(true);
    document.addEventListener("click", this.handleHide);
  }

  handleHide() {
    this.setState({ display: false });
    this.props.isOpen(false);
    document.removeEventListener("click", this.handleHide);
  }

  render() {
    return (
      <MenuContainer ref = {node => (this.menu = node)}>
        <MenuButton onClick={this.handleShow}>{this.props.button}</MenuButton>
        {this.state.display && (
          <MenuList>
            {this.props.children.map(menuItem => (
              <MenuListItem key={menuItem.props.children}>
                {menuItem}
              </MenuListItem>
            ))}
          </MenuList>
        )}
      </MenuContainer>
    );
  }
}

export default DropMenu;