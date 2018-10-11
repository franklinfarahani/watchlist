import React from 'react';
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';
import { colors, shadows } from '../../config/styleVariables';

const StyledContentLoader = styled(ContentLoader)`
  height: 236px;
  width: 720px;
`

const Wrapper = styled.div`
  background: ${colors.WHITE};
  display: flex;
  margin-bottom: 8px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: ${shadows.VERYLOW};
`

const ListItemSkeleton = (props) => (
  <Wrapper>
    <StyledContentLoader
      height={236}
      width={720} 
      speed={2}
      primaryColor="#ccc"
      secondaryColor="#ddd"
      {...props}
    >
      {/* <path d="M716,236H4c-2.2,0-4-1.8-4-4V4c0-2.2,1.8-4,4-4h712c2.2,0,4,1.8,4,4v228C720,234.2,718.2,236,716,236z"/> */}
      <path d="M4,0C1.8,0,0,1.8,0,4v228c0,2.2,1.8,4,4,4h162V0H4z"/>
      <path d="M480,50.5H199.3c-2.2,0-4-1.8-4-4V35.2c0-2.2,1.8-4,4-4H480c2.2,0,4,1.8,4,4v11.3C484,48.7,482.2,50.5,480,50.5z"/>
      <path d="M558.8,52.4h-58.7c-2.2,0-4-1.8-4-4V33.3c0-2.2,1.8-4,4-4h58.7c2.2,0,4,1.8,4,4v15.1C562.8,50.6,561,52.4,558.8,52.4z"/>
      <path d="M590.1,102H197.3c-1.1,0-2-0.9-2-2v-6.5c0-1.1,0.9-2,2-2h392.8c1.1,0,2,0.9,2,2v6.5C592.1,101.1,591.2,102,590.1,102z"/>
      <path d="M600.8,122H197.3c-1.1,0-2-0.9-2-2v-6.5c0-1.1,0.9-2,2-2h403.4c1.1,0,2,0.9,2,2v6.5C602.8,121.1,601.9,122,600.8,122z"/>
      <path d="M567.8,142H197.3c-1.1,0-2-0.9-2-2v-6.5c0-1.1,0.9-2,2-2h370.5c1.1,0,2,0.9,2,2v6.5C569.8,141.1,568.9,142,567.8,142z"/>
      <path d="M578,162H197.3c-1.1,0-2-0.9-2-2v-6.5c0-1.1,0.9-2,2-2H578c1.1,0,2,0.9,2,2v6.5C580,161.1,579.1,162,578,162z"/>
      <path d="M224.3,207.7h-27c-1.1,0-2-0.9-2-2v-10.5c0-1.1,0.9-2,2-2h27c1.1,0,2,0.9,2,2v10.5C226.3,206.8,225.4,207.7,224.3,207.7z"/>
      <path d="M252.4,206h-17.3c-1.1,0-2-0.9-2-2V197c0-1.1,0.9-2,2-2h17.3c1.1,0,2,0.9,2,2v7.1C254.4,205.1,253.5,206,252.4,206z"/>
      <path d="M315,206h-25.3c-1.1,0-2-0.9-2-2V197c0-1.1,0.9-2,2-2H315c1.1,0,2,0.9,2,2v7.1C317,205.1,316.1,206,315,206z"/>
      <path d="M488.6,205.2h-58.2c-1.1,0-2-0.9-2-2v-7.1c0-1.1,0.9-2,2-2h58.2c1.1,0,2,0.9,2,2v7.1C490.6,204.3,489.7,205.2,488.6,205.2z"/>
      <path d="M427.8,72H197.3c-1.1,0-2-0.9-2-2v-5.5c0-1.1,0.9-2,2-2h230.4c1.1,0,2,0.9,2,2V70C429.8,71.1,428.9,72,427.8,72z"/>
      <polygon points="685.6,36 684,34.4 677,41.4 670,34.4 668.4,36 675.4,43 668.4,50 670,51.6 677,44.6 684,51.6 685.6,50 678.6,43 "/>
      <circle cx="274.6" cy="200.5" r="7.5"/>
      <circle cx="524.7" cy="199.7" r="10.8"/>
      <circle cx="591.4" cy="199.7" r="10.8"/>
      <circle cx="558" cy="199.7" r="10.8"/>
    </StyledContentLoader>
  </Wrapper>
)

export default ListItemSkeleton;