import { createGlobalStyle } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faSearch, faTimes, faImage } from '@fortawesome/free-solid-svg-icons'
import { colors, fonts } from './styleVariables';

import CircularStdBook from '../assets/fonts/circular/CircularStdBook.woff';
import CircularStdBook2 from '../assets/fonts/circular/CircularStdBook.woff2';
import CircularStdMedium from '../assets/fonts/circular/CircularStdMedium.woff';
import CircularStdMedium2 from '../assets/fonts/circular/CircularStdMedium.woff2';
import CircularStdBold from '../assets/fonts/circular/CircularStdBold.woff';
import CircularStdBold2 from '../assets/fonts/circular/CircularStdBold.woff2';
import CircularStdBlack from '../assets/fonts/circular/CircularStdBlack.woff';
import CircularStdBlack2 from '../assets/fonts/circular/CircularStdBlack.woff2';

// Fontawesome custom icon library
library.add(faPlay, faSearch, faTimes, faImage);

export default createGlobalStyle`

@font-face {
  font-family: 'Circular Std';
  src: local('Circular Std Book'), local('CircularStd-Book'),
      url('${CircularStdBook2}') format('woff2'),
      url('${CircularStdBook}') format('woff');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Circular Std';
  src: local('Circular Std Bold'), local('CircularStd-Bold'),
      url('${CircularStdBold2}') format('woff2'),
      url('${CircularStdBold}') format('woff');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'Circular Std';
  src: local('Circular Std Black'), local('CircularStd-Black'),
      url('${CircularStdBlack2}') format('woff2'),
      url('${CircularStdBlack}') format('woff');
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: 'Circular Std';
  src: local('Circular Std Medium'), local('CircularStd-Medium'),
      url('${CircularStdMedium2}') format('woff2'),
      url('${CircularStdMedium}') format('woff');
  font-weight: 500;
  font-style: normal;
}


body {
  background-color: ${colors.bg.LIGHT};
  padding: 0;
  margin: 0;
  font-family: ${fonts.MAIN}, ${fonts.SYSTEM};
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, ${colors.SECONDARY} 0%, ${colors.PRIMARY} 100%);
  }
}

input {
  font-family: inherit;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}

input[type="search"]::-webkit-search-cancel-button {
-webkit-appearance: none;
}

button {
  background: transparent;
  border : none;
  font: inherit;
  cursor: pointer;
}
`