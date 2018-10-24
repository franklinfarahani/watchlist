import React from 'react';
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

const StyledContentLoader = styled(ContentLoader)`
  height: 24px;
  width: 320px;
`

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  overflow: hidden;
`

const SingleTitleSkeleton = (props) => (
  <Wrapper>
    <StyledContentLoader
      height={24}
      width={320} 
      speed={2}
      primaryColor="#ccc"
      secondaryColor="#ddd"
      {...props}
    >
      <path d="M251.3,21.8H4c-2.2,0-4-1.8-4-4V6.2c0-2.2,1.8-4,4-4h247.3c2.2,0,4,1.8,4,4v11.6C255.3,20,253.5,21.8,251.3,21.8z"/>
      <path d="M314.6,20.9h-42.9c-2.2,0-4-1.8-4-4V7.1c0-2.2,1.8-4,4-4h42.9c2.2,0,4,1.8,4,4v9.8C318.6,19.1,316.8,20.9,314.6,20.9z"/>
    </StyledContentLoader>
  </Wrapper>
)

export default SingleTitleSkeleton;