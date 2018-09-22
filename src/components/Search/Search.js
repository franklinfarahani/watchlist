import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import {Search as faSearch} from 'styled-icons/fa-solid/Search';
import {Close as mdClose} from 'styled-icons/material/Close';
import Suggestions from './Suggestions';
import SearchBackdrop from './SearchBackdrop'
import * as api from '../../utils/api';
import MDSpinner from 'react-md-spinner';
import { colors } from '../../config/styleVariables';


const FormContainer = styled.form`
  z-index: 1001;
  display: flex;
  flex-direction: column;
  position: relative;
`

const SearchBarContainer = styled.div`
  background: transparent;
  display: flex;
  background: ${colors.WHITE};
  border: solid 3px transparent;
  border-radius: 4px;
  box-shadow: 0 10px 30px 2px hsla(0, 0%, 0%, 0.15);

  /* &:focus-within {
    border: solid 3px ${colors.PRIMARY};
  } */
`
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
`

const IconSearch = styled(faSearch)`
  color: ${colors.subtitle.MEDIUM};
  width: 24px;
`

const IconClose = styled(mdClose)`
  color: ${colors.BLACK};
  width: 32px;
`

const SearchBar = styled.input`
  background: transparent;
  border: none;
  box-sizing: border-box;
  color: ${colors.BLACK};
  display: block;
  line-height: 80px;
  font-size: 32px;
  font-weight: 200;
  margin: 0;
  min-width: 0;
  padding: 0;
  appearance: none;
  flex: 1;
  &::placeholder {
    color: ${colors.subtitle.LIGHT}
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
    this.setState({ isFocused : false});
  }

  handleOpen(e) {
    e && this.search.focus();
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
      <Fragment>
        <SearchBackdrop isFocused={this.state.isFocused}/>
        <FormContainer id='search-form'>
          <SearchBarContainer>
            <IconContainer>
              <IconSearch title='Search Icon' />
            </IconContainer>
            <SearchBar
              type = "search"
              placeholder = "Search Database..."
              ref = {input => this.search = input}
              onChange = {this.handleChange}
              onFocus = {this.handleFocus}
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
                  <IconClose title='Close Icon' />
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
              isFocused={this.state.isFocused}
            />
         
        </FormContainer>
      </Fragment>
    )
  }

}

export default Search;



