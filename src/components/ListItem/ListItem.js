import React, { Component } from "react";
import { connect } from "react-redux";
import { removeFromList } from "../../actions";
import Button from '../../components/Button';

class ListItem extends Component {
  handleRemoveClick = removeFromListId => {
    const { removeFromList, auth } = this.props;
    removeFromList(removeFromListId, auth.user.uid);
  };

  render() {
    const { itemId, item } = this.props;
    return (
      <li>
        <h4>
          {item.title}{" "}
          <Button
            onClick={() => this.handleRemoveClick(itemId)}
          >
            Remove
          </Button>
        </h4>
      </li>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps, { removeFromList })(ListItem);