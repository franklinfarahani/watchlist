import React from 'react'

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <li key={r.id}>
      {r.media_type == "movie" ? r.title : r.name}
    </li>
  ))
  return <ul>{options}</ul>
}

export default Suggestions;