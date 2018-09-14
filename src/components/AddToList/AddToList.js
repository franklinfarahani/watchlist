import React from 'react';
import { connect } from 'react-redux';
import { addToList } from '../../actions';

const AddToList = ({ item, dispatch }) => {
  return (
    <button onClick={e => {
      e.preventDefault();
      dispatch(addToList(item));
    }}>
    Add to List
    </button>
  )
}

export default connect()(AddToList);