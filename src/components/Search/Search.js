import React, { Component } from 'react';
import Suggestions from './Suggestions';
import * as api from '../../utils/api';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.searchTitles = this.searchTitles.bind(this);
  }

  state = {
    query: '',
    results: [],
    isLoading: false,
    error: null
  }

  componentWillMount() {
    this.timer = null;
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

  handleChange() {
    clearTimeout(this.timer);
    this.setState({
      query: this.search.value,
      isLoading: true
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        setTimeout(this.searchTitles(this.state.query), 5000);
      }
      else this.setState({ results: [], isLoading: false })
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
        />
      </form>
    )
  }

}

export default Search;



