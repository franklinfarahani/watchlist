import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { searchTitles, clearResults } from '../../actions';
import styled from 'styled-components';
import {Search as faSearch} from 'styled-icons/fa-solid/Search';
import {Close as mdClose} from 'styled-icons/material/Close';
import Suggestions from './Suggestions';
import SearchBackdrop from './SearchBackdrop'
import MDSpinner from 'react-md-spinner';
import { colors, shadows } from '../../config/styleVariables';


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
  box-shadow: ${shadows.VERYHIGH};
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
    this.clearInput = this.clearInput.bind(this);
    
    this.typingTimeout = null;

    this.state = {
      query: '',
      isBuffering: false,
      isFocused:false
    }

  }

  componentDidUpdate(prevProps){
    const { pathname } = this.props.location;
    if(pathname !== prevProps.location.pathname){
      this.search.value = '';
      this.props.clearResults();
      this.setState({
        query: '',
        isFocused: false
      })
    }
  }

  handleChange(e) {
    clearTimeout(this.typingTimeout);

    this.setState({
      query: e.target.value,
      isBuffering: true
    });

    // setTimeout requires arrow function
    if (e.target.value && e.target.value.length > 1) {
      this.typingTimeout = setTimeout(()=>{
        this.props.searchTitles(this.state.query)
        this.setState({isBuffering: false})
      }, 500)
    }
    else this.setState({isBuffering: false})
  }

  handleKeyDown(e) {
    // Pressing Enter
    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.searchTitles(this.state.query)
      this.setState({isBuffering: false})
    }
  }

  handleFocus() {
    this.setState({isFocused : true});
  }

  handleBlur() {
    this.setState({isFocused : false});
  }

  handleOpen(e) {
    e && this.search.focus();
    this.setState({isFocused : e});
  }

  clearInput(e) {
    e.preventDefault();
    this.search.value = '';
    this.props.clearResults();
    this.setState({
      query: '',
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
              {(this.state.isBuffering || this.props.isLoading) && 
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
              results={this.props.results}
              error={this.props.error}
              query={this.state.query}
              isLoading={this.state.isBuffering || this.props.isLoading}
              isOpen={this.handleOpen}
              isFocused={this.state.isFocused}
            />
         
        </FormContainer>
      </Fragment>
    )
  }

}

const mapStateToProps = ({ search }) => {
  return {
    results: search.results,
    isLoading: search.isLoading,
    error: search.error
  };
};

export default connect(mapStateToProps, { searchTitles, clearResults })(Search);



