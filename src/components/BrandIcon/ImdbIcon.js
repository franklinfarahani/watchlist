import React from 'react';
import imdbIcon from '../../assets/icons/imdb.svg';

const ImdbIcon = ({size}) => {
  return(
    <img src={imdbIcon} height={size} alt="imdb" />
  )
}

export default ImdbIcon;