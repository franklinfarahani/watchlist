import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import AppWrapper from '../pages/AppWrapper'




class App extends Component {

  render() {
    return (
      <Router>
        <AppWrapper />
      </Router>
    );
  }
}

export default App;
