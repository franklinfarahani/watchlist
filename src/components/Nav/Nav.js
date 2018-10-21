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
import {colors} from '../../config/styleVariables';

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

const NavContainer = styled.div`
  display: flex;
  height: 100px;
  justify-content: space-between;
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
  width: 135px;
  font-size: 24px;
  font-weight: 400;
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
        <NavLinks>
          <NavLinksPages role='navigation'>
            <li><Link to='/movies'>Movies</Link></li>
            <li><Link to='/tv'>TV Shows</Link></li>
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