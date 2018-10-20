import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ListItem from '../../components/ListItem/ListItem';
import { colors } from '../../config/styleVariables';
import ListItemSkeleton from '../../components/Skeleton/ListItemSkeleton';
import {fetchList} from '../../actions';
import Container from '../../components/Container';
import Tab, {TabGroup} from '../../components/Tab';
import {Info as mdInfo} from 'styled-icons/material/Info';

// TODO: build filtering system using react-select
// TODO: build dropdown for sorting by Name, Date Added, Release date, Aggregate Rating

const IconInfo = styled(mdInfo)`
  color: ${colors.subtitle.MEDIUM};
  width: 60px;
`

const EmptyList = styled.div`
  display: flex;
  height: 236px;
  border-radius: 4px;
  border: dashed 3px ${colors.subtitle.MEDIUM};
  margin-top: 114px;

  div {
    display: flex;
    align-items: center;
    flex: 1;
    
    div {
      display: flex;
      flex-direction: column;
      align-items: center;

      h4 {    
        font-size: 18px;
        font-weight: 700;
        line-height: 36px;
        color: ${colors.subtitle.MEDIUM}
      }

      p {
        font-size: 14px;
        line-height: 22px;
        color: ${colors.subtitle.MEDIUM}
        width: 200px;
        text-align: center;
      }
    }
  }
`

const Controls = styled.div`
  display: flex;
  align-items:center;
  padding: 29px;
`

const WatchlistWrapper = styled.ul`
  background: transparent;
`

const SkeletonWrapper = styled.div`
  padding-top: 114px;
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
      <Container>                
        {
          watchlist.isLoading ? 
          <SkeletonWrapper>  
            {this.renderSkeleton(8)}
          </SkeletonWrapper> :
          (list.length !== 0) ?
          <Fragment>
            <Controls>
              <TabGroup name="mediaTypes">
                <Tab label="All" defaultChecked onChange={() => this.handleCategoryChange('All')}/>
                <Tab label="Movies" onChange={() => this.handleCategoryChange('Movies')} />
                <Tab label="TV" onChange={() => this.handleCategoryChange('TV')} />
              </TabGroup>
            </Controls> 
            <WatchlistWrapper>
              {list}
            </WatchlistWrapper>
          </Fragment>
           : 
            <EmptyList>
              <div>
                <div>
                  <IconInfo title='Info Icon' />
                  <h4>List is empty.</h4>
                  <p>Start by searching for titles and adding them to your list!</p>
                </div>
              </div>              
            </EmptyList>
        }        
      </Container>
    );
  }
}

const mapStateToProps = ({ watchlist, auth }) => {
  return {
    watchlist,
    user: auth.user
  };
};

export default connect(mapStateToProps, {fetchList})(Watchlist);