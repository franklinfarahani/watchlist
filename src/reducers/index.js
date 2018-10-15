import {combineReducers} from 'redux';
import search from './SearchReducer';
import discover from './DiscoverReducer';
import watchlist from './ListReducer';
import auth from './AuthReducer';

export default combineReducers({
  search,
  discover,
  watchlist,
  auth
})