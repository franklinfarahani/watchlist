import React, { Component } from 'react';
import styled from 'styled-components';

const Button = styled.a`
  text-decoration: none;
  font-size: .9em;
  background: black;
  color: white;
  height: 37px;
  line-height: 37px;
  padding: 0 16px;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: 4px;
  &:hover {
    background: blue;
  }
`

export default Button;