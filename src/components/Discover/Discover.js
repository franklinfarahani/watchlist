import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { select } from '../../config/styleVariables';
import DiscoverResults from './DiscoverResults';
import Container from '../../components/Container';
import GenreSelect from '../../components/GenreSelect'
import genres from '../../config/genreIds.json';

// TODO: build filtering system using react-select
// TODO: build dropdown for sorting by Release date, Aggregate Rating

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 29px;

  & > h4 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  & > div {
    width: 100%;
    flex-direction: row;
  }
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

    this.handleGenreChange = this.handleGenreChange.bind(this);
  }

  //TODO: add componentDidMount and componentDidUpdate for parsing location prop changes

  handleGenreChange(newSelectedGenres){
    this.setState({selectedGenres: newSelectedGenres.map(genre => genre.value)})
  }

  render() {
    const { selectedGenres, selectedProviders, page, pageSize } = this.state;
    const { mediaType } = this.props;
    
    return (
      <Container>
        <Controls>
          <h4>Explore {mediaType === 'movie' ? 'Movies' : 'TV Shows'}</h4>
          <div>
            <GenreSelect
              isMulti
              options={genres}
              onChange={this.handleGenreChange}
              closeMenuOnSelect={false}
              placeholder={'Select genre...'}
              className="select-container"
              classNamePrefix={select}
            />
          </div>
        </Controls> 
        <DiscoverResults
          mediaType={mediaType}
          selectedGenres={selectedGenres}
          selectedProviders={selectedProviders}
          page={page}
          pageSize={pageSize}
        />
      </Container>
    );
  }
}

const mapStateToProps = ({ discover }) => {
  return {
    results: discover.results,
    page: discover.page,
    pageSize: discover.pageSize,
    totalPages: discover.totalPages,
    totalResults: discover.totalResults,
    isLoading: discover.isLoading,
    error: discover.error,
  };
};

export default connect(mapStateToProps)(Discover);