// const toWatch = (state =[], action ) => {
//   switch (action.type) {
//     case 'ADD_TO_LIST':
//       return [
//         ...state,
//         {
//           id: action.payload.id,
//           name: action.payload.name,
//           type: action.payload.type,
//           poster: action.payload.poster,
//           releaseDate: action.payload.releaseDate,
//           genreIds: action.payload.genreIds,
//           dateAdded: action.payload.dateAdded,
//           position: action.payload.position,
//           isWatched: false
//         }
//       ]
//     case 'TOGGLE_WATCHED':
//       return state.map(item =>
//         (item.id === action.payload.id)
//           ? {...item, isWatched: !item.isWatched}
//           : item
//       )
//     default:
//         return state;
//   }
// }

// export default toWatch;

import { FETCH_LIST } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_LIST:
      return action.payload;
    default:
      return state;
  }
};