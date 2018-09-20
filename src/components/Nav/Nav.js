import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import DropMenu from '../DropMenu';
import {colors} from '../../config/styleVariables';

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
  color: ${colors.BLACK};
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
    transition: color .2s;
    &:hover {
      color: ${colors.PRIMARY};
    }
  }
`
const NavLinksCTA = styled.div`
  padding: 0;
  display: flex;
  align-items: center;
  
  button {
    margin-left: .5em;
  }

  img {
    height: 30px;
    width: auto;
    border-radius: 15px;
  }

  a {
    font-size: 12px;
    padding-left: 8px; 
  }
`

class Nav extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render(){
    const { authenticated, signIn, signOut, username, avatar } = this.props;
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
            {authenticated ? 
              <Fragment>
                <DropMenu button={<img src={avatar} alt='avatar'/>}>
                  <li>{username}</li>
                  <li>My List</li>
                  <li onClick={signOut}>Log Out</li>
                </DropMenu>
              </Fragment>
              :
              <Fragment>
                <Button onClick={signIn}>Log In</Button>
                <Button onClick={signIn} category='primary'>Register</Button>
              </Fragment>
            }
          </NavLinksCTA>
        </NavLinks>
      </NavContainer>
    )
  }
};

function mapStateToProps({ auth }) {
  return {
    authenticated: auth.authenticated,
    username: auth.user.displayName,
    avatar: auth.user.photoURL,
    loading: auth.loading
  };
}

export default connect(mapStateToProps, { signIn, signOut })(Nav);