import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect, Switch } from 'react-router-dom';

import styled, { createGlobalStyle } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faSearch, faTimes, faImage } from '@fortawesome/free-solid-svg-icons'
import { colors } from '../utils/GlobalStyles';

import Nav from '../components/Nav';
import Search from '../components/Search';

import SignIn from '../pages/SignIn/SignIn';
import Watchlist from '../pages/Watchlist/Watchlist';
import Movies from '../pages/Movies/Movies';
import TV from '../pages/TV/TV';

// Fontawesome custom icon library
library.add(faPlay, faSearch, faTimes, faImage);

// Styles

const ResetGlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.bg.LIGHT};
    padding: 0;
    margin: 0;
    font-family: "SF UI Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(to right, ${colors.SECONDARY} 0%, ${colors.PRIMARY} 100%);
    }
  }

  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }

  input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  }

  button {
    background: transparent;
    border : none;
    font: inherit;
    cursor: pointer;
  }
`

const AppFooter = styled.div`
  margin-top: 50px;
  padding: 20px;
  text-align: center;
`
const AppTitle = styled.div`
  font-size: .8em;
`

const Wrapper = styled.div`
  max-width: 720px;
  margin: auto;
  display: flex;
  flex-direction: column;
`

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/signin', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/app' />}
    />
  )
}

class AppWrapper extends Component{
  
  render(){
    return (
      // styled-components uses Pure Components which means location needs to be explicitly passed to avoid blocking router updates
      <Wrapper location={this.props.location}>
        <Nav />
          <Search />
           
            <Switch>
            
              <PublicRoute authed={this.props.authenticated} exact path='/' component={Movies} />
              {this.props.loading ? <Route render={() => <h3>Logging in...</h3>} /> : 
              <PublicRoute authed={this.props.authenticated} path='/signin' component={SignIn} />
              }
              <PrivateRoute authed={this.props.authenticated} path='/app' component={Watchlist} />
              <Route path='/movies' component={Movies} />
              <Route path='/tv' component={TV} />
              <Route render={() => <h3>404: Not Found</h3>} />
            </Switch>
          
          <AppFooter>
            <AppTitle>&copy; Copyright Franklin Farahani 2018</AppTitle>
          </AppFooter>
          <ResetGlobalStyle />
      </Wrapper>
    )
  }
}

function mapStateToProps({auth}) {
  return { 
    authenticated: auth.authenticated,
    loading: auth.loading
  };
}

export default withRouter(connect(mapStateToProps)(AppWrapper));
