import {combineReducers} from 'redux';
import search from './SearchReducer';
import single from './SingleItemReducer';
import discover from './DiscoverReducer';
import watchlist from './ListReducer';
import auth from './AuthReducer';

export default combineReducers({
  search,
  single,
  discover,
  watchlist,
  auth
})