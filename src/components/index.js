import React, { Component } from 'react';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faTv } from '@fortawesome/free-solid-svg-icons'
import Nav from './Nav';

// Fontawesome custom icon library
library.add(faPlay, faTv);

// Styles
const AppWrapper = styled.div`
  max-width: 720px;
  margin: auto;
  display: flex;
  flex-direction: column;
`

const AppFooter = styled.div`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`
const AppTitle = styled.h1`
  font-size: 1.3em;
`

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Nav />
        <AppFooter>
          <AppTitle>Welcome to React</AppTitle>
        </AppFooter>
      </AppWrapper>
    );
  }
}

export default App;
