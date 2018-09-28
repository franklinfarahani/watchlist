import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addToList, removeFromList } from '../../actions';
import Button from '../Button';
import styled from 'styled-components';
import { Add as mdAdd } from 'styled-icons/material/Add';
import { Remove as mdRemove } from 'styled-icons/material/Remove';

const IconAdd = styled(mdAdd)`
  width: 15px;
  margin-bottom: 1px;
`

const IconRemove = styled(mdRemove)`
  width: 15px;
  margin-bottom: 1px;
`

class AddToList extends Component {
  constructor(props){
    super(props);
    this.state = {
      duplicate: false
    }

    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  componentDidMount(){
    // Array.prototype.some is similar to .map but will break as soon as the condition is met
    this.props.watchlist.some(
      listItem => this.props.item.id === listItem.id &&
        this.setState({duplicate: true}))
  }

  handleAddClick (e, addToListItem){
    const { addToList, auth } = this.props;
    e.preventDefault();
    addToList(addToListItem, auth.user.uid);
    this.setState({duplicate: true})
  };

  handleRemoveClick (e, removeFromListId){
    const { removeFromList, auth } = this.props;
    e.preventDefault();
    removeFromList(removeFromListId, auth.user.uid);
    this.setState({duplicate: false})
  };

  handleClick(e, itemSelected) {
    const { addToList, removeFromList, auth } = this.props;
    e.preventDefault();
    if (!auth.authenticated) {
      //TODO: redirect to sign in page if not authenticated
      return;
    }
    if (!this.state.duplicate) {
      addToList(itemSelected, auth.user.uid);
      this.setState({duplicate: true})
    }
    else {
      removeFromList(itemSelected.id, auth.user.uid);
      this.setState({duplicate: false})
    }
    this.props.callback();
  }

  render() {
    const { item } = this.props;
    return (
      <Button
        category='pill'
        danger={!this.state.duplicate ? false : true}
        onClick={(e) => this.handleClick(e, item)}
      >
      {!this.state.duplicate ?
        <Fragment>
          <IconAdd />
          {' Add'}
        </Fragment> : 
        <Fragment>
          <IconRemove />
          {' Remove'}
        </Fragment>}
      </Button>
    );
  }
}

const mapStateToProps = ({ auth, data }) => {
  return {
    auth,
    watchlist: data.list
  };
};

export default connect(mapStateToProps, { addToList, removeFromList })(AddToList);