import React from 'react'

const ToWatchList = ({ watchList }) => {
  return(
    <ul>
      {watchList.map(item =>
        <li
          key={item.id}
        >
        {item.id}
        </li>
      )}
    </ul>
  )
}

export default ToWatchList
