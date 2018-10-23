import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import Paginate from 'react-paginate'; 

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
    this.handlePageChange = this.handlePageChange.bind(this);
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

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.props.location;
    const { page, selectedGenres } = this.state;
    const { history } = this.props;
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

    // Check to see if state has changed. If it has, create new query from them to be pushed on the history stack
    if (page !== prevState.page || selectedGenres !== prevState.selectedGenres){
      const query = {
        genres: selectedGenres
      }

      // if current page is 1 do not display it in the address
      if (page !== 1) {
        query.page = page;
      }
      // query needs to be properly formatted and stringified from object to string
      const stringifiedQuery = queryString.stringify(query);
      history.push({
        search: stringifiedQuery,
      })
    }
  }

  handleGenreChange(newSelectedGenres){
    // Convert the object returned from react-select to only its value
    // Reset current page is genre is changed for better UX
    const genreValues = newSelectedGenres.map(genre => genre.value);
    this.setState({
      selectedGenres: genreValues.length !== 0 ? JSON.stringify(genreValues) : '',
      page: 1
    })
  }

  handlePageChange(newPage){
    this.setState({page: newPage.selected !== 0 ? newPage.selected + 1 : ''})
  }

  render() {
    const { selectedGenres, selectedProviders, page, pageSize } = this.state;
    const { mediaType, totalPages } = this.props;
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
        <Paginate
          previousLabel={<div>prev</div>}
          nextLabel={"next"}
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={4}
          onPageChange={this.handlePageChange}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
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