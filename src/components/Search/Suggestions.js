import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {Image as faImage} from 'styled-icons/fa-regular/Image';
import {Movie as IconMovie} from 'styled-icons/material/Movie';
import {Tv as IconTV} from 'styled-icons/material/Tv';
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
  
  h4{
    font-weight: 600;
    margin-bottom: 4px;
  }

  span {
    color: ${colors.subtitle.MEDIUM}
    margin-top: 4px;
  }
`

const ResultRow = styled.li`
  background: transparent;
  list-style-type: none;
  display: flex;
  align-items: center;
  padding: 8px 16px;

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex: 1;
    align-items: center;

    img {
      width: 40px;
      height: 60px;
    }
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
  color: ${colors.subtitle.MEDIUM};
`

const CategorySpan = styled.span`
  font-size: .8em;
  svg {
    width: 14px;
  }
`

const EmptyImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 40px;
  background: ${colors.bg.MEDIUM};
`

const IconImage = styled(faImage)`
  color: ${colors.subtitle.MEDIUM};
  width: 24px;
`

class Suggestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: true
    }
    this.handleClick= this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isFocused !== prevProps.isFocused && this.props.isFocused) {
      document.addEventListener('mousedown', this.handleClick, false);
      this.setState({display: true})
    } else if (this.props.isFocused !== prevProps.isFocused){
      document.removeEventListener('mousedown', this.handleClick, false);
      this.props.isOpen(false);
    }
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
      return (
        row.vote_count !== 0 &&          
          <ResultRow key={row.id}>
            <Link to={`/${row.media_type}/${row.id}-${row.slug}`}>
              {row.poster ? 
                <img
                  src = {`https://images.justwatch.com${row.poster}s166`}
                  alt = {`poster preview for ${row.title}`}
                />
                :
                <EmptyImage>
                  <IconImage title='No Image Icon' />
                </EmptyImage>
              }
              <RowTextContainer>
                <h4>
                  {row.title}
                  <YearSpan>
                    {row.year ? `(${row.year})` : '(TBA)'}
                  </YearSpan>
                </h4>
                <CategorySpan>
                  {
                    row.media_type === "movie" ?
                    <Fragment><IconMovie /> movie</Fragment> :
                    <Fragment><IconTV /> tv show</Fragment>
                  }
                </CategorySpan>
              </RowTextContainer>
          <AddToList
            item={{ id: row.id, media_type: row.media_type }}
            callback={ () => {this.setState({ display: false }); this.props.isOpen(false);}  }
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