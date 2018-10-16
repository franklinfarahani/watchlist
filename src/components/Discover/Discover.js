import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actions from '../../actions';

import { colors, shadows, select } from '../../config/styleVariables';
import ListItemSkeleton from '../../components/Skeleton/ListItemSkeleton';
import Container from '../../components/Container';
import GenreSelect from '../../components/GenreSelect'
import genres from '../../config/genreIds.json';
import {Info as mdInfo} from 'styled-icons/material/Info';

// TODO: build filtering system using react-select
// TODO: build dropdown for sorting by Release date, Aggregate Rating

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
  flex-direction: column;
  align-items: flex-start;
  padding: 29px;

  & > h4 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  & > div {
    width: 100%;
    flex-direction: row;
  }
`

const DiscoverWrapper = styled.ul`
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

const SkeletonWrapper = styled.div`
  padding-top: 114px;
`

class Discover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGenres: [],
      selectedProviders: [],
      sortBy: 'release_date',
      page: 1,
      pageSize: 16
    }

    this.renderSkeleton = this.renderSkeleton.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
  }

  componentDidMount() {
    const { mediaType, discoverTitles } = this.props;
    const { selectedGenres, selectedProviders, page, pageSize } = this.state;
    const options = {
      mediaType,
      genres: selectedGenres.length !== 0 ? JSON.stringify(selectedGenres) : null,
      providers: selectedProviders.length !== 0 ? JSON.stringify(selectedProviders) : null,
      page,
      pageSize
    }
    discoverTitles(options);
  }

  componentDidUpdate(prevProps, prevState) {
    const { mediaType, discoverTitles } = this.props;
    const { selectedGenres, selectedProviders, page, pageSize } = this.state;
    if (selectedGenres !== prevState.selectedGenres || selectedProviders !== prevState.selectedProviders) {
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

  handleGenreChange(){
    console.log('Do a thing');
    // this.setState({selectedMedia: category})   
  }

  renderSkeleton(number){
    let loaders = [...Array(number).keys()]
    return loaders.map((key) => <ListItemSkeleton key={key}/>)
  }

  render() {
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
      <Container>                
        {
          isLoading ? 
          <SkeletonWrapper>  
            {this.renderSkeleton(8)}
          </SkeletonWrapper> :
          (results.length !== 0) ?
          <Fragment>
            <Controls>
              <h4>Filter Results</h4>
              <div>
                <GenreSelect
                  isMulti
                  closeMenuOnSelect={false}              
                  options={genres}
                  placeholder={'Select genre...'}
                  className='select-container'
                  classNamePrefix={select}
                />
              </div>
            </Controls> 
            <DiscoverWrapper>
              {list}
            </DiscoverWrapper>
          </Fragment>
           : 
            <EmptyList>
              <div>
                <div>
                  <IconInfo title='Info Icon' />
                  <h4>No Results Found.</h4>
                  <p>Please re-adjust your filter values.</p>
                </div>
              </div>              
            </EmptyList>
        }        
      </Container>
    );
  }
}

const mapStateToProps = ({ discover }) => {
  return {
    results: discover.results,
    isLoading: discover.isLoading,
    error: discover.error
  };
};

export default connect(mapStateToProps, actions)(Discover);