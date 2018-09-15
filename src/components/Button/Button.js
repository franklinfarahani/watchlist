import styled from 'styled-components';
import { colors } from '../../utils/GlobalStyles';

const Button = styled.button`
  display: flex;
  align-items: center;
  background-origin: border-box;
  text-decoration: none;
  font-size: .9em;
  background-image: ${(props) => props.category === 'primary' && 'linear-gradient(to bottom, ' + colors.SECONDARY + ' 0%,' + colors.PRIMARY+' 100%)'};
  background-color: ${colors.WHITE};
  color: ${(props) => props.category === 'primary' ? 'white' : colors.PRIMARY};
  height: 37px;
  padding: 0 16px;
  border: ${(props) => props.category === 'primary' ? 'solid 2px transparent' : 'solid 2px ' + colors.PRIMARY};
  border-radius: 4px;
  
  &:hover {
    background-position: right center;
  }
`

export default Button;