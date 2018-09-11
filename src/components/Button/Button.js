import React, { Component } from 'react';
import styled from 'styled-components';

const Button = styled.a`
  text-decoration: none;
  font-size: .9em;
  background-image: linear-gradient(to right, #DD5E89 0%, #F7BB97 100%);
  color: white;
  height: 37px;
  line-height: 37px;
  padding: 0 16px;
  border-radius: 4px;
  box-shadow: 0 0px 6px 4px hsla(340, 65%, 62%, 0.2);
  &:hover {
    background-position: right center;
  }
`

export default Button;