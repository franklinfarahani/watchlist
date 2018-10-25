import React from 'react';
import ContentLoader from 'react-content-loader';
import styled from 'styled-components';
import { colors, shadows } from '../../config/styleVariables';

const BodyContentLoader = styled(ContentLoader)`
  height: 406px;
  width: 690px;
`

const ImageContentLoader = styled(ContentLoader)`
  height: 392px;
  width: 276px;
`

const Wrapper = styled.div`
  background: ${colors.WHITE};
  display: flex;
  margin-bottom: 16px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: ${shadows.VERYLOW};
  margin-left: 30px;
  & > div {
    height: 392px;
    overflow: hidden;
    border-radius: 4px;
    position: absolute;
    margin: -15px 0px 0px -30px;
    box-shadow: ${shadows.VERYHIGH}
  }
`

const SingleBodySkeleton = (props) => (
  <Wrapper>
    <div>
      <ImageContentLoader
        height={392}
        width={276} 
        speed={2}
        primaryColor="#ccc"
        secondaryColor="#ddd"
        {...props}
      >
        <path d="M272,392H4c-2.2,0-4-1.8-4-4V4c0-2.2,1.8-4,4-4h268c2.2,0,4,1.8,4,4v384C276,390.2,274.2,392,272,392z"/>
      </ImageContentLoader>
    </div>
    <BodyContentLoader
      height={406}
      width={690} 
      speed={2}
      primaryColor="#ccc"
      secondaryColor="#ddd"
      {...props}
    >
      <path d="M305.1,156.8h-27c-1.1,0-2-0.9-2-2v-10.5c0-1.1,0.9-2,2-2h27c1.1,0,2,0.9,2,2v10.5C307.1,155.9,306.2,156.8,305.1,156.8z"/>
      <path d="M333.2,155.1h-17.3c-1.1,0-2-0.9-2-2v-7c0-1.1,0.9-2,2-2h17.3c1.1,0,2,0.9,2,2v7.1C335.2,154.2,334.3,155.1,333.2,155.1z"/>
      <path d="M395.8,155.1h-25.3c-1.1,0-2-0.9-2-2v-7c0-1.1,0.9-2,2-2h25.3c1.1,0,2,0.9,2,2v7.1C397.8,154.2,396.9,155.1,395.8,155.1z"/>
      <circle cx="355.4" cy="149.6" r="7.5"/>
      <circle cx="288.7" cy="364.5" r="10.8"/>
      <circle cx="448" cy="364.5" r="10.8"/>
      <circle cx="320.6" cy="364.5" r="10.8"/>
      <circle cx="352.4" cy="364.5" r="10.8"/>
      <circle cx="384.3" cy="364.5" r="10.8"/>
      <circle cx="416.1" cy="364.5" r="10.8"/>
      <path d="M532,131.1h-62.7c-1.1,0-2-0.9-2-2v-4.4c0-1.1,0.9-2,2-2H532c1.1,0,2,0.9,2,2v4.4C534,130.2,533.1,131.1,532,131.1z"/>
      <path d="M317.1,131.1h-39c-1.1,0-2-0.9-2-2v-4.4c0-1.1,0.9-2,2-2h39c1.1,0,2,0.9,2,2v4.4C319.1,130.2,318.2,131.1,317.1,131.1z"/>
      <path d="M326.7,192.4H278c-1.1,0-2-0.9-2-2V186c0-1.1,0.9-2,2-2h48.7c1.1,0,2,0.9,2,2v4.4C328.7,191.5,327.8,192.4,326.7,192.4z"/>
      <path d="M375,340.5h-96.9c-1.1,0-2-0.9-2-2v-4.4c0-1.1,0.9-2,2-2H375c1.1,0,2,0.9,2,2v4.4C377,339.6,376.1,340.5,375,340.5z"/>
      <path d="M515.3,37.1h-45.9c-1.1,0-2-0.9-2-2v-4.4c0-1.1,0.9-2,2-2h45.9c1.1,0,2,0.9,2,2v4.4C517.3,36.2,516.4,37.1,515.3,37.1z"/>
      <path d="M317.1,37.1h-39c-1.1,0-2-0.9-2-2v-4.4c0-1.1,0.9-2,2-2h39c1.1,0,2,0.9,2,2v4.4C319.1,36.2,318.2,37.1,317.1,37.1z"/>
      <path d="M541.1,64.8h-69.8c-2.2,0-4-1.8-4-4V51c0-2.2,1.8-4,4-4h69.8c2.2,0,4,1.8,4,4v9.8C545.1,63,543.3,64.8,541.1,64.8z"/>
      <path d="M395,60.9H280c-2.2,0-4-1.8-4-4v-6c0-2.2,1.8-4,4-4h115c2.2,0,4,1.8,4,4v6C399,59.1,397.2,60.9,395,60.9z"/>
      <path d="M326.9,95H280c-2.2,0-4-1.8-4-4v-6c0-2.2,1.8-4,4-4h46.9c2.2,0,4,1.8,4,4v6C330.9,93.2,329.1,95,326.9,95z"/>
      <path d="M412.9,95h-74.7c-2.2,0-4-1.8-4-4v-6c0-2.2,1.8-4,4-4h74.7c2.2,0,4,1.8,4,4v6C416.9,93.2,415.1,95,412.9,95z"/>
      <path d="M372,78h-91.9c-2.2,0-4-1.8-4-4v-6c0-2.2,1.8-4,4-4H372c2.2,0,4,1.8,4,4v6C376,76.2,374.2,78,372,78z"/>
      <path d="M438,78h-54.8c-2.2,0-4-1.8-4-4v-6c0-2.2,1.8-4,4-4H438c2.2,0,4,1.8,4,4v6C442,76.2,440.2,78,438,78z"/>
      <path d="M490,159h-18c-2.2,0-4-1.8-4-4v-9.9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4v9.9C494,157.2,492.2,159,490,159z"/>
      <path d="M639.3,238.2H278.1c-1.1,0-2-0.9-2-2v-6.1c0-1.1,0.9-2,2-2h361.2c1.1,0,2,0.9,2,2v6.1C641.3,237.4,640.4,238.2,639.3,238.2z"/>
      <path d="M612.3,217.3H278.1c-1.1,0-2-0.9-2-2v-6.1c0-1.1,0.9-2,2-2h334.2c1.1,0,2,0.9,2,2v6.1C614.3,216.4,613.4,217.3,612.3,217.3z"/>
      <path d="M628.6,259.2H278.1c-1.1,0-2-0.9-2-2v-6.1c0-1.1,0.9-2,2-2h350.5c1.1,0,2,0.9,2,2v6.1C630.6,258.3,629.7,259.2,628.6,259.2z"/>
      <path d="M639.3,280.1H278.1c-1.1,0-2-0.9-2-2V272c0-1.1,0.9-2,2-2h361.2c1.1,0,2,0.9,2,2v6.1C641.3,279.2,640.4,280.1,639.3,280.1z"/>
      <path d="M578.4,301H278.1c-1.1,0-2-0.9-2-2v-6.1c0-1.1,0.9-2,2-2h300.3c1.1,0,2,0.9,2,2v6.1C580.4,300.1,579.5,301,578.4,301z"/>
    </BodyContentLoader>
  </Wrapper>
)

export default SingleBodySkeleton;