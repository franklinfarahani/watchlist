import styled from 'styled-components';
import { colors } from '../../utils/GlobalStyles';

const bgImage = ({ category }) => {
  return category ==='primary' && 'linear-gradient(to bottom, ' + colors.SECONDARY + ' 0%,' + colors.PRIMARY+' 50%,' + colors.SECONDARY + ' 100%)';
}

const textColor = ({ category }) => {
  return category ==='primary' ? 'white' : colors.NAV;
}

const borderColor = ({ category }) => {
  return category ==='primary' ? 'solid 2px transparent' : 'solid 2px ' + colors.PRIMARY;
}

const hoverBgPosition = ({ category }) => {
  return category === 'primary' ? 'bottom' : 'top';
}

const hoverBgImage = ({ category }) => {
  return category !== 'primary' && 
    'linear-gradient(to bottom, ' + colors.SECONDARY + ' 0%,' + colors.PRIMARY+' 50%,' + colors.SECONDARY + ' 100%)';
}

const hoverBorderColor = ({ category }) => {
  return category !=='primary' && 'solid 2px transparent';
}

const hoverTextColor = ({ category }) => {
  return category !=='primary' && colors.WHITE;
}

const Button = styled.button`
  display: flex;
  align-items: center;
  background-origin: border-box;
  text-decoration: none;
  font-size: .9em;
  font-weight: 500;
  background-image: ${bgImage};
  background-size: auto 200%;
  background-color: transparent;
  color: ${textColor};
  height: 37px;
  padding: 0 16px;
  border: ${borderColor};
  border-radius: 4px;
  background-position: top;
  transition: background .3s;
  
  &:hover {
    background-position: ${hoverBgPosition};
    background-image: ${hoverBgImage};
    border: ${hoverBorderColor};
    color: ${hoverTextColor}
  }
`

export default Button;