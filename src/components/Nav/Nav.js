import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';

const NavContainer = styled.div`
  display: flex;
  height: 100px;
  justify-content: space-between;

`
const LogoContainer = styled.div`
  margin-left: 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
`

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  ul {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    margin: 0;
  }
`
const NavLinksPages = styled.ul`
  width: 150px;
  padding : 0 30px;
`
const NavLinksCTA = styled.ul`
  padding: 0;
  width: 170px;
`

const Nav = () => {
  return (
    <NavContainer>
      <LogoContainer>
        <FontAwesomeIcon icon ='play' />
        watchlist
      </LogoContainer>
      <NavLinks>
        <NavLinksPages role='navigation'>
          <li>Movies</li>
          <li>TV Shows</li>
        </NavLinksPages>
        <NavLinksCTA>
          <Button href='#'>Log In</Button>
          <Button href='#'>Sign Up</Button>
        </NavLinksCTA>
      </NavLinks>
    </NavContainer>
  )
};

export default Nav;