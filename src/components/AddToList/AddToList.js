import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToList } from '../../actions';
import Button from '../Button';

class AddToList extends Component {
  handleAddClick (e, addToListItem){
    const { addToList, auth } = this.props;
    e.preventDefault();
    addToList(addToListItem, auth.user.uid);
  };

  render() {
    const { item } = this.props;
    return (
      <Button
        onClick={(e) => this.handleAddClick(e, item)}
      >
        Add to List
      </Button>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps, { addToList })(AddToList);