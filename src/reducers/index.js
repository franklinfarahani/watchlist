import {combineReducers} from 'redux';
import data from './ItemsReducer';
import auth from './AuthReducer';

export default combineReducers({
  data,
  auth
})