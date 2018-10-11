import React from 'react';
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

const StyledContentLoader = styled(ContentLoader)`
  width: 102.33px;
`

const UserMenuSkeleton = (props) => (
  <StyledContentLoader
    height={30}
    width={102.33} 
		speed={2}
		primaryColor="#ccc"
		secondaryColor="#ddd"
		{...props}
	>
		<circle cx="15" cy="15" r="15" />
    <path d="M81,20H40c-1.1,0-2-0.9-2-2v-6c0-1.1,0.9-2,2-2h41c1.1,0,2,0.9,2,2v6C83,19.1,82.1,20,81,20z" />
    <polygon points="99.5,12.5 96.5,15.5 93.5,12.5 92,14 96.5,18.4 101,14 " />
  </StyledContentLoader>
)

export default UserMenuSkeleton;