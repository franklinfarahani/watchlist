import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
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
      duplicate: false,
      redirect: false
    }
  }

  componentDidMount(){
    // Array.prototype.some is similar to .map but will break as soon as the condition is met
    this.props.watchlist.some(
      listItem => this.props.item.id === listItem.id &&
        this.setState({duplicate: true})
    )
  }

  handleClick(e, itemSelected) {
    const { addToList, removeFromList, auth } = this.props;
    e.preventDefault();
    if (!auth.authenticated) {
      //TODO: redirect to sign in page if not authenticated
      this.setState({redirect: true})
      return;
    }
    else {
      if (!this.state.duplicate) {
        addToList(itemSelected);
        this.setState({duplicate: true})
      }
      else {
        removeFromList(itemSelected);
        this.setState({duplicate: false})
      }
    }    
    this.props.callback();
  }

  render() {
    const { item, callback } = this.props;
    const { redirect } = this.state;
    if (redirect) {
      callback();
      return <Redirect to={'/signin'} />
    }
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

const mapStateToProps = ({ auth, watchlist }) => {
  return {
    auth,
    watchlist: watchlist.list
  };
};

export default connect(mapStateToProps, { addToList, removeFromList })(AddToList);