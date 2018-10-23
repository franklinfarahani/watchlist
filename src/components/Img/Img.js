import React, {Component} from 'react';
import styled from 'styled-components';
import { colors } from '../../config/styleVariables';
import {Image as faImage} from 'styled-icons/fa-regular/Image';

const IconImage = styled(faImage)`
  color: ${colors.subtitle.MEDIUM};
  width: 40px;
`

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 236px;
  width: 166px;
  background: ${colors.bg.MEDIUM};

  img {
    transition: opacity .2s;
  }
`

class Img extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true
    }

    this.onLoad = this.onLoad.bind(this);
    this.onError = this.onError.bind(this);
  }

  onLoad(){
    this.setState({isLoading: false})
  }

  onError(){
    this.setState({isLoading: true})
  }

  render(){
    const {isLoading} = this.state;
    return (
      <ImgWrapper>
        {isLoading && <IconImage title="No image available" />}
        <img
          {...this.props}
          alt={this.props.alt}
          style={{opacity: isLoading ? 0 : 1, width: isLoading ? 0 : 'auto'}}
          onLoad={this.onLoad}
          onError={this.onError}
        />
      </ImgWrapper>
    )
  }  
}

export default Img;