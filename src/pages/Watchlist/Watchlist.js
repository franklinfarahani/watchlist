import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ListItem from '../../components/ListItem/ListItem';
import ListItemSkeleton from '../../components/Skeleton/ListItemSkeleton';
import { map, isEmpty } from 'lodash';
import * as actions from '../../actions';

const WatchlistContainer = styled.div`
  /* TODO: get rid of space between search bar and watchlist */
  margin: 114px 0 0;
  width: 100%;
`

const WatchlistWrapper = styled.ul`
  background: transparent;
`

class Watchlist extends Component {

  componentDidMount() {
    const { user, fetchList } = this.props;
    user && fetchList(user.uid);
  }

  componentDidUpdate(prevProps) {
    if (this.props.watchlist.hasUpdated && prevProps.watchlist.hasUpdated !== this.props.watchlist.hasUpdated) {
      const { user, fetchList } = this.props;
      user && fetchList(user.uid);
    }
  }

  render() {
    const { watchlist } = this.props;
    
    const list = map(watchlist.list, (value, key) => {
      return <ListItem key={key} item={value} />;
    });
    
    return (
      <WatchlistContainer>
        {
          watchlist.isLoading ? 
          <Fragment>
            <ListItemSkeleton />
            <ListItemSkeleton />
            <ListItemSkeleton />
            <ListItemSkeleton />
            <ListItemSkeleton />
            <ListItemSkeleton />
            <ListItemSkeleton />
            <ListItemSkeleton />
          </Fragment> :
          !isEmpty(list) ? 
            <WatchlistWrapper>
              {list}
            </WatchlistWrapper> : 
            <div>
              <h4>List is empty.</h4>
              <p>Start by searching for titles and adding them to the list.</p>
            </div>
        }        
      </WatchlistContainer>
    );
  }
}

const mapStateToProps = ({ watchlist, auth }) => {
  return {
    watchlist,
    user: auth.user
  };
};

export default connect(mapStateToProps, actions)(Watchlist);