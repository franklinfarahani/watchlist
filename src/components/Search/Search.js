import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Suggestions from './Suggestions';
import * as api from '../../utils/api';

const SearchContainer = styled.form`
  display: flex;
  flex-direction: column;
`

const SearchBarContainer = styled.div`
  background: transparent;
  display: flex;
  background: #eee;
  border-radius: 10px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);
`
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
`

const SearchBar = styled.input`
  background: transparent;
  border: none;
  box-sizing: border-box;
  color: #000000;
  display: block;
  line-height: 80px;
  font-size: 40px;
  font-weight: 100;
  margin: 0;
  min-width: 0;
  padding: 0;
  user-select: auto;
  appearance: none;
  box-flex: 1;
  flex: 1;
`

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.searchTitles = this.searchTitles.bind(this);
    
    this.typingTimeout = null;

    this.state = {
      query: '',
      results: [],
      isLoading: false,
      error: null
    }

  }

  // Searches theMovieDB and filters out actors
  searchTitles(query) {
    api.search(query)
      .then((data) => {
        const filteredResults = data.results.filter(item => item.media_type !== "person");
        this.setState({ results: filteredResults, isLoading: false })
      })
      .catch(error => this.setState({ error, isLoading: false }))
  }

  handleChange(e) {
    clearTimeout(this.typingTimeout);

    this.setState({
      query: e.target.value,
      isLoading: true
    });

    // setTimeout requires arrow function
    if (e.target.value && e.target.value.length > 1) {
      this.typingTimeout = setTimeout(()=>this.searchTitles(this.state.query), 1000)
    }
    else this.setState({
      results: [], isLoading: false
    })
  }

  handleKeyDown(e) {
    // Pressing Enter
    if (e.keyCode === 13) {
      e.preventDefault();
      this.searchTitles(this.state.query)
    }
  }

  render() {
    return (
      <SearchContainer>
        <SearchBarContainer>
          <IconContainer>
            <FontAwesomeIcon icon ='search' />
          </IconContainer>          
          <SearchBar
            type = "search"
            placeholder = "Search..."
            ref = {input => this.search = input}
            onChange = {this.handleChange}
            onKeyDown = {this.handleKeyDown}
          />
          <IconContainer>
            <FontAwesomeIcon icon ='spinner' />
          </IconContainer>
          <IconContainer>
            <FontAwesomeIcon icon ='times' />
          </IconContainer>
        </SearchBarContainer>
        {this.state.query.length > 1 && 
          <Suggestions
            results={this.state.results}
            error={this.state.error}
            query={this.state.query}
            isLoading={this.state.isLoading}
          />
        }
      </SearchContainer>
    )
  }

}

export default Search;



