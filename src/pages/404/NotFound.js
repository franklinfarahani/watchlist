import React, { Component } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import { colors } from '../../config/styleVariables';
import {Warning as mdWarning} from 'styled-icons/material/Warning';

const IconWarning = styled(mdWarning)`
  color: ${colors.subtitle.MEDIUM};
  width: 80px;
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

class NotFound extends Component {
  render() {
    return (
      <Container>
        <EmptyList>
          <div>
            <IconWarning title='Warning Icon' />
            <h4>404: Not Found</h4>
            <p>The page you were looking for was not found.</p>
          </div>              
        </EmptyList>
      </Container>
    )
  }
}

export default NotFound;