import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from '../../config/styleVariables';
import {Warning as mdWarning} from 'styled-icons/material/Warning';

const IconWarning = styled(mdWarning)`
  color: ${colors.subtitle.MEDIUM};
  width: 80px;
`

const DiscoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0;
  width: 100%;
`

const EmptyList = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin: 0 auto;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    h4 {    
      font-size: 18px;
      font-weight: 700;
      line-height: 36px;
      color: ${colors.subtitle.MEDIUM}
    }

    p {
      font-size: 14px;
      line-height: 22px;
      color: ${colors.subtitle.MEDIUM}
      width: 200px;
      text-align: center;
    }
  }
`

class Discover extends Component {
  render() {
    return (
      <DiscoverContainer>
        <EmptyList>
          <div>
            <IconWarning title='Warning Icon' />
            <h4>UNDER CONSTRUCTION</h4>
            <p>{`Soon you'll be able to discover new ${this.props.type.toLowerCase()}s right here!`}</p>
          </div>              
        </EmptyList>
      </DiscoverContainer>
    )
  }
}

export default Discover;