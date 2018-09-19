import styled from 'styled-components';
import {colors} from '../../config/styleVariables'

const SearchBackdrop = styled.div`
  background: ${colors.BACKDROP};
  opacity: ${(props) => props.isFocused ? '1' : '0'};
  visibility: ${(props) => props.isFocused ? 'visible' : 'hidden'};
  z-index: 1000;
  height: 100%;
  width: 100%;
  transition: ${(props) => props.isFocused ? 'opacity .2s linear' : 'visibility 0s linear .2s,opacity .2s linear;'};
  position: fixed;
  top: 0;
  left: 0;
`

export default SearchBackdrop;