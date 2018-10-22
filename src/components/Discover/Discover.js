import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import styled from 'styled-components';
import { select } from '../../config/styleVariables';
import DiscoverResults from './DiscoverResults';
import Container from '../../components/Container';
import GenreSelect from '../../components/GenreSelect'
import genres from '../../config/genreIds.json';

// TODO: fix default values for react-select
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

  componentDidMount() {
    const { search } = this.props.location;
    const parsed = queryString.parse(search);
    this.setState({
      selectedGenres: parsed.genres ? parsed.genres : [],
      selectedProviders: parsed.providers ? parsed.providers : [],
      sortBy: parsed.sort_by ? parsed.sort_by : 'release_date',
      page: parsed.page ? parsed.page : 1,
      pageSize: parsed.page_size ? parsed.page_size : 16
    })
  }

  componentDidUpdate(prevProps) {
    const { search } = this.props.location;
    if (search !== prevProps.location.search) {
      const parsed = queryString.parse(search);
      this.setState({
        selectedGenres: parsed.genres || [],
        selectedProviders: parsed.providers || [],
        sortBy: parsed.sort_by || 'release_date',
        page: parsed.page || 1,
        pageSize: parsed.page_size || 16
      })
    }
  }

  handleGenreChange(newSelectedGenres){
    const { history } = this.props;
    const genreValues = newSelectedGenres.map(genre => genre.value);
    // this.setState({selectedGenres: genreValues})
    history.push({
      search: genreValues.length !== 0 ? `?genres=${JSON.stringify(genreValues)}` : ''
    })
  }

  render() {
    const { selectedGenres, selectedProviders, page, pageSize } = this.state;
    const { mediaType } = this.props;
    const genresObject = selectedGenres.length !== 0 ?
      JSON.parse(selectedGenres)
        .map(selectedGenre => genres[genres.findIndex(genre => genre.value === selectedGenre)]) : [];

    return (
      <Container>
        <Controls>
          <h4>Explore {mediaType === 'movie' ? 'Movies' : 'TV Shows'}</h4>
          <div>
            <GenreSelect
              isMulti
              options={genres}
              value={genresObject}
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

export default withRouter(connect(mapStateToProps)(Discover));