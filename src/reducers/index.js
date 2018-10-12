import {combineReducers} from 'redux';
import search from './SearchReducer';
import watchlist from './ListReducer';
import auth from './AuthReducer';

export default combineReducers({
  search,
  watchlist,
  auth
})