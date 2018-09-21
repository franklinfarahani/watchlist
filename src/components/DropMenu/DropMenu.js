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
  background: ${colors.bg.DARK};
  margin: 0; 
  border-radius: 4px;
  box-shadow: ${shadows.VERYLOW};
  width: max-content;
  padding: 2px;
`

const MenuListItem = styled.li`
  font-size: 14px;
  color: ${colors.subtitle.MEDIUM}; 
  border-radius: 4px;
  
  a {
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

    this.handleClick = this.handleClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  handleClickOutside(e) {
    if (this.node.contains(e.target)) {
      this.setState({display: true})
      return;
    }
    this.setState({display: false})
  }

  handleClick() {
    this.setState({ display: !this.state.display})
  }

  

  render(){
    return(
      <MenuContainer>
        <MenuButton onClick={this.handleClick}>{this.props.button}</MenuButton>
        {this.state.display &&
          <MenuList ref = {node => this.node = node}>
            {this.props.children.map(menuItem => <MenuListItem key={menuItem.props.children}>{ menuItem }</MenuListItem>)}
          </MenuList>
        }
      </MenuContainer>
    )
  }
}

export default DropMenu;