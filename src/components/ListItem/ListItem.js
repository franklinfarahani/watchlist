import React, { Component } from "react";
import { connect } from "react-redux";
import { removeFromList } from "../../actions";

import styled from 'styled-components';
import Button from '../../components/Button';

const ListItemWrapper = styled.li`
  background: transparent;
  list-style-type: none;
  display: flex;
  padding: 8px 16px;
  padding-left: 16px;
`

class ListItem extends Component {
  handleRemoveClick = removeFromListId => {
    const { removeFromList, auth } = this.props;
    removeFromList(removeFromListId, auth.user.uid);
  };

  render() {
    const { itemId, item } = this.props;
    return (
      <ListItemWrapper>
        <h4>{item.title}</h4>
        <Button
            onClick={() => this.handleRemoveClick(itemId)}
          >
            Remove
        </Button>
      </ListItemWrapper>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps, { removeFromList })(ListItem);