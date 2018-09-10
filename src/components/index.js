import React, { Component } from 'react';
import styled, {injectGlobal} from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faSearch, faTimes, faImage } from '@fortawesome/free-solid-svg-icons'
import Nav from './Nav';
import Search from './Search';

import * as api from '../utils/api';


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
`

const AppWrapper = styled.div`
  max-width: 720px;
  margin: auto;
  display: flex;
  flex-direction: column;
`

const AppFooter = styled.div`
  background-color: #222;
  height: 150px;
  margin-top: 50px;
  padding: 20px;
  color: white;
`
const AppTitle = styled.div`
  font-size: .8em;
`

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Nav />
        <Search />
        <AppFooter>
          <AppTitle>&copy; Copyright Franklin Farahani 2018</AppTitle>
        </AppFooter>
      </AppWrapper>
    );
  }
}

export default App;
