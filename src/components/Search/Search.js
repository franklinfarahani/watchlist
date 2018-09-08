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
    results: []
  }

  // Searches theMovieDB and filters out actors
  searchTitles(query) {
    return api.search(query)
      .then((data) => {
        const filteredResults = data.results.filter(item => item.media_type !== "person");
        this.setState({ results: filteredResults })
      })
  }

  handleChange() {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        this.searchTitles(this.state.query)
      }
    })
  }

  render() {
    return (
      <form>
        <input
          placeholder = "Search..."
          ref = {input => this.search = input}
          onChange = {this.handleChange}
        />
        <Suggestions results={this.state.results} />
      </form>
    )
  }

}

export default Search;



