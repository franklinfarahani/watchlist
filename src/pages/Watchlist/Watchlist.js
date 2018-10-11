import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ListItem from '../../components/ListItem/ListItem';
import ListItemSkeleton from '../../components/Skeleton/ListItemSkeleton';
import * as actions from '../../actions';
import Tab, {TabGroup} from '../../components/Tab';

const WatchlistContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0;
  width: 100%;
`

const Controls = styled.div`
  display: flex;
  align-items:center;
  padding: 29px;
`

const WatchlistWrapper = styled.ul`
  background: transparent;
`

class Watchlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMedia: 'All',
    }

    this.renderSkeleton = this.renderSkeleton.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

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

  handleCategoryChange(category){
    this.setState({selectedMedia: category})   
  }

  renderSkeleton(number){
    let loaders = [...Array(number).keys()]
    return loaders.map((key) => <ListItemSkeleton key={key}/>)
  }

  render() {
    const { watchlist } = this.props;
    const { selectedMedia } = this.state;
    
    const filteredList = selectedMedia === 'All' ?
      watchlist.list :
        selectedMedia === 'Movies' ?
        watchlist.list.filter(item => item.media_type === 'movie') :
        watchlist.list.filter(item => item.media_type === 'show');
      
    const list = filteredList.map((value, key) => <ListItem key={key} item={value} />);
    
    return (
      <WatchlistContainer>
        <Controls>
          <TabGroup name="mediaTypes">
            <Tab label="All" defaultChecked onChange={() => this.handleCategoryChange('All')}/>
            <Tab label="Movies" onChange={() => this.handleCategoryChange('Movies')} />
            <Tab label="TV" onChange={() => this.handleCategoryChange('TV')} />
          </TabGroup>
        </Controls>
                
        {
          watchlist.isLoading ? 
          <Fragment>
            {this.renderSkeleton(8)}
          </Fragment> :
          (list.length !== 0) ? 
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