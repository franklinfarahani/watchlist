import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect, Switch } from 'react-router-dom';
import MDSpinner from 'react-md-spinner';

import styled from 'styled-components';
import GlobalStyles from '../config/GlobalStyles'
import { colors } from '../config/styleVariables';

import Nav from '../components/Nav';
import Search from '../components/Search';

import SignIn from '../pages/SignIn/SignIn';
import Watchlist from '../pages/Watchlist/Watchlist';
import Movies from '../pages/Movies/Movies';
import TV from '../pages/TV/TV';
import NotFound from '../pages/404/NotFound';

// Styles

const AppFooter = styled.div`
  margin-top: 50px;
  padding: 20px;
  text-align: center;
`
const AppTitle = styled.div`
  font-size: .8em;
  color: ${colors.subtitle.MEDIUM};
`

const Wrapper = styled.div`
  max-width: 720px;
  margin: auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const LoaderWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin: 0 auto;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    h4 {    
      margin-top:20px;
      padding-left: 12px;
      font-size: 14px;
      color: ${colors.subtitle.MEDIUM}
    }
  }
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
      // Location needs to be explicitly passed to avoid blocking router updates
      <Wrapper location={this.props.location}>
        <Nav />
        <Search />
        {this.props.loading ? 
          <LoaderWrapper>
            <div>            
              <MDSpinner
                size={50}
                borderSize={3}
                color1={colors.PRIMARY}
                color2={colors.MID_POINT}
                color3={colors.SECONDARY}
                color4={colors.MID_POINT}
              />
              <h4>Logging in...</h4> 
            </div>           
          </LoaderWrapper> :
          <Switch>
            <PublicRoute authed={this.props.authenticated} exact path='/' component={Movies} />
            <PublicRoute authed={this.props.authenticated} path='/signin' component={SignIn} />
            <PrivateRoute authed={this.props.authenticated} path='/app' component={Watchlist} />
            <Route path='/movies' component={Movies} />
            <Route path='/tv' component={TV} />
            <Route component={NotFound} />
          </Switch>
        }
        <AppFooter>
          <AppTitle>&copy; Copyright Franklin Farahani 2018</AppTitle>
        </AppFooter>
        <GlobalStyles />
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
