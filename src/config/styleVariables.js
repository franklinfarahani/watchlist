import { css } from 'styled-components';

export const colors = {
  PRIMARY: '#7301cc', //Purple
  SECONDARY: '#4776E6', //Blue
  MID_POINT: '#5C3DD9', //Mid point between primary and secondary
  DANGER_TOP: '#ff0066', //Pink-Red
  DANGER_BOT: '#c30303', //Brick-Red
  WHITE: '#ffffff',
  BLACK: '#222222',
  BACKDROP: 'rgba(48,48,48,.8)',
  NAV : '#777777',
  subtitle :
    {
      LIGHT: '#cccccc',
      MEDIUM_LIGHT: '#bbbbbb',
      MEDIUM: '#aaaaaa',
      PINK: '#9652cc'
    },
  bg :
    {
      LIGHT: '#eeeeee',
      MEDIUM: '#d3d3d3',
      DARK: '#333333'
    }

};

export const fonts = {
  SYSTEM: `"SF UI Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  MAIN: `'Circular Std'`
}

export const shadows = {
  VERYLOW: `0 2px 6px 0 hsla(0, 0%, 0%, 0.2)`,
  VERYHIGH: `0 10px 30px 2px hsla(0, 0%, 0%, 0.15)`
}

export const select = 'select';

// Media Queries Templating

export const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576,
}

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})