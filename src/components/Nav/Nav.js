import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Play as faPlay } from 'styled-icons/fa-solid/Play';
import { ChevronDown as faChevronDown } from 'styled-icons/fa-solid/ChevronDown';
import Button from '../Button';
import DropMenu from '../DropMenu';
import {colors} from '../../config/styleVariables';

const IconDown = styled(faChevronDown)`
  color: ${colors.PRIMARY};
  width: 10px;
  margin-bottom: -1px;
`

const IconPlay = styled(faPlay)`
  color: ${colors.PRIMARY};
  width: 20px;
`

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
  
  ${Button} {
    margin-left: .5em;
  }

  img {
    height: 30px;
    width: auto;
    border-radius: 15px;
  }
`

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size:13px;
    color: ${colors.BLACK};
    padding: 8px;
  }
`

class Nav extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render(){
    const { authenticated, signIn, signOut, user } = this.props;

    return (
      <NavContainer>
          <LogoContainerLink to='/'>
            <IconPlay title='Logo Play Icon'/>
            Watchlist
          </LogoContainerLink>
        <NavLinks>
          <NavLinksPages role='navigation'>
            <li><Link to='/movies'>Movies</Link></li>
            <li><Link to='/tv'>TV Shows</Link></li>
          </NavLinksPages>
          <NavLinksCTA>
            {authenticated ? 
              <DropMenu
                button={
                  <UserMenu>
                    <img src={user.photoURL} alt='avatar'/>
                    <span>{user.displayName.split(" ")[0]}</span>
                    <IconDown title='Menu Dropdown Button' />
                  </UserMenu>                  
                }
              >
                
                <Link to='/app'>My List</Link>
                <a role='menuitem' onClick={signOut}>Log Out</a>
              </DropMenu>
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
    user: auth.user,
    // username: auth.user.displayName,
    // avatar: auth.user.photoURL,
    loading: auth.loading
  };
}

export default connect(mapStateToProps, { signIn, signOut })(Nav);