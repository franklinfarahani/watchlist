import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled, {injectGlobal} from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faSearch, faTimes, faImage } from '@fortawesome/free-solid-svg-icons'

import { fetchUser } from '../actions';
import { connect } from 'react-redux';

import Nav from './Nav';
import Search from './Search';
import requireAuth from './auth/requireAuth';

import SignIn from '../pages/SignIn/SignIn';
import Watchlist from '../pages/Watchlist/Watchlist';
import Movies from '../pages/Movies/Movies';
import TV from '../pages/TV/TV';


// Fontawesome custom icon library
library.add(faPlay, faSearch, faTimes, faImage);

// Styles

const ResetGlobalStyle = injectGlobal`
  padding: 0;
  margin: 0;
  
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

const AppWrapper = styled.div`
  max-width: 720px;
  margin: auto;
  display: flex;
  flex-direction: column;
`

const AppFooter = styled.div`
  margin-top: 50px;
  padding: 20px;
  text-align: center;
`
const AppTitle = styled.div`
  font-size: .8em;
`

class App extends Component {

  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router>
        <AppWrapper>
          <Nav />
          <Search />
          <Route exact path='/' component={SignIn} />
          <Route path='/app' component={requireAuth(Watchlist)} />
          <Route path='/movies' component={Movies} />
          <Route path='/tv' component={TV} />
          <AppFooter>
            <AppTitle>&copy; Copyright Franklin Farahani 2018</AppTitle>
          </AppFooter>
        </AppWrapper>
      </Router>
    );
  }
}

export default connect(null, { fetchUser })(App);
