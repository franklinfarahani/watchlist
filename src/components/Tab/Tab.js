import React from 'react';
import styled from 'styled-components';
import { colors } from '../../config/styleVariables';

const TabGroupWrapper = styled.div`
  display: flex;
`

export const TabGroup  = (props) => {
  const childrenWithProps = React.Children.map(props.children, child =>
    React.cloneElement(child, { name: props.name }));
  return (
    <TabGroupWrapper>
      {childrenWithProps}
    </TabGroupWrapper>
  )
}

const TabWrapper = styled.label`
  display: flex;
  align-items: center;

  input {
    display: none;
    &:checked ~ span{
      color: ${colors.BLACK};
      &:after {
        background: linear-gradient(to right, ${colors.SECONDARY} 0%, ${colors.PRIMARY} 100%);
      }
    }
  }

  span {
    position: relative;
    padding: 20px 10px;
    color: ${colors.subtitle.MEDIUM};
    font-weight: 600;
    cursor: pointer;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 4px;
      background: transparent;
    }
  }
`

const Tab = ({label, ...rest}) => {
  return (
    <TabWrapper>
      <input type="radio" {...rest}/>
      <span>{label}</span>
    </TabWrapper>
  )
}

export default Tab;