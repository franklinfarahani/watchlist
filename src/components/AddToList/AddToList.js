import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToList } from '../../actions';

// const AddToList = ({ item, dispatch }) => {
//   return (
//     <button onClick={e => {
//       e.preventDefault();
//       dispatch(addToList(item));
//     }}>
//     Add to List
//     </button>
//   )
// }

// export default connect()(AddToList);

class AddToList extends Component {
  handleAddClick = addToListItem => {
    const { addToList } = this.props;
    addToList(addToListItem);
  };

  render() {
    const { item } = this.props;
    return (
      <span
        onClick={() => this.handleAddClick(item)}
      >
        Add to List
      </span>
    );
  }
}

export default connect(null, { addToList })(AddToList);