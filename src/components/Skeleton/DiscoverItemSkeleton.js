import React from 'react';
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';
import { colors, shadows } from '../../config/styleVariables';

const StyledContentLoader = styled(ContentLoader)`
  height: 325px;
  width: 166px;
`

const Wrapper = styled.div`
  background: ${colors.WHITE};
  display: flex;
  margin-bottom: 16px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: ${shadows.VERYLOW};
`

const DiscoverItemSkeleton = (props) => (
  <Wrapper>
    <StyledContentLoader
      height={325}
      width={166} 
      speed={2}
      primaryColor="#ccc"
      secondaryColor="#ddd"
      {...props}
    >
      <path d="M162,0H4C1.8,0,0,1.8,0,4v221.3v6.7v4h4h158h4v-4v-6.7V4C166,1.8,164.2,0,162,0z"/>
      <path d="M147,259H14.1c-1.1,0-2-0.9-2-2v-5.9c0-1.1,0.9-2,2-2H147c1.1,0,2,0.9,2,2v5.9C149,258.1,148.1,259,147,259z"/>
      <path d="M87.5,274.9H14.1c-1.1,0-2-0.9-2-2V267c0-1.1,0.9-2,2-2h73.4c1.1,0,2,0.9,2,2v5.9C89.5,274,88.6,274.9,87.5,274.9z"/>
      <path d="M127.9,275.5H97.1c-1.1,0-2-0.9-2-2v-7.1c0-1.1,0.9-2,2-2h30.8c1.1,0,2,0.9,2,2v7.1C129.9,274.6,129,275.5,127.9,275.5z"/>
      <path d="M147,309h-35.1c-0.6,0-1-0.5-1-1v-7c0-0.5,0.4-1,1-1H147c0.5,0,1,0.5,1,1v7.1C148,308.6,147.5,309,147,309z"/>
    </StyledContentLoader>
  </Wrapper>
)

export default DiscoverItemSkeleton;