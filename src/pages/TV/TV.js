import React from 'react';
import PropTypes from 'prop-types';
import Discover from '../../components/Discover'

const TV = ({location}) => {
  return (
    <Discover mediaType='show' location={location}/>
  )
}

TV.propTypes = {
  location: PropTypes.object.isRequired
};

export default TV;