import { createGlobalStyle } from 'styled-components';
import { colors, fonts } from './styleVariables';

import CircularStdBook from '../assets/fonts/circular/CircularStdBook.woff';
import CircularStdBook2 from '../assets/fonts/circular/CircularStdBook.woff2';
import CircularStdMedium from '../assets/fonts/circular/CircularStdMedium.woff';
import CircularStdMedium2 from '../assets/fonts/circular/CircularStdMedium.woff2';
import CircularStdBold from '../assets/fonts/circular/CircularStdBold.woff';
import CircularStdBold2 from '../assets/fonts/circular/CircularStdBold.woff2';
import CircularStdBlack from '../assets/fonts/circular/CircularStdBlack.woff';
import CircularStdBlack2 from '../assets/fonts/circular/CircularStdBlack.woff2';

export default createGlobalStyle`

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

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
  font-family: ${fonts.MAIN}, ${fonts.SYSTEM};
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 4px;
    background: ${colors.PRIMARY} 100%;
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