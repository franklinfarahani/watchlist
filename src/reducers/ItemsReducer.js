import { 
  SEARCH_TITLES_REQUEST,
  SEARCH_TITLES_SUCCESS,
  SEARCH_TITLES_FAIL,
  CLEAR_RESULTS,
  FETCH_LIST
} from '../actions/types';

const initialState = {
  results: [],
  list: [],
  isLoading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_RESULTS:
      return {
        ...state,
        results: [],
        isLoading: false
      };
    case SEARCH_TITLES_REQUEST:
      return { ...state, isLoading: true }
    case SEARCH_TITLES_SUCCESS:
      return {
        ...state,
        results: action.payload,
        isLoading: false
      };
    case SEARCH_TITLES_FAIL:
    return {
        ...state,
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