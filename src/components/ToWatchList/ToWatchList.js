import React from 'react'

const ToWatchList = ({ watchList }) => {
  return(
    <ul>
      {watchList.map(item =>
        <li
          key={item.id}
        >
        {item.name + 'Date added: ' + item.dateAdded}
        </li>
      )}
    </ul>
  )
}

export default ToWatchList
