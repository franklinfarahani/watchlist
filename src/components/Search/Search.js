import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Suggestions from './Suggestions';
import SearchBackdrop from './SearchBackdrop'
import * as api from '../../utils/api';
import MDSpinner from 'react-md-spinner';
import { colors } from '../../utils/GlobalStyles';

const SearchContainer = styled.div`

`

const FormContainer = styled.form`
  z-index: 1001;
  display: flex;
  flex-direction: column;
  position: relative;
`

const SearchBarContainer = styled.div`
  background: transparent;
  display: flex;
  background: ${colors.bg.LIGHT};
  border: solid 3px transparent;
  border-radius: 10px;
  box-shadow: 0 2px 6px 0 hsla(0, 0%, 0%, 0.2);

  &:focus-within {
    border: solid 3px ${colors.PRIMARY};
  }
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
  color: ${colors.BLACK};
  display: block;
  line-height: 80px;
  font-size: 40px;
  font-weight: 200;
  margin: 0;
  min-width: 0;
  padding: 0;
  appearance: none;
  flex: 1;
  &::placeholder {
    color: ${colors.subtitle.GREY}
  }
`

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur= this.handleBlur.bind(this);
    this.handleOpen= this.handleOpen.bind(this);
    this.searchTitles = this.searchTitles.bind(this);
    this.clearInput = this.clearInput.bind(this);
    
    this.typingTimeout = null;

    this.state = {
      query: '',
      results: [],
      isLoading: false,
      isFocused:false,
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
      this.typingTimeout = setTimeout(()=>this.searchTitles(this.state.query), 600)
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

  handleFocus() {
    this.setState({ isFocused : true});
  }

  handleBlur() {
    console.log(this.state.query.length);
    if (this.state.query.length<2){
      this.setState({ isFocused : false});
    }
  }

  handleOpen(e) {
    this.search.focus();
    this.setState({ isFocused : e});
  }

  clearInput(e) {
    e.preventDefault();
    this.search.value = '';
    this.setState({
      query: '',
      results: [],
      isFocused: true
    })
    this.search.focus();
  }
  

  render() {
    return (
      <SearchContainer>
        <SearchBackdrop isFocused={this.state.isFocused}/>
        <FormContainer id='search-form'>
          <SearchBarContainer>
            <IconContainer>
              <FontAwesomeIcon
                icon ='search'
                size ='lg'
              />
            </IconContainer>
            <SearchBar
              type = "search"
              placeholder = "Search Database..."
              ref = {input => this.search = input}
              onChange = {this.handleChange}
              // onFocus = {this.handleFocus}
              // onBlur = {this.handleBlur}
              onKeyDown = {this.handleKeyDown}
            />
            <IconContainer>
              {this.state.isLoading && 
                <MDSpinner singleColor={colors.PRIMARY} />
              }
            </IconContainer>
            {this.state.query.length !==0 &&
              <button name="clearInput" onClick={this.clearInput}>
                <IconContainer>
                <FontAwesomeIcon
                icon ='times'
                size ='lg'
              />
                </IconContainer>
              </button>
            }
          </SearchBarContainer>

            <Suggestions
              results={this.state.results}
              error={this.state.error}
              query={this.state.query}
              isLoading={this.state.isLoading}
              isOpen={this.handleOpen}
            />
         
        </FormContainer>
      </SearchContainer>
    )
  }

}

export default Search;



