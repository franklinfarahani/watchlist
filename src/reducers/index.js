import {combineReducers} from 'redux';
import search from './SearchReducer';
import watchlist from './ListReducer';
import imdb from './RatingsReducer';
import auth from './AuthReducer';

export default combineReducers({
  search,
  watchlist,
  imdb,
  auth
})