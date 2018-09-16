import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { fetchUser } from '../actions';

const Wrapper = styled.div`
  max-width: 720px;
  margin: auto;
  display: flex;
  flex-direction: column;
`


class AppWrapper extends Component{
  
  componentDidMount() {
    this.props.fetchUser();
  }
  render(){
    return (
      // styled-components uses Pure Components which means location needs to be explicitly passed
      <Wrapper location={this.props.location}>
        {this.props.children}
      </Wrapper>
    )
  }
}

export default withRouter(connect(null, { fetchUser }, null, { pure: false })(AppWrapper));
