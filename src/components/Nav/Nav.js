import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import {colors} from '../../utils/GlobalStyles';

const NavContainer = styled.div`
  display: flex;
  height: 100px;
  justify-content: space-between;

`
const LogoContainerLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5px;
  width: 135px;
  font-size: 24px;
  font-weight: 600;
  text-decoration:none;
  color: #000;
`

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  ul, div {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    margin: 0;
  }
`
const NavLinksPages = styled.ul`
  width: 150px;
  padding : 0 30px;
  li a {
    text-decoration: none;
    font-size: 15px;
    color: ${colors.NAV};
    &:hover {
      color: ${colors.PRIMARY};
    }
  }
`
const NavLinksCTA = styled.div`
  padding: 0;
  width: 180px;
`

const Nav = () => {
  return (
    <NavContainer>
        <LogoContainerLink to='/'>
          <FontAwesomeIcon icon ='play' color={colors.PRIMARY} />
          Watchlist
        </LogoContainerLink>
      <NavLinks>
        <NavLinksPages role='navigation'>
          <li><Link to='/movies'>Movies</Link></li>
          <li><Link to='/tv'>TV Shows</Link></li>
        </NavLinksPages>
        <NavLinksCTA>
          <Button as={Link} to='/'>Log In</Button>
          <Button as={Link} to='/' category='primary'>Register</Button>
        </NavLinksCTA>
      </NavLinks>
    </NavContainer>
  )
};

export default Nav;