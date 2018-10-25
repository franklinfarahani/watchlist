import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchList, discoverTitles } from '../../actions';
import { colors, shadows, media } from '../../config/styleVariables';
import DiscoverItemSkeleton from '../../components/Skeleton/DiscoverItemSkeleton';
import Img from '../../components/Img';
import AddToList from '../AddToList';
import {Info as mdInfo} from 'styled-icons/material/Info';

const IconInfo = styled(mdInfo)`
  color: ${colors.subtitle.MEDIUM};
  width: 60px;
`

const ListWrapper = styled.ul`
  background: transparent;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  ${media.phone`justify-content: space-evenly;`}
`

const DiscoverItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 166px;
  background-color: ${colors.WHITE};
  margin-bottom: 16px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: ${shadows.VERYLOW};
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 67px;
  padding: 11px 12px;

  h3 {
    font-size: 13px;
    font-weight: 500;
    line-height: 1.2;
    color: ${colors.BLACK};

    span {
      color: ${colors.subtitle.MEDIUM};
    }
  }

  button {
    align-self: flex-end;
  }
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

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  ${media.phone`justify-content: space-evenly;`}
`

class DiscoverResults extends Component {
  constructor(props) {
    super(props);

    this.renderSkeleton = this.renderSkeleton.bind(this);
  }
  
  componentDidMount() {
    const { mediaType, discoverTitles, selectedGenres, selectedProviders, page, pageSize, user, fetchList } = this.props;
    user && fetchList(user.uid);
    const options = {
      mediaType,
      genres: selectedGenres.length !== 0 ? JSON.stringify(selectedGenres) : null,
      providers: selectedProviders.length !== 0 ? JSON.stringify(selectedProviders) : null,
      page,
      pageSize
    }
    discoverTitles(options);
  }

  componentDidUpdate(prevProps) {
    const { mediaType, discoverTitles, selectedGenres, selectedProviders, page, pageSize, watchlist } = this.props;
    if (watchlist.hasUpdated && prevProps.watchlist.hasUpdated !== watchlist.hasUpdated) {
      const { user, fetchList } = this.props;
      user && fetchList(user.uid);
    }
    if (selectedGenres !== prevProps.selectedGenres || selectedProviders !== prevProps.selectedProviders) {
      const options = {
        mediaType,
        genres: selectedGenres.length !== 0 ? selectedGenres : null,
        providers: selectedProviders.length !== 0 ? JSON.stringify(selectedProviders) : null,
        page,
        pageSize
      }
      discoverTitles(options);
    }
  }

  renderSkeleton(number){
    let loaders = [...Array(number).keys()]
    return loaders.map((key) => <DiscoverItemSkeleton key={key}/>)
  }

  render (){
    const { results, isLoading } = this.props;
    const list = results.map((value, key) => 
      <DiscoverItem key={key}>
        <Link to={`/${value.media_type}/${value.id}-${value.slug}`}>
          <Img
            src = {value.poster && `https://images.justwatch.com${value.poster}s166`}
            alt = {`poster preview for ${value.title}`}
          />
        </Link>
          <CardBody>
            <h3>
              {value.title} 
              <span>
                {` (${value.year})`}
              </span>            
            </h3>
            <AddToList
              item={{ id: value.id, media_type: value.media_type }}
            />
          </CardBody>    
      </DiscoverItem>);

      return (
        isLoading ? 
          <SkeletonWrapper>  
            {this.renderSkeleton(16)}
          </SkeletonWrapper> :
          (results.length !== 0) ?
            <ListWrapper>
              {list}
            </ListWrapper> : 
            <EmptyList>
              <div>
                <div>
                  <IconInfo title='Info Icon' />
                  <h4>No Results Found.</h4>
                  <p>Please re-adjust your filter values.</p>
                </div>
              </div>              
            </EmptyList>
      )
      
  }
  
}

const mapStateToProps = ({ discover, auth, watchlist }) => {
  return {
    results: discover.results,
    isLoading: discover.isLoading,
    error: discover.error,
    user: auth.user,
    watchlist
  };
};

export default connect(mapStateToProps, { fetchList, discoverTitles })(DiscoverResults);