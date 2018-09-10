import React, {Component} from 'react';
import styled from 'styled-components';
import {imagesLoaded} from '../../utils';
import {colors} from '../../utils/GlobalStyles';

const ResultList = styled.ul`
  background: transparent;
  padding: 8px 16px;
  margin: 0;
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
`

const RowTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;
  padding-left: 16px;
`

const YearSpan = styled.span`
  font-weight: normal;
  padding: 0 5px;
  color: ${colors.subtitle.GREY};
`

const CategorySpan = styled.span`
  font-size: .8em;
`

class Suggestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgLoading: true
    }
  }

  render() {
    const options = this.props.results.map(row => (
      <ResultRow key={row.id}>
        <img src = {`http://image.tmdb.org/t/p/w92${row.poster_path}`} alt={`poster preview for ${row.media_type === "movie" ? row.title : row.name}`} />
        <RowTextContainer>
          <strong>
            {row.media_type === "movie" ? row.title : row.name}
            <YearSpan>{row.media_type === "movie" ? '(' + row.release_date.substring(0,4) + ')' : '(' + row.first_air_date.substring(0,4) + ')' } </YearSpan>
          </strong>
          <CategorySpan>{row.media_type === "movie" ? "in movies" : "in TV shows"}</CategorySpan>
        </RowTextContainer>
      </ResultRow>
    ))
  
    return <div>
      {this.props.error && <p>An error occured. Please try again later.</p>}
  
      {/* Loading animation/spinner */}
      {this.props.isLoading && <p>Loading...</p>}
  
      {/* If there are no results show the appropriate message */}
      {this.props.results.length === 0 && this.props.query.length > 1 && this.props.isLoading === false ? 
        <ResultRow>
          <strong>No results found.</strong>
        </ResultRow>
          : 
        <ResultList>
          {options}
        </ResultList>}
    </div>
  }

}

export default Suggestions;