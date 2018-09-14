const toWatch = (state =[], action ) => {
  switch (action.type) {
    case 'ADD_TO_LIST':
      return [
        ...state,
        {
          id: action.payload.id,
          position: action.payload.position,
          isWatched: false
        }
      ]
    case 'TOGGLE_WATCHED':
      return state.map(item =>
        (item.id === action.payload.id)
          ? {...item, isWatched: !item.isWatched}
          : item
      )
    default:
        return state;
  }
}

export default toWatch;