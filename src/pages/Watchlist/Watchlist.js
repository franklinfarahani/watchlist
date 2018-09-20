import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { colors } from '../../config/styleVariables';
import ListItem from '../../components/ListItem/ListItem';
import { map, isEmpty } from 'lodash';
import * as actions from '../../actions';

const WatchlistContainer = styled.div`
  background: ${colors.WHITE};
  /* TODO: get rid of space between search bar and watchlist */
  margin: 110px 0; 
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  width: 100%;
`

const WatchlistWrapper = styled.ul`
  background: transparent;
  margin: 0;
  padding: 0 16px;
`

class Watchlist extends Component {

  componentDidMount() {
    const { user, fetchList } = this.props;
    user && fetchList(user.uid);
  }

  render() {
    const { data } = this.props;
    
    if (data.isLoading) {
      return (
        <h3>Getting List...</h3>
      );
    }
    
    const list = map(data.list, (value, key) => {
      return <ListItem key={key} itemId={value.id} item={value} />;
    });
    
    if (!isEmpty(list)) {
      return (
      <WatchlistContainer>
        <WatchlistWrapper>
          {list}
        </WatchlistWrapper>        
      </WatchlistContainer>
      );
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
    user: auth.user
  };
};

export default connect(mapStateToProps, actions)(Watchlist);