import React, { Component } from 'react';
import Suggestions from './Suggestions';
import * as api from '../../utils/api';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
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

    if (e.target.value && e.target.value.length > 1) {
      this.typingTimeout = setTimeout(()=>this.searchTitles(this.state.query), 1000)
    }
    else this.setState({
      results: [], isLoading: false
    })
  }

  render() {
    return (
      <form>
        <input
          type = "search"
          placeholder = "Search..."
          ref = {input => this.search = input}
          onChange = {this.handleChange}
        />
        <Suggestions
          results={this.state.results}
          error={this.state.error}
          query={this.state.query}
          isLoading={this.state.isLoading}
        />
      </form>
    )
  }

}

export default Search;



