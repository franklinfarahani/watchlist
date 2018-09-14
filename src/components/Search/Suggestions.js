import React, {Component} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddToList from '../AddToList';
import {colors} from '../../utils/GlobalStyles';

// Styles

const SuggestionsContainer = styled.div`
  background: ${colors.bg.LIGHT};
  margin: 8px 0;
  border-radius: 10px;
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
    background: ${colors.PRIMARY};
    color: ${colors.WHITE};
    border-radius: 4px;
  
    ${RowTextContainer} {
      strong span {
        color: ${colors.subtitle.PINK};
      }
    }
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
    const options = this.props.results.map(row => (
      row.vote_count !== 0 &&
      <ResultRow key={row.id}>
        {row.poster_path ? 
          <img src = {`http://image.tmdb.org/t/p/w92${row.poster_path}`} alt={`poster preview for ${row.media_type === "movie" ? row.title : row.name}`} />
          :
          <EmptyImage>
            <FontAwesomeIcon icon='image' color={colors.subtitle.GREY} />
          </EmptyImage>
        }
        <RowTextContainer>
          <strong>
            {row.media_type === "movie" ? row.title : row.name}
            <YearSpan>
              {row.media_type === "movie" ?
                row.release_date ? '(' + row.release_date.substring(0,4) + ')' : '(Unknown)'
                :
                row.first_air_date ? '(' + row.first_air_date.substring(0,4) + ')' : '(Unknown)'
              }
            </YearSpan>
          </strong>
          <CategorySpan>{row.media_type === "movie" ? "in movies" : "in TV shows"}</CategorySpan>
        </RowTextContainer>
        <AddToList
          item={row.id}

        />
      </ResultRow>
    ))
  
    return (
      <SuggestionsContainer innerRef = {el => this.node = el}>
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