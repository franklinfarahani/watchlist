import React, { Component } from "react";
import { connect } from "react-redux";
import { removeFromList } from "../../actions";

class ListItem extends Component {
  handleRemoveClick = removeFromListId => {
    const { removeFromList, auth } = this.props;
    removeFromList(removeFromListId, auth.uid);
  };

  render() {
    const { itemId, item } = this.props;
    return (
      <li>
        <h4>
          {item.title}{" "}
          <span
            onClick={() => this.handleRemoveClick(itemId)}
          >
            Remove
          </span>
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