import {combineReducers} from 'redux';
import data from './ItemsReducer';
import imdb from './RatingsReducer';
import auth from './AuthReducer';

export default combineReducers({
  data,
  imdb,
  auth
})