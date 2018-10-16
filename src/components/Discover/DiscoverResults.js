import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actions from '../../actions';
import { colors, shadows } from '../../config/styleVariables';
import ListItemSkeleton from '../../components/Skeleton/ListItemSkeleton';
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

  h3 {
    font-size: 13px;
    font-weight: 500;
    line-height: 1.2;
    padding: 11px 12px;
    color: ${colors.BLACK};

    span {
      color: ${colors.subtitle.MEDIUM};
    }
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
  padding-top: 114px;
`

class DiscoverResults extends Component {
  constructor(props) {
    super(props);

    this.renderSkeleton = this.renderSkeleton.bind(this);
  }
  
  componentDidMount() {
    const { mediaType, discoverTitles, selectedGenres, selectedProviders, page, pageSize } = this.props;
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
    const { mediaType, discoverTitles, selectedGenres, selectedProviders, page, pageSize } = this.props;
    console.log(selectedGenres);
    console.log(prevProps.selectedGenres);
    if (selectedGenres !== prevProps.selectedGenres || selectedProviders !== prevProps.selectedProviders) {
      const options = {
        mediaType,
        genres: selectedGenres.length !== 0 ? JSON.stringify(selectedGenres) : null,
        providers: selectedProviders.length !== 0 ? JSON.stringify(selectedProviders) : null,
        page,
        pageSize
      }
      discoverTitles(options);
    }
  }

  renderSkeleton(number){
    let loaders = [...Array(number).keys()]
    return loaders.map((key) => <ListItemSkeleton key={key}/>)
  }

  render (){
    const { results, isLoading } = this.props;
    const list = results.map((value, key) => 
      <DiscoverItem key={key}>
        <img
          src = {`https://images.justwatch.com${value.poster}s166`}
          alt = {`poster preview for ${value.title}`}
        />
        <h3>
          {value.title} 
          <span>
            {` (${value.year})`}
          </span>
        </h3>
      </DiscoverItem>);

      return (
        isLoading ? 
          <SkeletonWrapper>  
            {this.renderSkeleton(8)}
          </SkeletonWrapper> :
          (results.length !== 0) ?
            <Fragment>
              <ListWrapper>
                {list}
              </ListWrapper>
            </Fragment> : 
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

const mapStateToProps = ({ discover }) => {
  return {
    results: discover.results,
    isLoading: discover.isLoading,
    error: discover.error
  };
};

export default connect(mapStateToProps, actions)(DiscoverResults);