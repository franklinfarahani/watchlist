import React from 'react';
import PropTypes from 'prop-types';
import Discover from '../../components/Discover';

const Movies = ({location}) => {
  return (
    <Discover mediaType='movie' location={location}/>
  )
}

Movies.propTypes = {
  location: PropTypes.object.isRequired
};

export default Movies;