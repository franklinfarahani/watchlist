import React from 'react';
import styled from 'styled-components';
import { colors } from '../../config/styleVariables';

const Wrapper = styled.label`
  display: flex;
  align-items: center;
`

const Tab = ({label, tabGroup, ...rest}) => {
  return (
    <Wrapper>
      <input type="radio" name={tabGroup} {...rest}/>
      <span>{label}</span>
    </Wrapper>
  )
}

export default Tab;