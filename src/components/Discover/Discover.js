import React, { Component } from 'react';
import styled from 'styled-components';
import { colors, shadows } from '../../config/styleVariables';

const DiscoverContainer = styled.div`
  /* TODO: get rid of space between search bar and watchlist */
  background: ${colors.WHITE};
  display: flex;
  border-radius: 4px;
  box-shadow: ${shadows.VERYLOW};
  margin: 50px 0 0;
  padding: 30px;
`

class Discover extends Component {
  render() {
    return (
      <DiscoverContainer>
        {`Discover New ${this.props.type}s!`}
      </DiscoverContainer>
    )
  }
}

export default Discover;