import React from 'react';
import styled from 'styled-components';

const ResultRow = styled.li`
  background: grey;
  list-style-type: none;
`

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <ResultRow key={r.id}>
      <img src = {`http://image.tmdb.org/t/p/w92${r.poster_path}`} />
      {r.media_type == "movie" ? r.title : r.name}
    </ResultRow>
  ))

  // If there are no results show the appropriate message
  return <div>
    {props.error ? <p>An error occured. Please try again later.</p> : null}
    {props.results.length == 0 && props.query.length > 1 ? <p>No results found.</p>: <ul>{options}</ul>}
  </div>
}

export default Suggestions;