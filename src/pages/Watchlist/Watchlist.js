import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from '../../components/ListItem/ListItem';
import { map, isEmpty } from 'lodash';
import * as actions from '../../actions';

class Watchlist extends Component {

  componentDidMount() {
    const { auth, fetchList } = this.props;
    fetchList(auth.user.uid);
  }

  render() {
    if (this.props.data.isLoading) {
      return (
        <div>
          <div>
            Loading...
          </div>
        </div>
      );
    }

    const { data } = this.props;
    const list = map(data.list, (value, key) => {
      return <ListItem key={key} itemId={value.id} item={value} />;
    });
    
    if (!isEmpty(list)) {
      return <ul>{list}</ul>;
    }
    return (
      <div>
        <h4>List is empty.</h4>
        <p>Start by searching for titles and adding them to the list.</p>
      </div>
    );
  }
}

const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

export default connect(mapStateToProps, actions)(Watchlist);