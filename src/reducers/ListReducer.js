import { 
  FETCH_LIST,
  REQUEST_INIT,
  REQUEST_SUCCESS,
  REQUEST_FAIL
} from '../actions/types';

const initialState = {
  list: [],
  hasUpdated: false,
  isLoading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_INIT:
      return { ...state, isLoading: true, hasUpdated: false }
    case REQUEST_SUCCESS:
      return {
        ...state,
        hasUpdated: true,
        isLoading: false
      };
    case REQUEST_FAIL:
    return {
        ...state,
        hasUpdated: false,
        isLoading: false,
        error: action.error
      }
    case FETCH_LIST:
      let arr = [];
      if (action.payload){
        arr = Object.keys(action.payload).map((i) => action.payload[i]);
      }
      return {
        ...state,
        list: arr,
        isLoading: false
      }
    default:
      return state;
  }
};