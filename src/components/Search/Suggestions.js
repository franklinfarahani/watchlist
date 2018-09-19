import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddToList from '../AddToList';
import { colors } from '../../config/styleVariables';

// Styles

const SuggestionsContainer = styled.div`
  background: ${colors.WHITE};
  margin: 8px 0;
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
  position: absolute;
  width: 100%;
  top: 85px;
`

const ResultList = styled.ul`
  background: transparent;
  margin: 0;
  padding: 0 16px;
`

const RowTextContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: space-around;
  padding-left: 16px;
`

const ResultRow = styled.li`
  background: transparent;
  list-style-type: none;
  display: flex;
  align-items: center;
  padding: 8px 16px;

  img {
    height: 60px;
  }

  &:hover {
    background: ${colors.bg.LIGHT};
    border-radius: 4px;
  }

  &:first-child {
    margin-top: 16px;
  }

  &:last-child {
    margin-bottom: 16px;
  }
`

const YearSpan = styled.span`
  font-weight: normal;
  padding: 0 5px;
  color: ${colors.subtitle.GREY};
`

const CategorySpan = styled.span`
  font-size: .8em;
`

const EmptyImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 40px;
  background: ${colors.bg.MEDIUM};
`

class Suggestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: true
    }
    this.handleClick= this.handleClick.bind(this);
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick(e) {
    if (this.node.contains(e.target) || this.node.previousSibling.contains(e.target)) {
      this.setState({display: true})
      this.props.isOpen(true);
      return;
    }
    this.setState({display: false})
    this.props.isOpen(false);
  }

  render() {
    const options = this.props.results.map(row => {
      const item = {
        id: row.id,
        media_type: row.media_type,
        title: row.media_type === 'movie' ? row.title : row.name,
        poster: row.poster_path,
        year: row.media_type === "movie" ? row.release_date : row.first_air_date,
        genre_ids: row.genre_ids,
        synopsis: row.overview
      };
      return (
        row.vote_count !== 0 &&
        <ResultRow key={item.id}>
          {item.poster ? 
            <img
              src = {`http://image.tmdb.org/t/p/w92${item.poster}`}
              alt = {`poster preview for ${item.title}`}
            />
            :
            <EmptyImage>
              <FontAwesomeIcon icon='image' color={colors.subtitle.GREY} />
            </EmptyImage>
          }
          <RowTextContainer>
            <strong>
              {item.title}
              <YearSpan>
                {item.year ? '(' + item.year.substring(0,4) + ')' : '(Unknown)'}
              </YearSpan>
            </strong>
            <CategorySpan>{item.media_type === "movie" ? "in movies" : "in TV shows"}</CategorySpan>
          </RowTextContainer>
          <AddToList
            item={ item }
          />
        </ResultRow>
      )
    })
  
    return (
      <SuggestionsContainer ref = {el => this.node = el}>
      {this.props.error && <p>An error occured. Please try again later.</p>}
      {/* If there are no results show the appropriate message */}
      {this.state.display ?
        this.props.results.length === 0 && this.props.query.length > 1 && !this.props.isLoading ? 
        <ResultList>
          <ResultRow>
            <strong>No results found.</strong>
          </ResultRow>
        </ResultList>
        : !this.props.isLoading &&
        <ResultList>
          {options}
        </ResultList>
      : null
      }
      </SuggestionsContainer>
    )
  }

}

export default Suggestions;