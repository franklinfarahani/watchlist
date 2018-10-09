import styled from 'styled-components';
import { colors } from '../../config/styleVariables';

const height = ({ category }) => {
  switch(category){
    case 'pill':
      return '19px';
    case 'icon':
      return 'initial';
    default:
      return '37px';
  }
}

const padding = ({ category }) => {
  switch(category){
    case 'pill':
      return '1px 5px 0 2px';
    case 'icon':
      return '4px';
    default:
      return '0 16px';
  }
}

const bgImage = ({ category }) => {
  return category ==='primary' && 'linear-gradient(to bottom, ' + colors.SECONDARY + ' 0%,' + colors.PRIMARY+' 50%,' + colors.SECONDARY + ' 100%)';
}

const textColor = ({ category }) => {
  switch(category){
    case 'pill':
    case 'icon':
      return colors.subtitle.MEDIUM;
    case 'primary':
      return colors.WHITE;
    default:
      return colors.BLACK;
  }
}

const borderRadius = ({ category }) => {
  switch(category){
    case 'icon':
      return '40px';
    default:
      return '4px';
  }
}

const borderColor = ({ category }) => {
  switch(category){
    case 'pill':
    case 'icon':
      return 'none';
    case 'primary':
      return 'solid 2px transparent';
    default:
      return 'solid 2px ' + colors.PRIMARY;
  }
}

const fontSize = ({ category }) => {
  switch(category){
    case 'pill':
      return '12px';
    default:
      return '14px';
  }
}

const fontWeight = ({ category }) => {
  switch(category){
    case 'pill':
      return '400';
    default:
      return '500';
  }
}

const textTransform = ({ category }) => {
  switch(category){
    case 'pill':
      return 'uppercase';
    default:
      return 'initial';
  }
}

const hoverBgPosition = ({ category }) => {
  return category === 'primary' ? 'bottom' : 'top';
}

const hoverBgImage = ({ category, danger }) => {
  return danger ? 'linear-gradient(to bottom, ' + colors.DANGER_TOP + ' 0%,' + colors.DANGER_BOT+' 100%)' :
    category !== 'primary' && 
    'linear-gradient(to bottom, ' + colors.SECONDARY + ' 0%,' + colors.PRIMARY+' 50%,' + colors.SECONDARY + ' 100%)';
}

const hoverBorderColor = ({ category }) => {
  switch(category){
    case 'pill':
    case 'icon':
      return 'none';
    case 'primary':
      return;
    default:
      return 'solid 2px transparent';
  }
}

const hoverTextColor = ({ category }) => {
  return category !=='primary' && colors.WHITE;
}

const Button = styled.button`
  display: flex;
  align-items: center;
  background-origin: border-box;
  text-decoration: none;
  font-size: ${fontSize};
  font-weight: ${fontWeight};
  text-transform: ${textTransform};
  background-image: ${bgImage};
  background-size: auto 200%;
  background-color: transparent;
  color: ${textColor};
  height: ${height};
  padding: ${padding};
  border: ${borderColor};
  border-radius: ${borderRadius};
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