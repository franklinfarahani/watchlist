import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn, signOut } from '../../actions';
import Button from '../Button';
import DropMenu from '../DropMenu';

import styled from 'styled-components';
import watchlistLogo from '../../assets/icons/watchlist.svg';
import { ChevronDown as faChevronDown } from 'styled-icons/fa-solid/ChevronDown';
import { ChevronUp as faChevronUp } from 'styled-icons/fa-solid/ChevronUp';
import UserMenuSkeleton from '../Skeleton/UserMenuSkeleton';
import {colors, media} from '../../config/styleVariables';

const IconDown = styled(faChevronDown)`
  color: ${colors.PRIMARY};
  width: 10px;
  margin-bottom: -1px;
`

const IconUp = styled(faChevronUp)`
  color: ${colors.PRIMARY};
  width: 10px;
  margin-bottom: -1px;
`

const NavContainer = styled.nav`
  display: flex;
  height: 100px;
  ${media.phone`height: 60px;`}
  justify-content: space-between;
  ${media.phone`padding: 6px 16px;`}
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 4px;
    background: ${colors.PRIMARY} 100%;
  }

`
const LogoContainerLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5px;
  font-size: 24px;
  ${media.phone`font-size: 20px;`}
  font-weight: 400;
  text-decoration:none;
  color: ${colors.BLACK};
  img {
    padding-right: 8px;
    ${media.phone`padding-right: 6px;`}
  }
`

const NavLinksPages = styled.ul`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  ${media.phone`justify-content: space-evenly;`}
  align-items: center;
  padding : 0 30px;
  ${media.phone`padding : 0 20px;`}
  li {
    padding-right: 30px;
    ${media.phone`padding-right: 16px;`}
    &:last-child{
      padding-right: 0;
    }
    span {
      ${media.phone`display: none;`}
    }
  }
  li a {
    text-decoration: none;
    font-size: 16px;
    ${media.phone`font-size: 14px;`}
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
    ${media.phone`margin-left: 0;`}
    &:first-of-type {
      ${media.phone`display: none;`}
    }
    &:last-of-type {
      span:last-child {
        display: initial;
        ${media.phone`display: none;`}
      }
      span:first-child {
        display: none;
        ${media.phone`display: initial;`}
      }
    }
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
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }

    this.updateChevron = this.updateChevron.bind(this);
  }

  updateChevron(dataFromMenu){
    this.setState({isOpen: dataFromMenu});
  }
  
  render(){
    const { authenticated, loading, signIn, signOut, user } = this.props;

    return (
      <NavContainer>
          <LogoContainerLink to='/'>
            <img src={watchlistLogo} height="24" alt="Watchlist" />
            Watchlist
          </LogoContainerLink>
          <NavLinksPages role='navigation'>
            <li><Link to='/movies'>Movies</Link></li>
            <li><Link to='/tv'>TV <span>Shows</span></Link></li>
          </NavLinksPages>
          <NavLinksCTA>
            {loading || !user ? 
              <UserMenuSkeleton /> :
              authenticated ? 
                <DropMenu
                  button={
                    <UserMenu>
                      <img src={user.photoURL} alt='avatar'/>
                      <span>{user.displayName.split(" ")[0]}</span>
                      {!this.state.isOpen ?
                      <IconDown title='Menu Open Arrow Button' /> :
                      <IconUp title='Menu Close Arrow Button' />
                      }
                    </UserMenu>                  
                  }
                  isOpen={this.updateChevron}
                >
                  
                  <Link to='/app'>My List</Link>
                  <button role='menuitem' onClick={signOut}>Log Out</button>
                </DropMenu>
                :
                <Fragment>
                  <Button onClick={signIn}>Log In</Button>
                  <Button onClick={signIn} category='primary'><span>Sign In/Up</span><span>Register</span></Button>
                </Fragment>
            }
          </NavLinksCTA>
      </NavContainer>
    )
  }
};

Nav.propTypes = {
  router: PropTypes.object,
  authenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  user: PropTypes.object
};

function mapStateToProps({ auth }) {
  return {
    authenticated: auth.authenticated,
    user: auth.user,
    loading: auth.loading
  };
}

export default connect(mapStateToProps, { signIn, signOut })(Nav);